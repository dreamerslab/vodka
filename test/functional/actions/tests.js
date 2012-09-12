var Class = require( 'node.class' );
var opt = {
  headers : {
    'x-headers' : 'headers test'
  },
  json : {
    test : 'JSON test'
  }
};

module.exports = Class.extend({

  init : function ( client, out ){
    client.get( 'tests/get', this.get, 'tests#get' );
    client.post( 'tests/post', this.post, 'tests#post' );
    client.put( 'tests/put', this.put, 'tests#put' );
    client.delete( 'tests/delete', this.delete, 'tests#delete' );
    client.end( function (){
      out();
    })
  },

  get : function (){ return opt; },

  post : function (){ return opt; },

  put : function (){ return opt; },

  delete : function (){ return opt; }
});