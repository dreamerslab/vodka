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
 * @require
 */
var colors = require( 'cli-color' );

/**
 * @public
 */
var utils = {

/**
 * Shortcuts for terminal colors.
 * @public
 */
  colors  : colors,
  $update : colors.bold.yellow,
  $good   : colors.bold.green,
  $fine   : colors.bold.gray,
  $alert  : colors.red,

/**
 * Build methods to a hash
 * @public
 * @this {utils}
 * @param {String} path Path of the methods.
 * @returns {Object} Returns the hash.
 * @example
 *
 *     var responess = utils.build_hash( RESPONSE_DIR );
 */
  build_hash : require( './hash_builder' ),

/**
 * Get or set teseting data.
 * @public
 * @this {utils}
 * @param {String} name Name of the fixture.
 * @returns {Object} Returns the fixture.
 * @example
 *
 *     var user = utils.fixture( 'user' );
 */
  fixture : require( './fixture' ),

/**
 * Check if the current process is working in the project root dir.
 * @public
 * @this {utils}
 * @param {Function} callback The success callback function.
 */
  is_project_root : require( './is_project_root' ),

/**
 * Clone objects.
 * @public
 * @this {utils}
 * @param {String} arguments[n] Objects to clone.
 * @returns {Object} Returns the new cloned object.
 * @example
 *
 *     var child = utils.clone( mom, dad );
 */
  merge : function (){
    var args  = [].slice.call( arguments );
    var i     = 0;
    var j     = args.length;
    var child = {};
    var parent, prop;

    for( ; i < j; i++ ){
      parent = args[ i ];

      for( prop in parent ){
        child[ prop ] = parent[ prop ];
      }
    }

    return child;
  },

/**
 * Generate random number by the given range.
 * @public
 * @this {utils}
 * @param {Number} min The minimum number.
 * @param {Number} max The maximum number.
 * @returns {Number} Returns the random number.
 * @example
 *
 *     var ran = utils.ran_no( 10, 100 );
 */
  ran_no : function ( min, max ){
    return Math.floor( Math.random() * ( max - min + 1 )) + min;
  },

/**
 * Regular expression collection.
 * @public
 */
  regex : require( './regex' ),

/**
 * Use this instead of the untrusted typeof.
 * @public
 * @this {utils}
 * @param {Object} obj The target object.
 * @returns {String} Returns the capitalized type name.
 * @example
 *
 *     var type = UTILS.typeof( 'i\'m a string' );
 */
  typeof : function ( obj ){
    if( obj === null )      return 'null';
    if( obj === undefined ) return 'undefined';

    var ret = {}.toString.call( obj ).match( /^\[object\s+(.*?)\]$/ )[ 1 ];

    ret = ret ? ret.toLowerCase() : '';

    return ret == 'number' && isNaN( obj ) ? 'NaN' : ret;
  },

/**
 * Generate a unic ID string.
 * @public
 * @this {utils}
 * @param {Number} len ID length.
 * @returns {String} Returns the unic ID.
 * @example
 *
 *     var id = utils.uid( 32 );
 */
  uid : function ( len ){
    var str     = '';
    var src     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var src_len = src.length;
    var i       = len;

    for( ; i-- ; ){
      str += src.charAt( this.ran_no( 0, src_len - 1 ));
    }

    return str;
  }
};

/**
 * Exports module as getter to global.
 */
global.__defineGetter__( 'UTILS', function (){
  return utils;
});

/**
 * Exports module.
 */
module.exports = utils;