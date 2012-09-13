/**
 * Module dependencies.
 * @private
 */
var Class = require( 'node.class' );

var Client = Class.extend({

  init : function (){
    this.actions = [];
  },

  build : function ( method, uri, action, handler_name ){
    this.actions.push({
      method       : method,
      uri          : uri,
      action       : action,
      handler_name : handler_name
    });
  },

  get : function ( uri, action, handler_name ){
    this.build( 'get', uri, action, handler_name );
  },

  post : function ( uri, action, handler_name ){
    this.build( 'post', uri, action, handler_name );
  },

  put : function ( uri, action, handler_name ){
    this.build( 'put', uri, action, handler_name );
  },

  'delete' : function ( uri, action, handler_name ){
    this.build( 'delete', uri, action, handler_name );
  },

  run : function ( action ){
    this.build( 'run', action );
  }
});

/**
 * Exports module.
 */
module.exports = Client;