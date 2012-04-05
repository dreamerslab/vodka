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
  $update : colors.bold.yellow,
  $good   : colors.bold.green,
  $fine   : colors.bold.gray,
  $alert  : colors.red,

/**
 * Regular expression collection.
 * @public
 */
  regex : {
    begin_slash : /^\//,
    tail_slash  : /\/$/,
    url         : /(https?):((\/\/)|(\\\\))+[\w\d:#@%\/$()~_?\+-=\\\.&]*/
  },

/**
 * Add spaces for better syntax of COKE command line tools.
 * @public
 * @this {utils}
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

/**
 * Use this instead of the untrusted typeof.
 * @public
 * @this {utils}
 * @param {Object} obj The target string.
 * @returns {String} Returns the capitalized type name.
 * @example
 *
 *     var type = UTILS.is( 'i\'m a string' );
 */
  is : function ( obj ){
    return {}.toString.call( obj ).replace( /(\[object )|\]/g, '' );
  },

/**
 * Check if the current process is working in the project root dir.
 * @public
 * @this {utils}
 * @param {Function} callback The success callback function.
 */
  is_project_root : function ( callback ){
    var current = process.cwd();
    var files   = fs.readdirSync( current );
    var found   = false;

    files.forEach( function ( file ){
      if( file === 'run.js' ){
        callback( current );
        found = true;
      }
    });

    if( !found ){
      console.log(
        this.$alert( 'error' ) + '   ' +
        '`run.js` not found, are you in the project root dir?'
      );
      process.exit( 0 );
    }
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