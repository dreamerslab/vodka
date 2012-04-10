var fs = require( 'fs' );

function vodka( base_dir ){
  // expose configs to global
  require( './lib/configs' )( base_dir );

  // expose utils to global
  require( './lib/utils' );

  // build actions
  var actions = require( './lib/actions' );

  // build router
  var map = require( './lib/route' )( actions );

  // dispatch routes
  require( base_dir + '/routes' )( map );
};

vodka.version = JSON.parse( fs.readFileSync( __dirname + '/package.json', 'utf8' )).version;

/**
 * Exports module.
 */
module.exports = vodka;