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
      -v, --version                Display vodka version
      h,  help                     Display usage information
      n,  new [project]            Create a new test project
      g,  generate [file] [method] Generate code templates
      r,  run                      Run tests

> Generate a new test project

    $ cd /path/to/the/test/folder/of/your/app
    $ vodka new your-project-name

> Generate test actions

    $ vodka actions users signup login

> Run test

    # in the root dir of the test project
    $ vodka run



### Tutorial

> Define your configuration in `configs`

    module.exports = {
      root    : 'http://127.0.0.1:4000',
      timeout : 60000, // 1 min,
      // add to this array if you have others route files that needs to split out
      routes  : [ 'default' ]
    };

> Add your action in `actions/action_file_name.js`

    var Class = require( 'node.class' );

    module.exports = Class.extend({

      init : function ( client ){
        client.get( 'hello', this.hello, 'hello#index' );
      },

      hello : function (){
        return {
          headers : {}, // pass any headers to the server
          form    : {}, // for passing form inputs
          qs      : {}, // for passing get request params
          json    : {} // this is useful if you are testing an api server
        };
      }
    });

> Please visit [Request -- Simplified HTTP request method](https://github.com/mikeal/request) for detail

> Inspect response in `handlers/handler_file_name.js`

    var should = require( 'should' );

    module.exports = {

      index : function ( args, err, res, body, log, next ){
        // do some examination here
        // res.should.be.json;
        // body.should.have.property( 'msg' ).eql( '[delete] test passed' );

        log( 'bla bla bla' );
        // if the above test pass go to the next one
        next && next();
      }
    };




### Globals

- BASE_DIE
- ACTION_DIR
- HANDLER_DIR
- FIXTURE_DIR
- CONF
    - root
    - timeout
    - actions
- UTILS
    - color
    - $update
    - $good
    - $fine
    - $alert
    - build_hash
    - fixture
    - is
    - merge
    - ran_no
    - regex
        - begin_slash
        - has_format
        - has_none_characters
        - is_js_file
        - is_email
        - tail_slash
        - url
    - uid

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
