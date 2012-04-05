module.exports = function (){
  require( '../utils' ).is_project_root( function ( current ){
    require( current + '/run.js' );
  });
};