var should = require( 'should' );
var utils  = require( '../../lib/utils' );

module.exports = {
  'test .ran_no' : function ( callback ){
    utils.ran_no( 5, 20 ).should.be.within( 5, 20 );
    callback();
  },

  // typeof test
  'test .typeof undefined' : function ( callback ){
    utils.typeof( undefined ).should.eql( 'undefined' );
    callback();
  },

  'test .typeof null' : function ( callback ){
    utils.typeof( null ).should.eql( 'null' );
    callback();
  },

  'test .typeof NaN' : function ( callback ){
    utils.typeof( parseInt( 'fff' )).should.eql( 'NaN' );
    callback();
  },

  'test .typeof string' : function ( callback ){
    utils.typeof( '' ).should.eql( 'string' );
    callback();
  },

  'test .typeof object' : function ( callback ){
    utils.typeof({}).should.eql( 'object' );
    callback();
  },

  'test .typeof array' : function ( callback ){
    utils.typeof([]).should.eql( 'array' );
    utils.typeof( new Array()).should.eql( 'array' );
    callback();
  },

  'test .typeof number' : function ( callback ){
    utils.typeof( 1234 ).should.eql( 'number' );
    callback();
  },

  'test .typeof boolean' : function ( callback ){
    utils.typeof( true ).should.eql( 'boolean' );
    callback();
  },

  'test .typeof function' : function ( callback ){
    utils.typeof( function(){}).should.eql( 'function' );
    callback();
  },

  'test .typeof error' : function ( callback ){
    utils.typeof( new Error()).should.eql( 'error' );
    callback();
  },
  // end typeof test

  'test .uid' : function( callback ){
    utils.uid( 32 ).should.be.a( 'string' ).and.have.length( 32 );
    callback();
  },
};