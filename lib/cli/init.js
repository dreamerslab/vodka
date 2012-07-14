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
    'data/',
    'routes/'
  ].forEach( lib.create_dir );

  lib.create_file_by_template( 'configs' );
  lib.create_file_by_template( 'routes/default' );
  lib.create_file_by_template( 'actions/hello' );
  lib.create_file_by_template( 'data/someone.json' );
  lib.create_file_by_template( 'run' );
  lib.create_file_by_template( 'package.json' );

  process.exit( 0 );
};