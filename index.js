var fs = require( 'fs' );

function vodka( base_dir ){
  // expose global objects
  require( './lib/global' )( base_dir );

  // expose utils to global
  require( './lib/utils' );

  // dispatch actions
  if( CONF.actions === undefined ) return console.log(
    UTILS.$alert( 'error' ) + '   actions not specified in config'
  );

  if( UTILS.typeof( CONF.actions ) !== 'array' ){
    throw new Error( '[vodka][configs] actions must be an array' );
  }

  var Flow         = require( 'node.flow' );
  var outter_flow  = new Flow();
  var Dispatcher   = require( './lib/dispatcher' );
  var Client       = require( './lib/client' );

  CONF.actions.forEach( function ( file_name ){
    outter_flow.series( function ( outter_next ){
      var Action          = require( ACTION_DIR + file_name );
      var client          = new Client( file_name );
      var action_instance = new Action( client );
      var flow            = new Flow();

      client.actions.forEach( function ( action ){
        flow.series( function ( next ){
          if( action.method === 'run' ){
            return action.apply( action_instance, slice.call( arguments ));
          }

          new Dispatcher( action.method, action.uri, action_instance, action.action, action.handler_name, next );
        });
      });

      flow.end( function (){
        outter_next();
      });
    });
  });

  outter_flow.end( function (){
    console.log( UTILS.$good( 'All test passed :)' ));
    process.exit( 0 );
  });
};

vodka.version = JSON.parse( fs.readFileSync( __dirname + '/package.json', 'utf8' )).version;

/**
 * Exports module.
 */
module.exports = vodka;