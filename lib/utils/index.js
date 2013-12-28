/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Utility functions.
 */

/**
 * @public
 */
var utils = {

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
 *     var type = utils.is( 'i\'m a string' );
 */
  is : function ( obj ){
    if( obj === null )      return 'null';
    if( obj === undefined ) return 'undefined';

    var ret = {}.toString.call( obj ).match( /^\[object\s+(.*?)\]$/ )[ 1 ];

    ret = ret ? ret.toLowerCase() : '';

    return ret == 'number' && isNaN( obj ) ? 'NaN' : ret;
  },

/**
 * Clone objects.
 * @public
 * @this {utils}
 * @param {String} arguments[n] Objects to clone.
 * @returns {Object} Returns the new cloned object.
 * @example
 *
 *     var child = utils.merge( mom, dad );
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
 * Exports module.
 */
module.exports = utils;
