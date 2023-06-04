/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Get or set teseting data.
 */

/**
 * Module dependencies.
 * @private
 * @require
 */
const fs = require('fs');
const configs = require('./configs');

/**
 * Get or set testing data.
 * @public
 * @param {String} name Name of the fixture.
 * @param {String} val Value to be set of the fixture.
 * @returns {Object} Returns the fixture.
 * @example
 *
 *     const user = client.fixture('user');
 *
 *     fixture('user', user);
 */
const fixture = (name, val) => {
  const path = `${configs.BASE_DIR}/fixtures/${name}.json`;

  if (val) {
    return fs.writeFileSync(path, JSON.stringify(val, null, 2));
  }

  if (!fs.existsSync(path)) {
    throw new Error(`[vodka] fixture not exists; name: ${name}`);
  }

  return JSON.parse(fs.readFileSync(path));
};

/**
 * Exports module.
 */
module.exports = fixture;
