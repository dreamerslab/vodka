# VODKA

A functional testing framework best suit for testing json api servers



## Requires

Checkout `package.json` for dependencies.



## Installation

Install through npm

    npm install vodka -g



## Usage

### Command line tools

    Usage: vodka [command] [argument(s)]

    Commands:
      -v, --version     Display vodka version
      h,  help          Display usage information
      n,  new [project] Create a new test project

    Available environment variables:
      BASE_DIR: Test project base directory  Default: `cwd`
      ROOT:     Testing target host and port Default: http://127.0.0.1:4000
      TIMEOUT:  Request timeout              Default: 60000ms

> Generate a new test project

    $ cd /path/to/the/test/folder/of/your/app
    $ vodka new your-project-name

    create  shit/
    create  shit/actions/
    create  shit/fixtures/
    create  shit/validators/
    create  shit/actions/user.js
    create  shit/fixtures/ori_user.json
    create  shit/validators/common.js
    create  shit/validators/user.js
    create  shit/package.json

> Run test

    # VODKA now come with mocha, in your test root dir call
    $ mocha -R spec -t false -b actions



### Tutorial

> Add your actions in `actions` dir. ex. `user.js`

    var should    = require( 'should' );
    var vodka     = require( '../../../index' );
    var fixture   = vodka.fixture;
    var validator = vodka.validator;

    describe( 'Test CRUD of the users api', function (){
      describe( 'POST /users', function (){
        it( 'should res json with status 201 and a user obj', function ( done ){
          vodka( 'POST /users', {
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
            json : fixture( 'ori_user' )
          }, function ( err, res, body ){
            /* you can directly inspect res here */
            // should.not.exist( err );
            // res.should.be.json;
            // res.should.have.status( 201 );

            /* but using validator will make the code more reusable */
            validator( 'create', err, res, body );

            /* this also applies to the user obj */
            // user.should.have.property( '_id' ).with.a.lengthOf( 24 );
            // user.should.have.property( 'name' ).be.a.String.and.eql( 'ben' );
            // user.should.have.property( 'email' ).be.a.String
            //   .and.match( vodka.utils.email );
            // user.should.have.property( 'website' ).be.a.String
            //   .and.eql( 'https://popapp.in' );
            // user.should.have.property( 'created_at' ).be.a.Number;
            // user.should.have.property( 'updated_at' ).be.a.Number;
            // user.created_at.toString().should.have.a.lengthOf( 13 );
            // user.updated_at.toString().should.have.a.lengthOf( 13 );

            /* again validator is helpful when you have a huge code base */
            validator( 'user', body );

            /* save user obj as fixture for future related test */
            fixture( 'user', body );

            done();
          });
        });
      });

      describe( 'GET /users/:user_id', function (){
        it( 'should res json with status 200 and a user obj', function ( done ){
          vodka( 'GET /users/:user_id', {
            params : { user_id : fixture( 'user' )._id },
            json   : true
          }, function ( err, res, body ){
            validator( 'ok', err, res, body );
            validator( 'user', body );

            done();
          });
        });
      });

      describe( 'PUT /users/:user_id', function (){
        it( 'should res json with status 200 and a updated user obj', function ( done ){
          var update_user_data = fixture( 'update_user' );

          vodka( 'PUT /users/:user_id', {
            params : { user_id : fixture( 'user' )._id },
            json   : update_user_data
          }, function ( err, res, body ){
            validator( 'ok', err, res, body );
            validator( 'user', body );

            fixture( 'user', body );
            body.website.should.eql( 'https://woomoo.in' );

            done();
          });
        });
      });

      describe( 'DELETE /users/:user_id', function (){
        it( 'should res json with status 204', function ( done ){
          vodka( 'DELETE /users/:user_id', {
            params : { user_id : fixture( 'user' )._id },
            json   : true
          }, function ( err, res, body ){
            validator( 'destroy', err, res, body );

            done();
          });
        });
      });
    });

> Please visit [Request -- Simplified HTTP request method](https://github.com/mikeal/request) for detail

> Inspect response format with validator in `validators/validator_file_name.js`

    var should = require( 'should' );
    var email  = require( 'vokda' ).utils.regex.email;

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



### Object Properties

    vodka
      - configs
        - BASE_DIR
        - ROOT
        - TIMEOUT
      - fixture
      - utils
          - is
          - merge
          - ran_no
          - regex
            - begin_slash
            - email
            - format
            - js_file
            - none_characters
            - tail_slash
            - url
          - uid
      - validator
      - version

> Check the source for detail



## License

(The MIT License)

Copyright (c) 2012 dreamerslab &lt;ben@dreamerslab.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
