/**
 * Exports module.
 */
module.exports = function ( base_dir ){

/**
 * Exports module as getter to global.
 */

  global.__defineGetter__( 'BASE_DIR', function (){
    return base_dir + '/';
  });

  global.__defineGetter__( 'ACTION_DIR', function (){
    return base_dir + '/actions/';
  });

  global.__defineGetter__( 'HANDLER_DIR', function (){
    return base_dir + '/handlers/';
  });

  global.__defineGetter__( 'FIXTURE_DIR', function (){
    return base_dir + '/fixtures/';
  });

  global.__defineGetter__( 'CONF', function (){
    return require( base_dir + '/configs' );
  });
};