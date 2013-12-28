/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Get or set teseting data.
 */

/**
 * Module dependencies.
 * @private
 * @require
 */
var fs      = require( 'fs' );
var configs = require( './configs' );

/**
 * Get or set teseting data.
 * @public
 * @this {utils}
 * @param {String} name Name of the fixture.
 * @param {String} val Value to be set of the fixture.
 * @returns {Object} Returns the fixture.
 * @example
 *
 *     var user = client.fixture( 'user' );
 *
 *     fixture( 'user', user );
 */
var fixture = function ( name, val ){
  var path = configs.BASE_DIR + '/fixtures/' + name + '.json';

  if( val ){
    return fs.writeFileSync( path, JSON.stringify( val, null, 2 ));
  }

  if( !fs.existsSync( path )){
    throw new Error( '[vodka] fixture not exists; name: ' + name );
  }

  return JSON.parse( fs.readFileSync( path ));
};

/**
 * Exports module.
 */
module.exports = fixture;
