/**
 * Module dependencies.
 * @private
 */
var add_spaces = require( './generators/lib' ).add_spaces;

module.exports = function ( generators ){
  var max_len  = 0;
  var help     = [ 'Usage: vodka [command] [argument(s)]\n', 'Commands:' ];
  var commands = [
    [ '-v', '--version', 'Display vodka version' ],
    [ 'h', 'help', 'Display usage information' ],
    [ 'i', 'init', 'Create a new test project' ],
    [ 'g', 'generate [file] [method]', 'Generate code templates' ],
    [ 'r', 'run', 'Run tests' ]
  ];

  commands.forEach( function( cmd ){
    if( cmd[ 1 ].length > max_len ){
      max_len = cmd[ 1 ].length;
    }
  });

  commands.forEach( function( cmd ){
    help.push( '  ' + add_spaces( cmd[ 0 ] + ',', 4 ) +
      add_spaces( cmd[ 1 ], max_len + 1 ) + cmd[ 2 ]);
  });

  console.log( help.join('\n'));
};