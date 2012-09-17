/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Dispatch actions.
 */

/**
 * Module dependencies.
 * @private
 * @require
 */
var Class    = require( 'node.class' );
var request  = require( 'request' );
var configs  = CONF;
var root     = configs.root.replace( UTILS.regex.tail_slash, '' ) + '/';
var slice    = [].slice;
var handlers = UTILS.build_hash( HANDLER_DIR );

var Dispatcher = Class.extend({

  init : function ( method, uri, action_instance, action, handler_name, next ){
    this.handler_name = handler_name;
    this.action       = action.call( action_instance );

    this.build_uri( uri );
    this.build_action( next );
    this.exec( method );
  },

  log : function ( msg ){
    process.stdout.write( msg );
  },

  build_uri : function ( uri ){
    var param_patterns = uri.match( /:\w+/g );

    if( param_patterns === null ){
      this.uri = uri;

      return;
    }

    var i = param_patterns.length;

    if( i && this.action.params === undefined ){
      console.log(
        UTILS.$alert( 'error   ' ) + 'lack of params from action `' + uri + '`'
      );
      return process.exit( 0 );
    }

    var param_key;

    for( ; i-- ; ){
      param_key = param_patterns[ i ].replace( ':', '' );

      if( !this.action.params[ param_key ]){
        console.log(
          UTILS.$alert( 'error   ' ) + 'lack of params from action `' + uri + '`'
        );
        return process.exit( 0 );
      }

      uri = uri.replace( param_patterns[ i ], this.action.params[ param_key ]);
    }

    this.uri = uri;
  },

  build_action : function ( next ){
    var self = this;
    var tmp  = this.handler_name.split( '#' );
    var file = this.handler_class  = tmp[ 0 ];
    var fn   = this.handler_method = tmp[ 1 ];

    if( !( handlers[ file ] && handlers[ file ][ fn ])){
      console.log(
        UTILS.$alert( 'error' ) + '   handler `' + this.handler_name + '` does not exist'
      );
      return process.exit( 0 );
    }

    var handler = handlers[ file ][ fn ];

    if( UTILS.typeof( handler) !== 'function' ){
      console.log(
        UTILS.$alert( 'error' ) + '   handler `' + this.handler_name + '`must be a function'
      );
      return process.exit( 0 );
    }

    var args = this.action.args || {};

    delete this.action.args;

    this.handler = function ( err, res, body ){
      var _next = function (){
        console.log( UTILS.$good( ' Passed :)' ));
        next && next.apply( this, slice.call( arguments ));
      };

      handler.call( handlers[ file ], args, err, res, body, self.log, _next );
    };
  },

  exec : function ( method ){
    var self = this;
    var opt  = this.action;

    opt.method  = method;
    opt.uri     = root + this.uri;
    opt.timeout = opt.timeout || configs.timeout;

    request( opt, function ( err, res, body ){
      var tmp     = [ '[ ', self.handler_class, ' ]', '[ ', self.handler_method, ' ]' ].join( '' );
      var $action = UTILS.colors.bgBlue.white.bold( tmp );
      var $others = UTILS.colors.yellow( method.toUpperCase() + ' : ' + opt.uri );
      var info    = $action + ' ' + $others;

      console.log( info );
      self.handler( err, res, body );
    });
  }
});

// check root uri in configs.js
if( !root ){
  return console.log(
    UTILS.$alert( 'error' ) + '   root uri is not defined in configs.js'
  );
}

if( !UTILS.regex.url.test( root )){
  return console.log(
    UTILS.$alert( 'error' ) + '   invalid root uri in configs.js'
  );
}

/**
 * Exports module.
 */
module.exports = Dispatcher;