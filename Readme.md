# VODKA

A functional testing framework for web apps 

# Description
**Vodka** is a functional testing framework born to fit the web apps that have API reponse with JSON need 


## Requires

Checkout `package.json` for dependencies.



## Installation

Install inflection through npm

    npm install vodka -g



## Usage

> Generate a new test project

    $ cd /path/to/the/test/folder/of/your/app
    $ vodka new your-project-name

> Generate test actions

    $ vodka actions users signup login

> Run test

    # in the root dir of the test project
    $ vodka run

> Define your configuration in `configs`
    
    module.exports = {
      root    : 'http://127.0.0.1:4000',
      timeout : 60000, // 1 min,
      // add to this array if you have others route files that needs to split out
      routes  : [ 'default' ]
    };

> Define your routes in `routes/default` with `node.flow`
    
    var Flow = require( 'node.flow' );

    module.exports = function ( map, out ){
      flow.series( function ( next ){
        map.get( 'url/users/', 'action_file_name#function_name', next );
      });
    };
    
> Add your action in `actions/action_file_name`

    module.exports = {
      function_name : function ( args, next ){
        return {
          headers : {},
          json    : {},
          handler : function ( err, res, body ){}
        };
      },
    };
    
> P/S : Visit [Request -- Simplified HTTP request method](https://github.com/mikeal/request)
        for more details about object that needed to be return in action function

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