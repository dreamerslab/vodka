/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Get and build validator.
 */

/**
 * Module dependencies.
 * @private
 * @require
 */
var fs      = require( 'fs' );
var configs = require( './configs' );
var path    = configs.BASE_DIR + '/validators';

if( !fs.existsSync( path )){
  throw new Error( '[vodka] validator path not exists; path: ' + path );
}

var files      = fs.readdirSync( path );
var built      = false;
var validators = {};

/**
 * Get and call validator.
 * @public
 * @this {utils}
 * @param {String} name Name of the user.
 * @param {Any} name Name of the user.
 * @returns {Object} Returns the fixture.
 * @example
 *
 *     client.validator( 'user', user );
 */
var validator = function (){
  if( !built ){
    files.forEach( function ( file ){
      if( /\.js$/.test( file )){
        var validator = require( path + '/' + file );
        var name      = '';

        for( name in validator ){
          validators[ name ]                = {};
          validators[ name ][ 'validator' ] = validator;
          validators[ name ][ 'handler' ]   = validator[ name ];
        }
      }
    });

    built = true;
  }

  var name = [].shift.call( arguments );

  if( !validators[ name ]){
    throw new Error( '[vodka] validator not exists; name: ' + name );
  }

  var handler   = validators[ name ][ 'handler' ];
  var validator = validators[ name ][ 'validator' ];

  handler.apply( validator, arguments );
};

/**
 * Exports module.
 */
module.exports = validator;
