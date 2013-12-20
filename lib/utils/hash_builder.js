/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Build request hash.
 */

/**
 * Module dependencies.
 * @private
 * @require
 */
var fs = require( 'fs' );

/**
 * Build methods to a hash.
 * @public
 * @this {utils}
 * @param {String} path Path of the methods.
 * @returns {Object} Returns the hash.
 * @example
 *
 *     var responess = utils.build_hash( RESPONSE_DIR );
 */
var hash_builder = function ( path ){
  var files = fs.readdirSync( path );
  var trunk = {};

  files.forEach( function ( file ){
    if( /\.js$/.test( file )){
      var name      = file.replace( '.js', '' );
      trunk[ name ] = require( path + '/' + file );
    }
  });

  return trunk;
};

/**
 * Exports module.
 */
module.exports = hash_builder;
