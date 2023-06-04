/**
 * Module dependencies.
 */

const should         = require('should');
const should_http    = require('should-http');
const express        = require('express');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const morgan         = require('morgan');
const app            = express();
const utils          = require('../../lib/utils');

var cache = {};

module.exports = (port, done) => {
  // all environments
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride());

  app.post('/users', (req, res) => {
    req.should.be.json();

    const user = req.body;

    Object.keys(user).should.have.lengthOf(3);

    user.should.have.property('name').be.a.String();
    user.should.have.property('email').be.a.String();
    user.should.have.property('website').be.a.String();

    user._id = utils.uid(24);
    user.created_at = Date.now();
    user.updated_at = Date.now();

    res.status(201).json(user);

    cache[user._id] = user;
  });

  app.get('/users/:user_id', (req, res) => {
    req.params.should.have.property('user_id')
      .be.a.String()
      .with.lengthOf(24);

    const user = cache[req.params.user_id];

    res.json(user);
  });

  app.put('/users/:user_id', (req, res) => {
    req.should.be.json();
    req.params.should.have.property('user_id')
      .be.a.String()
      .with.lengthOf(24);

    const user = cache[req.params.user_id];

    for (const name in req.body) {
      user[name] = req.body[name];
    }

    res.json(user);
  });

  app.delete('/users/:user_id', (req, res) => {
    delete cache[req.params.user_id];

    res.header('content-type', 'application/json; charset=utf-8');
    res.sendStatus(204);
  });

  const server = app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
    done();
  });

  // Shut down the server and exit the test
  after((done) => {
    server.close(done);
  });
};
