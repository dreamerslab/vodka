var should = require( 'should' );
var utils  = require( '../../lib/utils' );

module.exports = {
  'test .ran_no' : function ( callback ){
    utils.ran_no( 5, 20 ).should.be.within( 5, 20 );
    callback();
  },

  // is test
  'test .is undefined' : function ( callback ){
    utils.is( undefined ).should.eql( 'undefined' );
    callback();
  },

  'test .is null' : function ( callback ){
    utils.is( null ).should.eql( 'null' );
    callback();
  },

  'test .is NaN' : function ( callback ){
    utils.is( parseInt( 'fff' )).should.eql( 'NaN' );
    callback();
  },

  'test .is string' : function ( callback ){
    utils.is( '' ).should.eql( 'string' );
    callback();
  },

  'test .is object' : function ( callback ){
    utils.is({}).should.eql( 'object' );
    callback();
  },

  'test .is array' : function ( callback ){
    utils.is([]).should.eql( 'array' );
    utils.is( new Array()).should.eql( 'array' );
    callback();
  },

  'test .is number' : function ( callback ){
    utils.is( 1234 ).should.eql( 'number' );
    callback();
  },

  'test .is boolean' : function ( callback ){
    utils.is( true ).should.eql( 'boolean' );
    callback();
  },

  'test .is function' : function ( callback ){
    utils.is( function(){}).should.eql( 'function' );
    callback();
  },

  'test .is error' : function ( callback ){
    utils.is( new Error()).should.eql( 'error' );
    callback();
  },
  // end is test

  'test .uid' : function( callback ){
    utils.uid( 32 ).should.be.a( 'string' ).and.have.length( 32 );
    callback();
  },
};
