var should = require( 'should' );

module.exports = {
  get : function ( args, next ){
    return {
      headers : {
        'x-headers' : 'headers test'
      },
      json : {
        test : 'JSON test'
      },
      handler : function ( err, res, body ){
        res.should.be.json;
        body.should.have.property( 'msg' ).eql( '[get] test passed' );

        next();
      }
    };
  },

  post : function ( args, next ){
    return {
      headers : {
        'x-headers' : 'headers test',
      },
      json : {
        test : 'JSON test'
      },
      handler : function ( err, res, body ){
        res.should.be.json;
        body.should.have.property( 'msg' ).eql( '[post] test passed' );

        next();
      }
    };
  },

  put : function ( args, next ){
    return {
      headers : {
        'x-headers' : 'headers test',
      },
      json    : {
        test : 'JSON test'
      },
      handler : function ( err, res, body ){
        res.should.be.json;
        body.should.have.property( 'msg' ).eql( '[put] test passed' );

        next();
      }
    };
  },

  'delete' : function ( args, next ){
    return {
      headers : {
        'x-headers' : 'headers test',
      },
      json : {
        test : 'JSON test'
      },
      handler : function ( err, res, body ){
        res.should.be.json;
        body.should.have.property( 'msg' ).eql( '[delete] test passed' );

        next();
      }
    };
  }
};