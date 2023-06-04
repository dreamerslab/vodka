/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Get and build validator.
 */

/**
 * Module dependencies.
 * @private
 * @require
 */
const fs      = require('fs');
const configs = require('./configs');
const path    = `${configs.BASE_DIR}/validators`;

if (!fs.existsSync(path)) {
  throw new Error(`[vodka] validator path not exists; path: ${path}`);
}

const files = fs.readdirSync(path);
let isBuilt = false;

/**
 * Get and call validator.
 * @public
 * @param {String} name Name of the user.
 * @param {Any} args Arguments for the validator.
 * @returns {Object} Returns the fixture.
 * @example
 *
 *     client.validator('user', user);
 */
const validator = (...args) => {
  const name    = args.shift();
  let breakLoop = false;
  var validator, handler, prop;

  if (!isBuilt) {
    files.some((file) => {
      if (/\.js$/.test(file)) {
        validator = require(`${path}/${file}`);
        prop      = '';

        for (prop in validator) {
          if (prop === name) {
            handler = validator[prop];
            handler.apply(validator, args);
            breakLoop = true;
            break;
          }
        }
      }

      return breakLoop;
    });
  }

  if (!breakLoop) {
    throw new Error(`[vodka] validator not exists; name: ${name}`);
  }
};

/**
 * Exports module.
 */
module.exports = validator;
