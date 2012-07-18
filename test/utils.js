var should = require( 'should' );
var utils  = require( '../lib/utils' );

module.exports = {
  'test .ran_no' : function ( callback ){
    utils.ran_no( 5, 20 ).should.be.within( 5, 20 );
    callback();
  },

  // typeof test
  'test .typeof_undefined' : function ( callback ){
    utils.typeof( undefined ).should.eql( 'undefined' );
    callback();
  },

  'test .typeof_null' : function ( callback ){
    utils.typeof( null ).should.eql( 'null' );
    callback();
  },

  'test .typeof_object' : function ( callback ){
    utils.typeof({}).should.eql( 'object' );
    callback();
  },

  'test .typeof_number' : function ( callback ){
    utils.typeof( 1234 ).should.eql( 'number' );
    callback();
  },

  'test .typeof_NaN' : function ( callback ){
    utils.typeof( parseInt( 'fff' )).should.eql( 'NaN' );
    callback();
  },

  'test .typeof_boolean' : function ( callback ){
    utils.typeof( true ).should.eql( 'boolean' );
    callback();
  },

  'test .typeof_function' : function ( callback ){
    utils.typeof( function(){} ).should.eql( 'function' );
    callback();
  },
  // end typeof test

  'test .uid' : function( callback ){
    utils.uid( 32 ).should.be.a( 'string' ).and.have.length( 32 );
    callback();
  },
};