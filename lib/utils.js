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
    begin_slash         : /^\//,
    has_format          : /\..+$/,
    has_none_characters : /\W/g,
    is_js_file          : /\.js$/,
    is_email            : /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
    tail_slash          : /\/$/,
    url                 : /(https?):((\/\/)|(\\\\))+[\w\d:#@%\/$()~_?\+-=\\\.&]*/
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