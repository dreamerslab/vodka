var should = require( 'should' );
var config = require( '../../lib/configs' );

module.exports = function (){
  config( process.cwd() + '/functional' );
  CONF.should.have.property( 'base_dir' );
  CONF.should.have.property( 'action_dir' );
  CONF.should.have.property( 'data_dir' );
  console.log( 'configs tests passed' );
};