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
if( root ){
  console.log(
    UTILS.$alert( 'error' ) + '   root url is not defined in configs.js'
  );
  return;
}

if( !root.test( UTILS.regex.url )){
  console.log(
    UTILS.$alert( 'error' ) + '   invalid root url in configs.js'
  );
  return;
}

var route = function ( method, url, actions, action, args, next ){
  // url validate
  url = url.replace( UTILS.regex.begin_slash, '' );

  if( !url.test( UTILS.regex.url )){
    console.log(
      UTILS.$alert( 'error' ) +
      '   invalid route `' + url + '`'
    );
    return;
  }

  if( !actions[ action ]){
    console.log(
      UTILS.$alert( 'error' ) +
      '   action does not exist for route `' + url + '`'
    );
    return;
  }

  if( UTILS.is( args ) === 'Function' && next === undefined ){
    next = args;
    args = undefined;
  }

  var _action = actions[ action ]( args, next );

  if( UTILS.is( _action.handler ) !== 'Function' ){
    console.log(
      UTILS.$alert( 'error' ) +
      '   action handler must be a function for route `' + url + '`'
    );
    return;
  }

  var handler = _action.handler;

  delete _action[ action ].handler;

  var opt     = _action[ action ];
  opt.method  = method;
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