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

var handlers_code = function ( actions ){
  var code = [];

  actions.forEach( function ( action ){
    var action = lib.valid_action_name( action );

    code.push( '  ' + action + ' : function ( args, err, res, body, log, next ){' );
    code.push( '  },\n' );
  });

  code = code.join( '\n' );
  code = code.replace( /\n$/, '' );

  return code;
};

var gen_handlers = function ( file_name, actions ){
  var path = 'handlers/' + file_name + '.js';

  lib.path_exists( path,
    // exist
    function ( full_path ){
      var code = fs.readFileSync( lib.path( path ), 'utf8' );

      code = code.replace( /module.exports(\n|\r|\r\n|\t+|\s+|)=(\n|\r|\r\n|\t+|\s+|){(\t+|\s+|)/,
        'module.exports = {\n\n' + handlers_code( actions ) + '\n\n  ' );

      lib.create_file_f( 'handlers/' + file_name + '.js', code );
    },
    // not exist
    function ( full_path ){
      var code = [];

      code.push( 'var should = require( \'should\' );' );
      code.push( '' );
      code.push( 'module.exports = {' );
      code.push( '' );
      code.push( handlers_code( actions ).replace( /\}\,$/, '}' ));
      code.push( '};\n' );

      code = code.join( '\n' );
      lib.create_file( 'handlers/' + file_name + '.js', code );
    });
};

var actions_init_code = function ( file_name, actions ){
  var code = [];

  actions.forEach( function ( action ){
    var route         = file_name + '/' + action;
    var mapped_action = file_name + '#' + action;

    code.push( '    client.get( \'' + route + '\', this.' + action + ', \'' + mapped_action + '\' );' );
  });

  code = code.join( '\n' );

  return code;
};

var actions_method_code = function ( actions ){
  var code = [];

  actions.forEach( function ( action ){
    code.push( '  ' + action + ' : function (){' );
    code.push( '    return {' );
    code.push( '    };' );
    code.push( '  },' );
    code.push( '' );
  });

  code = code.join( '\n' );

  return code;
};

var gen_actions = function ( file_name, actions ){
  var path = 'actions/default.js';

  lib.path_exists( path,
    // exist
    function ( full_path ){
      var src  = fs.readFileSync( lib.path( path ), 'utf8' );
      var code = src.replace(
        /(\t+|\s+|)init(\n|\r|\r\n|\t+|\s+|)\:(\n|\r|\r\n|\t+|\s+|)function(\n|\r|\r\n|\t+|\s+|)\((\n|\r|\r\n|\t+|\s+|)client(\n|\r|\r\n|\t+|\s+|)\)(\n|\r|\r\n|\t+|\s+|)\{/,
        '  init : function ( client ){\n' + actions_init_code( file_name, actions )
      ).replace(
        /(\t+|\s+|)\}(\n|\r|\r\n|\t+|\s+|)\}(\n|\r|\r\n|\t+|\s+|)\)(\n|\r|\r\n|\t+|\s+|)\;/,
        '\n  },\n\n' + actions_method_code( actions ) + '});'
      ).replace(
        /(\t+|\s+|)\},(\n|\r|\r\n|\t+|\s+|)\}(\n|\r|\r\n|\t+|\s+|)\)(\n|\r|\r\n|\t+|\s+|)\;/g,
        '\n  }\n});'
      );

      lib.create_file_f( path, code );
    },
    // not exist
    function ( full_path ){
      var code = [];

      code.push( 'var Class = require( \'node.class\' );' );
      code.push( '' );
      code.push( 'module.exports = Class.extend({' );
      code.push( '' );
      code.push( '  init : function ( client ){' );
      code.push( actions_init_code( file_name, actions ));
      code.push( '  },' );
      code.push( '' );
      code.push( actions_method_code( actions ));
      code.push( '});' );

      code = code.join( '\n' );
      code = code.replace( /(\t+|\s+|)\}(\n|\r|\r\n|\t+|\s+|)\}(\n|\r|\r\n|\t+|\s+|)\)(\n|\r|\r\n|\t+|\s+|)\;/g, '\n  }\n});' );

      lib.create_file( path, code );
    });
};

module.exports = function ( args ){
  lib.is_project_root( function ( current ){
    lib.is_args_defined( args, 'generate [file] [method]' );

    var file_name = lib.valid_actions_name( args.shift());
    var actions   = args;

    gen_handlers( file_name, actions );
    gen_actions( file_name, actions );
  });
};



