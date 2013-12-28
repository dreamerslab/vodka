var should = require( 'should' );
var utils  = require( '../../lib/utils' );

describe( 'utils.js tests', function (){
  describe( 'test utils.is', function (){
    it( 'should eql undefined', function (){
      utils.is( undefined ).should.eql( 'undefined' );
    });

    it( 'should eql null', function (){
      utils.is( null ).should.eql( 'null' );
    });

    it( 'should eql NaN', function (){
      utils.is( parseInt( 'fff' )).should.eql( 'NaN' );
    });

    it( 'should eql string', function (){
      utils.is( '' ).should.eql( 'string' );
    });

    it( 'should eql object', function (){
      utils.is({}).should.eql( 'object' );
    });

    it( 'should eql array', function (){
      utils.is([]).should.eql( 'array' );
      utils.is( new Array()).should.eql( 'array' );
    });

    it( 'should eql number', function (){
      utils.is( 1234 ).should.eql( 'number' );
    });

    it( 'should eql boolean', function (){
      utils.is( true ).should.eql( 'boolean' );
    });

    it( 'should eql function', function (){
      utils.is( function(){}).should.eql( 'function' );
    });

    it( 'should eql error', function (){
      utils.is( new Error()).should.eql( 'error' );
    });
  });

  describe( 'test utils.merge', function (){
    var result = utils.merge(
      { a : 1, b : 2 },
      { a : 3, x : 4 }
    );

    it( 'should merge 2 objs with 3 props in total', function (){
      result.should.have.property( 'a' ).eql( 3 );
      result.should.have.property( 'b' ).eql( 2 );
      result.should.have.property( 'x' ).eql( 4 );
    });
  });

  describe( 'test utils.ran_no', function (){
    it( 'should produce random number between 5 to 20', function (){
      utils.ran_no( 5, 20 ).should.be.within( 5, 20 );
    });
  });

  describe( 'test utils.uid', function (){
    it( 'should produce uid with length of 32', function (){
      utils.uid( 32 ).should.be.a.String.and.have.a.lengthOf( 32 );
    });
  });
});
