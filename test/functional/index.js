describe( 'Test Express server', function (){
  before( function ( done ){
    require( './server' )( 4000, done );
  });

  it( 'should pass', function ( done ){
    require( './actions/user' );
    done();
  });
});
