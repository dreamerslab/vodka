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
      console.log(
        UTILS.$alert( 'error   ' ) + 'uri not defined in action file `' + this.file_name + '`'
      );

      return process.exit( 0 );
    }

    if( action === undefined ){
      console.log(
        UTILS.$alert( 'error   ' ) + 'action does not exist in action file `' + this.file_name + '` for uri `' + uri + '`'
      );

      return process.exit( 0 );
    }

    if( !/#/g.test( handler_name )){
      console.log(
        UTILS.$alert( 'error'    ) + 'wrong format of the handler `' + handler_name + '` in action file `' + this.file_name + '` for uri `' + uri + '`'
      );

      return process.exit( 0 );
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