var Class = require( 'node.class' );

module.exports = Class.extend({

  init : function ( client, out ){
    client.get( 'hello', this.hello, 'hello#index' );
    client.end( function (){
      out();
    });
  },

  hello : function (){
    return {
      // headers : {}, // pass any headers to the server
      // form : {}, // for passing form inputs
      // qs   : {}, // for passing get request params
      // json : {} // this is useful if you are testing an api server
    };
  }
});