document.addEventListener( "DOMContentLoaded", function() {
  require( [ "../lib/Sniffer", "../lib/Dictionary/en", "../lib/Dictionary" ], function( Sniffer, en, Dictionary ) {
    var sniffer = new Sniffer(),
        dictionary = new Dictionary( en ),
        node = {
          srcCode: document.getElementById( "srcCode" ),
          form: document.getElementById( "form" ),
          output: document.getElementById( "output" )
        };

      // When the form is submitted
      node.form.addEventListener( "submit", function( e ) {
        var logger, messages;
        e.preventDefault();
        // Get sniffer report
        logger = sniffer.getTestResults( node.srcCode.value, { standard: "Jquery" } ),
        // Translate messages
        messages = dictionary.translateBulk( logger.getMessages(), true );
        // Logger is a singleton, it must reset after validation is complete
        logger.reset();
        // Output report
        node.output.innerHTML = '';
        messages.forEach(function( msg ){
          node.output.innerHTML += "<li>" + msg.message +
            " ( line: " + msg.loc.start.line + ", column: " +
            msg.loc.start.column +
            ") </li>\n";
        });

      }, false );


  });
});