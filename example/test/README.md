# Vodka example

This example is using [Express](http://expressjs.com), please visit offcial website for more detailed documentation.

# Run the example
  
  1.Make sure you have [Express installed](http://expressjs.com/guide.html#installation).
  
  2.Start the server
    
      $ cd path/to/example/dir
      $ npm install -l
      $ node app.js
      
  3.Run tests

      $ cd test
      $ nmp install -l
      $ vdk r
      
# How does it work?
  
  1.Define configuration at `path/to/example/test/config.js`.

    module.exports = {
      root    : 'http://127.0.0.1:3000',//define app address
      timeout : 60000, // 1 min,
      routes  : [
        'tests'//define tests route file,just add to this array if you have other files
      ]
    };

  2.Define tests route and handler at `path/to/example/test/routes/filename.js`

    var Flow = require( 'node.flow' );

    module.exports = function ( map, out ){
      var flow = new Flow();

      flow.series( function ( next ){
        map.get( 'url/to/api', 'action_module#handler_method', next );
      });

      flow.end( function (){
        console.log( 'All tests passed' );
        out();// run callback
        process.exit();
      });
    };
    
  * `action_module` wiil be define at `path/to/example/test/actions/action_module.js` on next step
  * [detailed documentation](https://github.com/dreamerslab/node.flow) about `flow`
  * `map.get` could be change to `map.post`, `map.delete` or `map.put` depands on your API, there is [detailed documentation](http://railwayjs.com/) about `map`
  
3.Define what to test/action handler at `path/to/example/test/actions/action_module.js`

    var should = require( 'should' );

    module.exports = {
      handler_method : function ( args, next ){
      
        return {
          headers : {
            'x-headers' : 'headers test'
          },
          json : {
            test : 'JSON test'
          },
          handler : function ( err, res, body ){
            res.should.be.json;// response from server should be JSON
            body.should.have.property( 'msg' ).eql( '[get] test passed' );

            next();
          }
        };
      }
    };
    
  * [detailed documentation](https://github.com/visionmedia/should.js/tree/) about `should`
