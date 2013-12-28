/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Utility functions.
 */

/**
 * Module dependencies.
 * @private
 */
var fs    = require( 'fs' );
var regex = require( '../../utils' ).regex;

var _ = {

  create : function ( path, content, method ){
    if( _.opt && _.opt.prefix ){
      path = _.opt.prefix + '/' + path;
    }

    _.path_exists( path, function ( full_path ){
      console.log( 'exists' + '  ' + path );
    }, function ( full_path ){
      fs[ method ]( full_path, content );
      console.log( 'create' + '  ' + path );
    });
  },

  create_file : function ( path, content ){
    if( content === undefined ) content = '';

    _.create( path, content, 'writeFileSync' );
  },

  full_path : function ( path ){
    return process.cwd() + '/' + ( path === undefined ? '' : path );
  },

  path_exists : function ( _path, exist, not_exist ){
    var full_path = _.full_path( _path );

    if( fs.existsSync( full_path )){
      exist && exist( full_path );
    }else{
      not_exist && not_exist( full_path );
    }
  }
};

/**
 * Exports module.
 */
module.exports = {

  init : function ( opt ){
    _.opt = opt === undefined ?
      {} : opt;
  },

/**
 * Add spaces for better syntax of VODKA command line tools.
 * @public
 * @this {generator}
 * @param {Function} str The target string.
 * @param {Function} len Max length inculding the target string plus spaces.
 * @param {Function} to_start Add spaces to the front.
 */
  add_spaces : function ( str, len, to_start ){
    var str_len = str.length;
    var i       = str_len;

    for( ;i < len; i += 1 ){
      if( !to_start ){
        str += ' ';
      }else{
        str = ' ' + str;
      }
    }

    return str;
  },

  create_dir : function ( path ){
    _.create( path, '0755', 'mkdirSync' );
  },

  create_file_by_template : function ( path ){
    if( !path.match( regex.format )){
      path += '.js';
    }

    var content = fs.readFileSync( __dirname + '/templates/' + path, 'utf8' );

    return _.create_file( path, content );
  }
};
