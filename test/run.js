var utils       = require( './utils' );
var server      = require( './server' );
var config_test = require( './config-test' );
var Flow        = require( 'node.flow' );
var flow        = new Flow();

// utils test
flow.series( function ( next ){
  var inner_flow = new Flow();

  Object.keys( utils ).forEach( function( test ){
    inner_flow.parallel( function ( ready ){
      utils[ test ]( ready );
    });
  });

  inner_flow.join().end( function(){
    console.log( 'Utils tests all passed' );
    next();
  });
});

//
flow.series( function ( next ){
  server.start( 4000 , next );
});

flow.series( function ( next ){
  var vodka = require( '../index' );

  vodka( __dirname + '/virtuals' );
  next();
});

flow.series( function ( next ){
  config_test.test();

  next();
});

flow.end( function(){});