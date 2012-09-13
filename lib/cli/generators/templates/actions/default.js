var Class = require( 'node.class' );

module.exports = Class.extend({

  init : function ( client ){
    client.get( 'hello', this.hello, 'hello#index' );
  },

  hello : function (){
    return {
      // headers : {}, // pass any headers to the server
      // form    : {}, // for passing form inputs
      // qs      : {}, // for passing get request params
      // json    : {} // this is useful if you are testing an api server
    };
  }
});