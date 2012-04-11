/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Generate test actions.
 */

/**
 * Module dependencies.
 * @private
 */
var fs  = require( 'fs' );
var lib = require( './generators/lib' );

var actions_code = function ( actions ){
  var code = [];

  actions.forEach( function ( action ){
    var action = lib.valid_action_name( action );

    code.push( '  ' + action + ' : function ( args, next ){' );
    code.push( '    return {' );
    code.push( '      handler : function ( err, res, body ){' );
    code.push( '      }' );
    code.push( '    };' );
    code.push( '  },\n' );
  });

  code = code.join( '\n' );
  code = code.replace( /\n$/, '' );

  return code;
};

var gen_actions = function ( file_name, actions ){
  var path = 'actions/' + file_name + '.js';

  lib.path_exists( path,
    // exist
    function ( full_path ){
      var code = fs.readFileSync( lib.path( path ), 'utf8' );

      code = code.replace( /module.exports(\n|\r|\r\n|\t+|\s+|)=(\n|\r|\r\n|\t+|\s+|){(\t+|\s+|)/,
        'module.exports = {\n\n' + actions_code( actions ) + '\n\n  ' );

      lib.create_file_f( 'actions/' + file_name + '.js', code );
    },
    // not exist
    function ( full_path ){
      var code = [ 'var should = require( \'should\' );' ];

      code.push( '' );
      code.push( 'module.exports = {' );
      code.push( '' );
      code.push( actions_code( actions ).replace( /\}\,$/, '}' ));
      code.push( '};\n' );

      code = code.join( '\n' );
      lib.create_file( 'actions/' + file_name + '.js', code );
    });
};

var routes_code = function ( file_name, actions ){
  var code = [];

  actions.forEach( function ( action ){
    var content = file_name + '/' + action + '\', \'' + file_name + '#' + action;

    code.push( '  map.get( \'' + content + '\' );' );
  });

  code = code.join( '\n' );

  return code;
};

var gen_routes = function ( file_name, actions ){
  var path = 'routes.js';

  lib.path_exists( path,
    // exist
    function ( full_path ){
      var src  = fs.readFileSync( lib.path( path ), 'utf8' );
      var code = 'module.exports = function ( map ){\n';

      code += routes_code( file_name, actions );
      code = src.replace(
        /module.exports(\n|\r|\r\n|\t+|\s+|)=(\n|\r|\r\n|\t+|\s+|)function(\n|\r|\r\n|\t+|\s+|)\((\n|\r|\r\n|\t+|\s+|)map(\n|\r|\r\n|\t+|\s+|)\)(\n|\r|\r\n|\t+|\s+|)\{(\t+|\s+|)/,
        code + '\n'
      );

      lib.create_file_f( path, code );
    },
    // not exist
    function ( full_path ){
      var code = 'var Flow = require( \'node.flow\' );\n\n';

      code += 'module.exports = function ( map ){\n';
      code += routes_code( file_name, actions );
      code += '\n};';

      lib.create_file( path, code );
    });
};

module.exports = function ( args ){
  lib.is_project_root( function ( current ){
    lib.is_args_defined( args, 'generate [file] [method]' );

    var file_name = lib.valid_actions_name( args.shift());
    var actions   = args;

    gen_actions( file_name, actions );
    gen_routes( file_name, actions );
  });
};



