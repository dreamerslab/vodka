/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Generate new projects.
 */

var lib = require( './generators/lib' );

module.exports = function ( args ){

  lib.init({
    prefix : args.shift() || 'vodka'
  });

  // create dirs
  [ '',
    'actions/',
    'data/'
  ].forEach( lib.create_dir );

  lib.create_file( 'actions/.gitkeep' );
  lib.create_file( 'data/.gitkeep' );

  lib.create_file_by_template( 'configs' );
  lib.create_file_by_template( 'routes' );
  lib.create_file_by_template( 'run' );
  lib.create_file_by_template( 'package.json' );

  process.exit( 0 );
};