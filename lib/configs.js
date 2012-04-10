/**
 * Module dependencies.
 * @private
 * @require
 */
var extend = require( 'node.extend' );

/**
 * Exports module.
 */
module.exports = function ( base_dir ){
  var defaults = {
    base_dir   : base_dir + '/',
    action_dir : base_dir + '/actions/',
    data_dir   : base_dir + '/data/'
  };

  var custom = require( base_dir + '/configs' );

/**
 * Exports module as getter to global.
 */
  global.__defineGetter__( 'CONF', function (){
    return extend( defaults, custom );
  });
};