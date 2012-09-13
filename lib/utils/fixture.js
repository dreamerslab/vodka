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
var fs = require( 'fs' );

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
var fixture = function ( name, val ){

  return val ?
    fs.writeFileSync( FIXTURE_DIR + name + '.json', JSON.stringify( val, null, 2 )) :
    JSON.parse( fs.readFileSync( FIXTURE_DIR + name + '.json' ));
};

/**
 * Exports module.
 */
module.exports = fixture;