/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Generate new projects.
 */

var g = require( './generator' );

module.exports = function ( args ){

  g.init({
    prefix : args.shift() || 'vodka'
  });

  // create dirs
  [ '',
    'actions/',
    'fixtures/',
    'validators/'
  ].forEach( g.create_dir );

  g.create_file_by_template( 'actions/user' );
  g.create_file_by_template( 'fixtures/ori_user.json' );
  g.create_file_by_template( 'validators/common' );
  g.create_file_by_template( 'validators/user' );
  g.create_file_by_template( 'package.json' );
  g.create_file_by_template( 'README.md' );

  process.exit( 0 );
};
