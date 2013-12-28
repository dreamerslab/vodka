/**
 * Module dependencies.
 * @private
 */
var add_spaces = require( './generator' ).add_spaces;

module.exports = function ( generators ){
  var max_len  = 0;
  var help     = [ 'Usage: vodka [command] [argument(s)]\n', 'Commands:' ];
  var commands = [
    [ '-v', '--version', 'Display vodka version' ],
    [ 'h', 'help', 'Display usage information' ],
    [ 'n', 'new [project]', 'Create a new test project' ]
  ];

  commands.forEach( function ( cmd ){
    if( cmd[ 1 ].length > max_len ){
      max_len = cmd[ 1 ].length;
    }
  });

  commands.forEach( function ( cmd ){
    help.push( '  ' + add_spaces( cmd[ 0 ] + ',', 4 ) +
      add_spaces( cmd[ 1 ], max_len + 1 ) + cmd[ 2 ]);
  });

  help.push( '\nAvailable environment variables:' );

  var vars = [
    [ 'BASE_DIR', 'Test project base directory', 'Default: `cwd`' ],
    [ 'ROOT', 'Testing target host and port', 'Default: http://127.0.0.1:4000' ],
    [ 'TIMEOUT', 'Request timeout', 'Default: 60000ms' ],
  ];

  vars.forEach( function ( cmd ){
    if( cmd[ 1 ].length > max_len ){
      max_len = cmd[ 1 ].length;
    }
  });

  vars.forEach( function ( cmd ){
    help.push( '  ' + add_spaces( cmd[ 0 ] + ':', 10 ) +
      add_spaces( cmd[ 1 ], max_len + 1 ) + cmd[ 2 ]);
  });

  console.log( help.join('\n'));
};
