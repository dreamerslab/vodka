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
  if( CONF.routes === undefined ) return console.log(
    UTILS.$alert( 'error' ) + '   routes file not specified in config'
  );

  var Flow = require( 'node.flow' );
  var flow = new Flow();

  if( UTILS.typeof( CONF.routes ) !== 'array' ){
    throw new Error( '[vodka][configs] routes must be an array' );
  }

  CONF.routes.forEach( function ( route ){
    flow.series( function ( next ){
      require( base_dir + '/routes/' + route )( map, next );
    });
  });

  flow.end( function (){});
};

vodka.version = JSON.parse( fs.readFileSync( __dirname + '/package.json', 'utf8' )).version;

/**
 * Exports module.
 */
module.exports = vodka;