module.exports = function (){
  require( './generators/lib' ).is_project_root( function ( current ){
    require( current + '/run.js' );
  });
};