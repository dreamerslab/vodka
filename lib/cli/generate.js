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
      var code = [];

      code.push( 'var fs       = require( \'fs\' );' );
      code.push( 'var data_dir = CONF.data_dir;' );
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
    var route         = file_name + '/' + action;
    var mapped_action = file_name + '#' + action;

    code.push( '  // GET ' + route + ' | ' + mapped_action );
    code.push( '  flow.series( function ( next ){' );
    code.push( '    map.get( \'' + route + '\', \'' + mapped_action + '\', next );' );
    code.push( '  });' );
    code.push( '' );
  });

  code = code.join( '\n' );

  return code;
};

var gen_routes = function ( file_name, actions ){
  var path = 'routes/default.js';

  lib.path_exists( path,
    // exist
    function ( full_path ){
      var src  = fs.readFileSync( lib.path( path ), 'utf8' );
      var code = '\n' + routes_code( file_name, actions ) + '\n\
  flow.end( function (){\n\
    out();\n\
  });\n\
};';

      code = src.replace(
        /(\n|\r|\r\n|\t+|\s+|)flow.end\((\n|\r|\r\n|\t+|\s+|)function(\n|\r|\r\n|\t+|\s+|)\((\n|\r|\r\n|\t+|\s+|)\)(\n|\r|\r\n|\t+|\s+|){(\n|\r|\r\n|\t+|\s+|)out\(\);(\n|\r|\r\n|\t+|\s+|)\}\)\;(\n|\r|\r\n|\t+|\s+|)\}\;/,
        '\n' + code
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



