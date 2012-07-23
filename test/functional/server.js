var should  = require( 'should' );
var express = require( 'express' );
var app  = express.createServer();

app.configure( function(){
  app.use( express.bodyParser());
  app.use( express.methodOverride());
  app.use( app.router );
});

app.get( '/tests/get', function ( req, res ){
  req.should.be.json;
  req.headers.should.have.property( 'x-headers' );

  res.json({ msg : '[get] test passed' });
});

app.post( '/tests/post', function ( req, res ){
  req.should.be.json;
  req.headers.should.have.property( 'x-headers' );
  req.body.test.should.eql( 'JSON test' );

  res.json({ msg : '[post] test passed' });
});

app.put( '/tests/put', function ( req, res ){
  req.should.be.json;
  req.body.test.should.eql( 'JSON test' );
  req.headers.should.have.property( 'x-headers' );

  res.json({ msg : '[put] test passed' });
});

app.delete( '/tests/delete', function ( req, res ){
  req.should.be.json;
  req.headers.should.have.property( 'x-headers' );
  req.body.test.should.eql( 'JSON test' );

  res.json({ msg : '[delete] test passed' });
});

module.exports = function ( port, next ){
  app.listen( port );
  next();
};
