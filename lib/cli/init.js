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
    'handlers/',
    'fixtures/'
  ].forEach( lib.create_dir );

  lib.create_file_by_template( 'configs' );
  lib.create_file_by_template( 'actions/default' );
  lib.create_file_by_template( 'handlers/hello' );
  lib.create_file_by_template( 'fixtures/someone.json' );
  lib.create_file_by_template( 'run' );
  lib.create_file_by_template( 'package.json' );

  process.exit( 0 );
};