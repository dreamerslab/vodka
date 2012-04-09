/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Generate test actions.
 */

var lib = require( './generators/lib' );

module.exports = function ( args ){
  lib.is_project_root( function ( current ){
    lib.is_args_defined( args, 'generate [file] [method]' );

    var file         = lib.valid_actions_name( args.shift());
    var actions_path = 'actions/' + file + '.js';

    var action_code = function ( actions ){
      var code = [];

      actions.forEach( function ( action ){
        var action = lib.valid_action_name( action );

        code.push( '  ' + action + ' : function ( args, next ){' );
        code.push( '    return {' );
        code.push( '      handler : function ( err, res, body ){' );
        code.push( '      }' );
        code.push( '    };' );
        code.push( '  },' );
      });

      code = code.join( '\n' );

      return code.replace( /\}\,$/, '}' );
    };

    var exist = function ( full_path ){
      var code = fs.readFileSync( lib.path( actions_path ), 'utf8' );

      code = code.replace( /module.exports(\n|\r|\r\n|\t+|\s+|)=(\n|\r|\r\n|\t+|\s+|){(\t+|\s+)/,
        'module.exports = {\n' + action_code( args ) + '\n\n  ' );

      lib.create_file( 'actions/' + file + '.js', code );
    };

    var not_exist = function ( full_path ){
      var code = [ 'var should = require( \'should\' );' ];

      code.push( '' );
      code.push( 'module.exports = {' );
      code.push( '' );
      code.push( action_code( args ));
      code.push( '};\n' );

      code = code.join( '\n' );
      lib.create_file( 'actions/' + file + '.js', code );
    };

    lib.path_exists( actions_path, exist, not_exist );
  });
};



