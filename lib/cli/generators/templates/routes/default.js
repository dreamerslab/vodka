var Flow = require( 'node.flow' );

module.exports = function ( map, out ){
  // checkout the node.flow doc for advance usage
  // https://github.com/dreamerslab/node.flow
  var flow = new Flow();

  // GET hello | hello#index
  flow.series( function ( next ){
    map.post( 'hello', 'hello#index', next );
  });

  flow.end( function (){
    out();
  });
};