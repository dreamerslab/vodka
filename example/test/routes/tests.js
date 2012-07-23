var Flow = require( 'node.flow' );

module.exports = function ( map, out ){
  var flow = new Flow();

  flow.series( function ( next ){
    map.get( 'tests/get', 'tests#get', next );
  });

  flow.series( function ( next ){
    map.post( 'tests/post', 'tests#post', next );
  });

  flow.series( function ( next ){
    map.put( 'tests/put', 'tests#put', next );
  });

  flow.series( function ( next ){
    map.delete( 'tests/delete', 'tests#delete', next );
  });

  flow.end( function (){
    console.log( 'All tests passed' );
    out();
    process.exit();
  });
};