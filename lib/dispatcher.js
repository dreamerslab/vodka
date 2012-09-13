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
var Flow     = require( 'node.flow' );
var flow     = new Flow();
var series   = flow.series;
var slice    = [].slice;
var handlers = UTILS.build_hash( HANDLER_DIR );

var Dispatch = Class.extend({

  init : function ( method, uri, action, handler_name, next ){
    this.handler_name = handler_name;
    this.action       = action();

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
        UTILS.$alert( 'error   ' ) + 'lack of params from action `' + this.action_name + '`'
      );
      return process.exit( 0 );
    }

    var param_key;

    for( ; i-- ; ){
      param_key = param_patterns[ i ].replace( ':', '' );

      if( !this.action.params[ param_key ]){
        console.log(
          UTILS.$alert( 'error   ' ) + 'lack of params from action `' + action_name + '`'
        );
        return process.exit( 0 );
      }

      uri = uri.replace( param_patterns[ i ], this.action.params[ param_key ]);
    }

    this.uri = uri;
  },

  build_action : function ( next ){
    var self = this;

    if( this.action === undefined ){
      console.log(
        UTILS.$alert( 'error   ' ) + '`' + action_name + '` action deos not exist'
      );
      return process.exit( 0 );;
    }

    if( !/#/g.test( this.handler_name )){
      console.log(
        UTILS.$alert( 'error'    ) + 'wrong format of the handler `' + uri + '`'
      );
      return process.exit( 0 );;
    }

    var tmp     = this.handler_name.split( '#' );
    var file    = this.handler_class  = tmp[ 0 ];
    var fn      = this.handler_method = tmp[ 1 ];
    var handler = handlers[ file ][ fn ];

    if( !handler){
      console.log(
        UTILS.$alert( 'error' ) + '   handler does not exist for handler `' + uri + '`'
      );
      return process.exit( 0 );;
    }

    if( UTILS.typeof( handler) !== 'function' ){
      console.log(
        UTILS.$alert( 'error' ) +
        '   action handler must be a function for action `' + uri + '`'
      );
      return process.exit( 0 );;
    }

    var args = this.action.args || {};

    delete this.action.args;

    this.handler = function ( err, res, body ){
      var _next = function (){
        console.log( UTILS.$good( ' Passed :)' ));
        next && next.apply( this, slice.call( arguments ));
      };

      handler( args, err, res, body, self.log, _next );
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
  console.log(
    UTILS.$alert( 'error' ) + '   root uri is not defined in configs.js'
  );
  return;
}

if( !UTILS.regex.url.test( root )){
  console.log(
    UTILS.$alert( 'error' ) + '   invalid root uri in configs.js'
  );
  return;
}

/**
 * Exports module.
 */
module.exports = {
  get : function ( uri, action, handler_name ){
    series.call( flow, function ( next ){
      new Dispatch( 'get', uri, action, handler_name, next );
    });
  },

  post : function ( uri, action, handler_name ){
    series.call( flow, function ( next ){
      new Dispatch( 'post', uri, action, handler_name, next );
    });
  },

  put : function ( uri, action, handler_name ){
    series.call( flow, function ( next ){
      new Dispatch( 'put', uri, action, handler_name, next );
    });
  },

  'delete' : function ( uri, action, handler_name ){
    series.call( flow, function ( next ){
      new Dispatch( 'delete', uri, action, handler_name, next );
    });
  },

  run : function ( action ){
    series.call( flow, function (){
      action.apply( action, slice.call( arguments ));
    });
  },

  end : function (){
    flow.end.apply( flow, slice.call( arguments ));
  }
};