/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Utility functions.
 */

/**
 * Module dependencies.
 * @private
 */
const fs = require('fs');
const { regex } = require('../../utils');

const _ = {
  create: (path, content, method) => {
    if (_.opt && _.opt.prefix) {
      path = `${_.opt.prefix}/${path}`;
    }

    _.path_exists(
      path,
      (fullPath) => {
        console.log(`exists  ${path}`);
      },
      (fullPath) => {
        fs[method](fullPath, content);
        console.log(`create  ${path}`);
      }
    );
  },

  createFile: (path, content) => {
    if (content === undefined) content = '';

    _.create(path, content, 'writeFileSync');
  },

  fullPath: (path) => {
    return `${process.cwd()}/${path === undefined ? '' : path}`;
  },

  path_exists: (_path, exist, notExist) => {
    const fullPath = _.fullPath(_path);

    if (fs.existsSync(fullPath)) {
      exist && exist(fullPath);
    } else {
      notExist && notExist(fullPath);
    }
  }
};

/**
 * Exports module.
 */
module.exports = {
  init: (opt) => {
    _.opt = opt === undefined ? {} : opt;
  },

  /**
   * Add spaces for better syntax of VODKA command line tools.
   * @public
   * @param {Function} str The target string.
   * @param {Function} len Max length including the target string plus spaces.
   * @param {Function} toStart Add spaces to the front.
   */
  addSpaces: (str, len, toStart) => {
    let str_len = str.length;
    let i       = str_len;

    for (; i < len; i += 1) {
      if (!toStart) {
        str += ' ';
      } else {
        str = ' ' + str;
      }
    }

    return str;
  },

  createDir: (path) => {
    _.create(path, '0755', 'mkdirSync');
  },

  createFileByTemplate: (path) => {
    if (!path.match(regex.format)) {
      path += '.js';
    }

    const content = fs.readFileSync(`${__dirname}/templates/${path}`, 'utf8');

    return _.createFile(path, content);
  }
};
