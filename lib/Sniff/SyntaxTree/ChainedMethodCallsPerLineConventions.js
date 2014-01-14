/*
	* @package jscodesniffer
	* @author sheiko
	* @license MIT
	* @copyright (c) Dmitry Sheiko http://www.dsheiko.com
	* @jscs standard:Jquery
	* jshint unused:false
	* Code style: http://docs.jquery.com/JQuery_Core_Style_Guidelines
	*/

// UMD boilerplate according to https://github.com/umdjs/umd
if ( typeof module === "object" && typeof define !== "function" ) {
	var define = function ( factory ) {
	module.exports = factory( require, exports, module );
	};
}
/**
	* A module representing a sniffer.
	* @module Sniff/SyntaxTree/ChainedMethodCallsPerLineConventions
	*/
define(function( require ) {
"use strict";

var utils = require( "../Utils" ),
	NAME = "ChainedMethodCallsPerLineConventions",
	/**
	* @constructor
	* @alias module:Sniff/SyntaxTree/ChainedMethodCallsPerLineConventions
	* @param {SourceCode} sourceCode
	* @param {Mediator} mediator
	* @param {TokenIterator} tokenIterator
	*/
	Sniff = function( sourceCode, mediator, tokenIterator ) {
		var properties = [], identifier;
		return {
			/**
			* Check contract
			* @param {Object} rule
			*/
			validateRule: function( rule ) {
				utils.validateRule( rule, "allowOnePerLineWhenMultilineCaller", "boolean" );
			},

			/**
				* Iterate through the chain
				* @param {Object} node (CallExpression)
				* @param {function} fn Callback
				*/
			iterateChain: function( node, fn ) {
				node.object && node.object.type !== "Identifier" && this.iterateChain( node.object, fn );
				node.callee && this.iterateChain( node.callee, fn );
				fn( node );
			},

			/**
				* Find identifier of a given chained call
				* @param {Object} node (CallExpression)
				*/
			findIdentifier: function( node ) {
				if ( node.object && node.object.type === "Identifier" ) {
					identifier = node.object;
				}
			},
			/**
				* Extract all the properties of a given chained call
				* @param {Object} node (CallExpression)
				*/
			findProperties: function( node ) {
				if ( node.property ) {
					properties.push( node.property );
				}
			},
			/**
				* Iterate members and trigger violations every time a member found on the same line with previous one
				* @param {Object[]} members
				*/
			sniffMembersOnDistinctLines: function( members ) {
				members.forEach(function( member ) {
					var sameLineMem = properties.filter(function( m ){
						return m.loc.start.line === member.loc.start.line;
					});
					if ( sameLineMem.length > 1 ) {
						mediator.publish( "violation", NAME, "ChainedMethodCallsOnePerLine", member.range, member.loc );
					}
				});
			},

			/**
				* Run the sniffer according a given rule if a given node type matches the case
				* @param {Object} rule
				* @param {Object} node
				* @param {Object} pNode
				*/
			run: function( rule, node, pNode ) {
				var that = this,
						multilineProps = [],
						chainCode,
						chainCodeOffset = 0;

				// find root of a chain
				if ( rule.allowOnePerLineWhenMultilineCaller &&
					pNode.type !== "MemberExpression" &&
					node.type === "CallExpression" &&
					node.callee &&
					node.callee.type === "MemberExpression" &&
					node.callee.computed === false  ) {

					chainCodeOffset = node.range[ 0 ];
					chainCode = sourceCode.extract( chainCodeOffset, node.range[ 1 ] );
					
					// Multiline
					if ( chainCode.find( "\n" ) !== -1 ) {
						properties = [];
						this.iterateChain( node, function( node ) {
							that.findProperties( node );
							that.findIdentifier( node );
						});
						multilineProps = properties.filter(function( prop ){
							var tokenIt = tokenIterator.findByPos( prop.range[ 0 ] );
							// Prev (-1) is `.`, before it goes the token we need: <)>.prop
							 return sourceCode.extract( tokenIt.get( -2 ).range[ 1 ], prop.range[ 0 ] ).find( "\n" ) !== -1;
						});
						// Now we've removed arguments from chain code. Is it still multiline?
						if ( multilineProps.length  ) {
							this.sniffMembersOnDistinctLines( [ identifier ].concat( properties ) );
						}
					}
				}
			}

		};
	};
	return Sniff;
});