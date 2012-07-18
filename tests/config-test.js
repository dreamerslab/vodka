var should = require( 'should' );

module.exports.test = function (){
  CONF.should.have.property( 'base_dir' );
  CONF.should.have.property( 'action_dir' );
  CONF.should.have.property( 'data_dir' );
};