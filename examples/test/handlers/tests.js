var should = require( 'should' );

module.exports = {
  get : function ( args, err, res, body, log, next ){
    res.should.be.json;
    body.should.have.property( 'msg' ).eql( '[get] test passed' );

    log( 'bla bla bla' );
    next();
  },

  post : function ( args, err, res, body, log, next ){
    res.should.be.json;
    body.should.have.property( 'msg' ).eql( '[post] test passed' );

    log( 'bla bla bla' );
    next();
  },

  put : function ( args, err, res, body, log, next ){
    res.should.be.json;
    body.should.have.property( 'msg' ).eql( '[put] test passed' );

    log( 'bla bla bla' );
    next();
  },

  'delete' : function ( args, err, res, body, log, next ){
    res.should.be.json;
    body.should.have.property( 'msg' ).eql( '[delete] test passed' );

    log( 'bla bla bla' );
    next();
  }
};