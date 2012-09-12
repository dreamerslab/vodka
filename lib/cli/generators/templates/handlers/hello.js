var should = require( 'should' );

module.exports = {

  index : function ( args, err, res, body, log, next ){
    // do some examination here
    // res.should.be.json;
    // body.should.have.property( 'msg' ).eql( '[delete] test passed' );

    log( 'bla bla bla' );
    // if the above test pass go to the next one
    next && next();
  }
};

