const should      = require('should');
const should_http = require('should-http');
const vodka       = require('../../../index');
const fixture     = vodka.fixture;
const validator   = vodka.validator;

describe('Test CRUD of the users api', () => {
  describe('POST /users', () => {
    it('should res json with status 201 and a user obj', (done) => {
      vodka('POST /users', {
        /* more `request` options -> https://github.com/mikeal/request */
        // headers : {}, // pass any headers to the server
        // form    : {}, // for passing form inputs
        // qs      : {}, // for passing get request params

        /* this is for `vodka` not for `request`;
         * for replace the params in url;
         * check the next test */
        // params : {},

        /* you can hard coded the user obj */
        // json : {
        //   name    : 'ben',
        //   email   : 'ben@popapp.in',
        //   website : 'https://popapp.in'
        // }

        /* or use fixture */
        json: fixture('ori_user')
      }, (err, res, body) => {
        /* you can directly inspect res here */
        // should.not.exist( err );
        // res.should.be.json;
        // res.should.have.status( 201 );

        /* but using validator will make the code more reusable */
        validator('create', err, res, body);
        /* this also applies to the user obj */
        // user.should.have.property('_id').with.a.lengthOf(24);
        // user.should.have.property('name').be.a.String.and.eql('ben');
        // user.should.have.property('email').be.a.String
        //   .and.match(vodka.utils.email);
        // user.should.have.property('website').be.a.String
        //   .and.eql('https://popapp.in');
        // user.should.have.property('created_at').be.a.Number;
        // user.should.have.property('updated_at').be.a.Number;
        // user.created_at.toString().should.have.a.lengthOf(13);
        // user.updated_at.toString().should.have.a.lengthOf(13);

        /* again validator is helpful when you have a huge code base */
        validator('user', body);
        /* save user obj as fixture for future related test */
        fixture('user', body);
        done();
      });
    }).timeout(100);
  });

  describe('GET /users/:user_id', () => {
    it('should res json with status 200 and a user obj', (done) => {
      vodka('GET /users/:user_id', {
        params: { user_id: fixture('user')._id },
        json  : true
      }, (err, res, body) => {
        validator('ok', err, res, body);
        validator('user', body);

        done();
      });
    }).timeout(100);
  });

  describe('PUT /users/:user_id', () => {
    it('should res json with status 200 and a updated user obj', (done) => {
      const update_user_data = fixture('update_user');

      vodka('PUT /users/:user_id', {
        params: { user_id: fixture('user')._id },
        json  : update_user_data
      }, (err, res, body) => {
        validator('ok', err, res, body);
        validator('user', body);

        fixture('user', body);
        body.website.should.eql('https://woomoo.in');

        done();
      });
    }).timeout(100);
  });

  describe('DELETE /users/:user_id', () => {
    it('should res json with status 204', (done) => {
      vodka('DELETE /users/:user_id', {
        params: { user_id: fixture('user')._id },
        json  : true
      }, (err, res, body) => {
        validator('destroy', err, res, body);

        done();
      });
    }).timeout(100);
  });
});
