/**
 * Module dependencies.
 */

var should  = require( 'should' );
var express = require( 'express' );
var http    = require( 'http' );
var app     = express();
var utils   = require( '../../lib/utils' );
var cache   = {};

module.exports = function ( port, done ){
  // all environments
  app.set( 'port', port );
  app.use( express.logger( 'dev' ));
  app.use( express.json());
  app.use( express.urlencoded());
  app.use( express.methodOverride());
  app.use( app.router );

  app.post( '/users', function ( req, res ){
    req.should.be.json;

    var user = req.body;

    Object.keys( user ).should.have.a.lengthOf( 3 );

    user.should.have.property( 'name' ).be.a.String;
    user.should.have.property( 'email' ).be.a.String;
    user.should.have.property( 'website' ).be.a.String;

    user._id        = utils.uid( 24 );
    user.created_at = Date.now();
    user.updated_at = Date.now();

    res.status( 201 ).json( user );

    cache[ user._id ] = user;
  });

  app.get( '/users/:user_id', function ( req, res ){
    req.params.should.have.property( 'user_id' ).
      be.a.String.with.a.lengthOf( 24 );

    var user = cache[ req.params.user_id ];

    res.json( user );
  });

  app.put( '/users/:user_id', function ( req, res ){
    req.should.be.json;
    req.params.should.have.property( 'user_id' ).
      be.a.String.with.a.lengthOf( 24 );

    var user = cache[ req.params.user_id ];

    for( var name in req.body ){
      user[ name ] = req.body[ name ];
    }

    res.json( user );
  });

  app.delete( '/users/:user_id', function ( req, res ){
    delete cache[ req.params.user_id ]

    res.statusCode = 204;
    res.header( 'content-type', 'application/json; charset=utf-8' );
    res.end();
  });

  http.createServer( app ).listen( app.get( 'port' ), function (){
    console.log('Express server listening on port ' + app.get( 'port' ));
    done();
  });
};
