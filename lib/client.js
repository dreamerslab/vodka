/**
 * Module dependencies.
 * @private
 */
var Class = require( 'node.class' );

var Client = Class.extend({

  init : function ( file_name ){
    this.actions   = [];
    this.file_name = file_name;
  },

  build : function ( method, uri, action, handler_name ){
    if( !uri ){
      return console.log(
        UTILS.$alert( 'error   ' ) + 'uri not defined in action file `' + this.file_name + '`'
      );
    }

    if( action === undefined ){
      return console.log(
        UTILS.$alert( 'error   ' ) + 'action does not exist in action file `' + this.file_name + '` for uri `' + uri + '`'
      );
    }

    if( !/#/g.test( handler_name )){
      return console.log(
        UTILS.$alert( 'error'    ) + 'wrong format of the handler `' + handler_name + '` in action file `' + this.file_name + '` for uri `' + uri + '`'
      );
    }

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
    this.actions.push({
      method : 'run',
      action : action
    });
  }
});

/**
 * Exports module.
 */
module.exports = Client;