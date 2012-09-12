var fs = require( 'fs' );

function vodka( base_dir ){
  // expose global objects
  require( './lib/global' )( base_dir );

  // expose utils to global
  require( './lib/utils' );

  var dispatcher = require( './lib/dispatcher' );

  var Flow = require( 'node.flow' );
  var flow = new Flow();

  // dispatch actions
  if( CONF.actions === undefined ) return console.log(
    UTILS.$alert( 'error' ) + '   actions file not specified in config'
  );

  if( UTILS.typeof( CONF.actions ) !== 'array' ){
    throw new Error( '[vodka][configs] actions must be an array' );
  }

  CONF.actions.forEach( function ( file_name ){
    flow.series( function ( next ){
      var Action = require( ACTION_DIR + file_name );

      new Action( dispatcher, next );
    });
  });

  flow.end( function (){
    console.log( UTILS.$good( 'All test passed :)' ));
  });
};

vodka.version = JSON.parse( fs.readFileSync( __dirname + '/package.json', 'utf8' )).version;

/**
 * Exports module.
 */
module.exports = vodka;