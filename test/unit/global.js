var should = require( 'should' );
var _global = require( '../../lib/global' );

module.exports = function (){
  _global( process.cwd() + '/functional' );
  global.should.have.property( 'BASE_DIR' );
  global.should.have.property( 'ACTION_DIR' );
  global.should.have.property( 'HANDLER_DIR' );
  global.should.have.property( 'FIXTURE_DIR' );
  global.should.have.property( 'CONF' );
  console.log( 'global tests passed' );
};