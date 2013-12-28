var should = require( 'should' );
var email  = require( '../../../index' ).utils.regex.email;

module.exports = {

  user : function ( user ){
    Object.keys( user ).should.have.a.lengthOf( 6 );

    user.should.have.property( '_id' ).with.a.lengthOf( 24 );
    user.should.have.property( 'name' ).be.a.String;
    user.should.have.property( 'email' ).be.a.String.and.match( email );
    user.should.have.property( 'website' ).be.a.String;
    user.should.have.property( 'created_at' ).be.a.Number;
    user.should.have.property( 'updated_at' ).be.a.Number;
    user.created_at.toString().should.have.a.lengthOf( 13 );
    user.updated_at.toString().should.have.a.lengthOf( 13 );
  }
};
