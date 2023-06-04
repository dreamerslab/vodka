/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Generate new projects.
 */

const g = require('./generator');

module.exports = (args) => {
  g.init({
    prefix: args.shift() || 'vodka'
  });

  // create dirs
  [
    '',
    'actions/',
    'fixtures/',
    'validators/'
  ].forEach(g.createDir);

  g.createFileByTemplate('actions/user');
  g.createFileByTemplate('fixtures/ori_user.json');
  g.createFileByTemplate('validators/common');
  g.createFileByTemplate('validators/user');
  g.createFileByTemplate('package.json');
  g.createFileByTemplate('README.md');

  process.exit(0);
};
