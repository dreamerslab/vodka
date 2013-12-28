var fs    = require( 'fs' );
var vodka = require( './lib/vodka' );

vodka.configs   = require( './lib/configs' );
vodka.utils     = require( './lib/utils' );
vodka.fixture   = require( './lib/fixture' );
vodka.validator = require( './lib/validator' );
vodka.version   = JSON.parse( fs.readFileSync( __dirname + '/package.json', 'utf8' )).version;

/**
 * Exports module.
 */
module.exports = vodka;
