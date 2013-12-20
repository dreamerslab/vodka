var utils  = require( './unit/utils' );
var global = require( './unit/global' );
var server = require( './functional/server' );
var Flow   = require( 'node.flow' );
var flow   = new Flow();

// unit test
flow.series( function ( next ){
  var inner_flow = new Flow();

  Object.keys( utils ).forEach( function( test ){
    inner_flow.parallel( function ( ready ){
      utils[ test ]( ready );
    });
  });

  inner_flow.join().end( function(){
    console.log( 'utils tests passed' );
    next();
  });
});

flow.series( function ( next ){
  global();
  next();
});

// functional test
flow.series( function ( next ){
  server( 4000, next );
});

flow.end( function (){
  var vodka = require( '../index' );

  vodka( __dirname + '/functional' );
});
