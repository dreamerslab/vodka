var should = require( 'should' );

module.exports = {

  ok : function ( err, res, body ){
    should.not.exist( err );

    res.should.be.json;
    res.should.have.status( 200 );
  },

  create : function ( err, res, body ){
    should.not.exist( err );

    res.should.be.json;
    res.should.have.status( 201 );
  },

  destroy : function ( err, res, body ){
    should.not.exist( err );

    res.should.be.json;
    res.should.have.status( 204 );
    should.not.exist( body );
  }
};
