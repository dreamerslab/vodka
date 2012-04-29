/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Dispatch routes.
 */

/**
 * Module dependencies.
 * @private
 * @require
 */
var request = require( 'request' );
var extend  = require( 'node.extend' );

var base_dir = CONF.base_dir;
var configs  = require( base_dir + 'configs' );
var root     = configs.root.replace( UTILS.regex.tail_slash, '' ) + '/';

// check root url in configs.js
if( !root ){
  console.log(
    UTILS.$alert( 'error' ) + '   root url is not defined in configs.js'
  );
  return;
}

if( !UTILS.regex.url.test( root )){
  console.log(
    UTILS.$alert( 'error' ) + '   invalid root url in configs.js'
  );
  return;
}

var route = function ( method, url, actions, action, args, next ){
  // url validate
  url = url.replace( UTILS.regex.begin_slash, '' );

  if( !UTILS.regex.url.test( root )){
    console.log(
      UTILS.$alert( 'error' ) +
      '   invalid route `' + url + '`'
    );
    return;
  }

  if( !/#/g.test( action )){
    console.log(
      UTILS.$alert( 'error' ) +
      '   wrong format of the route `' + url + '`'
    );
    return;
  }

  var tmp  = action.split( '#' );
  var file = tmp[ 0 ];
  var fn   = tmp[ 1 ];

  if( !actions[ file ][ fn ]){
    console.log(
      UTILS.$alert( 'error' ) +
      '   action does not exist for route `' + url + '`'
    );
    return;
  }

  if( UTILS.typeof( args ) === 'function' && next === undefined ){
    next = args;
    args = undefined;
  }

  var _action = actions[ file ][ fn ]( args, next );

  if( UTILS.typeof( _action.handler ) !== 'function' ){
    console.log(
      UTILS.$alert( 'error' ) +
      '   action handler must be a function for route `' + url + '`'
    );
    return;
  }

  var handler = _action.handler;

  delete _action.handler;

  var opt     = _action;
  opt.method  = method;
  opt.uri     = root + url;
  opt.timeout = opt.timeout ?
    opt.timeout : configs.timeout;

  request( opt, handler );
};

/**
 * Exports module.
 */
module.exports = function ( actions ){
  return {
    get : function ( url, action, args, next ){
      route( 'get', url, actions, action, args, next );
    },

    post : function ( url, action, args, next ){
      route( 'post', url, actions, action, args, next );
    },

    put : function ( url, action, args, next ){
      route( 'put', url, actions, action, args, next );
    },

    'delete' : function ( url, action, args, next ){
      route( 'delete', url, actions, action, args, next );
    }
  };
};