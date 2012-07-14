var fs       = require( 'fs' );
var data_dir = CONF.data_dir;

module.exports = {

  index : function ( args, next ){
    // get some data from data path,
    // you might also want to save it back from server response for later use
    var someone = JSON.parse( fs.readFileSync( data_dir + 'someone.json' ));

    // do not mix the use of `form`, `qs`, & `json`
    // for more detail please check https://github.com/mikeal/request/
    return {
      // headers : {}, // pass any headers to the server
      // form : {}, // for passing form inputs
      // qs   : {}, // for passing get request params
      // json : {}, // this is useful if you are testing an api server
      handler : function ( err, res, body ){
        // you can use the build in `assert` module to exam the response here.

        // if the above test pass go to the next one
        next && next();
      }
    };
  }
};