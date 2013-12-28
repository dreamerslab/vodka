var should  = require( 'should' );
var configs = require( '../../lib/configs' );

describe( 'configs.js tests', function (){
  it( 'should have BASE_DIR, ROOT & TIMEOUT', function (){
    configs.should.have.property( 'BASE_DIR' );
    configs.should.have.property( 'ROOT' );
    configs.should.have.property( 'TIMEOUT' );
  });
});
