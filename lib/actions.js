/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Build actions hash.
 */

/**
 * Module dependencies.
 * @private
 * @require
 */
var fs = require( 'fs' );

var path    = CONF.action_dir;
var files   = fs.readdirSync( path );
var actions = {};

files.forEach( function ( file ){
  if( /\.js$/.test( file )){
    var name        = file.replace( '.js', '' );
    actions[ name ] = require( path + file );
  }
});

/**
 * Exports module.
 */
module.exports = actions;