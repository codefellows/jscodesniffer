if ( typeof module === "object" && typeof define !== "function" ) {
  var define = function ( factory ) {
    module.exports = factory( require, exports, module );
  };
}

define(function() {
  //taken from: https://github.com/jscs-dev/node-jscs/blob/master/presets/airbnb.json
  return {
    "disallowSpacesInNamedFunctionExpression": {
        "beforeOpeningRoundBrace": true
    },
    "disallowSpacesInFunctionExpression": {
        "beforeOpeningRoundBrace": true
    },
    "disallowSpacesInAnonymousFunctionExpression": {
        "beforeOpeningRoundBrace": true
    },
    "disallowSpacesInFunctionDeclaration": {
        "beforeOpeningRoundBrace": true
    },
    "disallowEmptyBlocks": true,
    "disallowSpacesInsideArrayBrackets": true,
    "disallowSpacesInsideParentheses": true,
    "disallowQuotedKeysInObjects": true,
    "disallowSpaceAfterObjectKeys": true,
    "disallowSpaceAfterPrefixUnaryOperators": true,
    "disallowSpaceBeforePostfixUnaryOperators": true,
    "disallowSpaceBeforeBinaryOperators": [
        ","
    ],
    "disallowMixedSpacesAndTabs": true,
    "disallowTrailingWhitespace": true,
    "disallowTrailingComma": true,
    "disallowYodaConditions": true,
    "disallowKeywords": [ "with" ],
    "disallowMultipleLineBreaks": true,
    "requireSpaceBeforeBlockStatements": true,
    "requireParenthesesAroundIIFE": true,
    "requireSpacesInConditionalExpression": true,
    "requireMultipleVarDecl": "onevar",
    "requireBlocksOnNewline": 1,
    "requireCommaBeforeLineBreak": true,
    "requireSpaceBeforeBinaryOperators": true,
    "requireSpaceAfterBinaryOperators": true,
    "requireCamelCaseOrUpperCaseIdentifiers": true,
    "requireLineFeedAtFileEnd": true,
    "requireCapitalizedConstructors": true,
    "requireDotNotation": true,
    "requireCurlyBraces": [
        "do"
    ],
    "requireSpaceAfterKeywords": [
        "if",
        "else",
        "for",
        "while",
        "do",
        "switch",
        "case",
        "return",
        "try",
        "catch",
        "typeof"
    ],
    "safeContextKeyword": "_this",
    "validateLineBreaks": "LF",
    "validateQuoteMarks": "'",
    "validateIndentation": 2
 };
});
