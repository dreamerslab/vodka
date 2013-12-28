/**
 * Module dependencies.
 * @private
 */

var request = require( 'request' );
var utils   = require( './utils' );
var configs = require( './configs' );

function build_url( action, url, params ){
  url = url.trim().replace( utils.regex.begin_slash, '' );

  var param_patterns = url.match( /:\w+/g );

  if( param_patterns === null ) return url;

  var i = param_patterns.length;

  if( i && params === undefined ){
    throw new Error( '[vodka] lack of params for action: ' + action );
  }

  var param_key;

  for( ; i-- ; ){
    param_key = param_patterns[ i ].replace( ':', '' );

    if( !params[ param_key ]){
      throw new Error( '[vodka] lack of param: ' + param_key + ' for action: ' + action );
    }

    url = url.replace( param_patterns[ i ], params[ param_key ]);
  }

  return url;
}

/**
 * Exports module.
 */
module.exports = function ( action, req, res ){
  var opt = req;
  var tmp = action.trim().split( ' ' );

  if( tmp.length <= 1 ){
    throw new Error( '[vodka] `Method` not specified in action: ' + action );
  }

  opt.method = tmp[ 0 ].toLowerCase();

  if( !/^(post|get|put|delete)$/i.test( opt.method )){
    throw new Error( '[vodka] `Method` not allowed in action: ' + action );
  }

  var params = req.params

  delete req.params;

  opt.url     = configs.ROOT + '/' + build_url( action, tmp[ 1 ], params );
  opt.timeout = opt.timeout || configs.TIMEOUT;

  request( opt, res );
};
