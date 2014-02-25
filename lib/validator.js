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

var files = fs.readdirSync( path );
var built = false;

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

  var name       = [].shift.call( arguments );
  var args       = arguments;
  var break_loop = false;

  if( !built ){
    files.some( function ( file ){
      if( /\.js$/.test( file )){
        var validator = require( path + '/' + file );
        var prop      = '';

        for( prop in validator ){
          if( prop === name ){

            var handler = validator[ prop ];

            handler.apply( validator, args );
            break_loop = true;
            break;
          }
        }
      }

      return break_loop;
    });
  }

  if( !break_loop ){
    throw new Error( '[vodka] validator not exists; name: ' + name );
  }
};

/**
 * Exports module.
 */
module.exports = validator;
