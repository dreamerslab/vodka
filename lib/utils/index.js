/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Utility functions.
 */

/**
 * @public
 */
const utils = {

  /**
   * Regular expression collection.
   * @public
   */
  regex: require('./regex'),

  /**
   * Use this instead of the untrusted typeof.
   * @public
   * @param {Object} obj The target object.
   * @returns {String} Returns the capitalized type name.
   * @example
   *
   *     var type = utils.is('i\'m a string');
   */
  is: (obj) => {
    if (obj === null) return 'null';
    if (obj === undefined) return 'undefined';

    var ret = {}.toString.call(obj).match(/^\[object\s+(.*?)\]$/)[1];

    ret = ret ? ret.toLowerCase() : '';

     return ret == 'number' && isNaN( obj ) ? 'NaN' : ret;
  },

  /**
   * Clone objects.
   * @public
   * @param {String} arguments[n] Objects to clone.
   * @returns {Object} Returns the new cloned object.
   * @example
   *
   *     var child = utils.merge(mom, dad);
   */
  merge: (...args) => {
    var child = {};
    args.forEach((parent) => {
      for (var prop in parent) {
        child[prop] = parent[prop];
      }
    });
    return child;
  },

  /**
   * Generate random number by the given range.
   * @public
   * @param {Number} min The minimum number.
   * @param {Number} max The maximum number.
   * @returns {Number} Returns the random number.
   * @example
   *
   *     var ran = utils.ranNo(10, 100);
   */
  ranNo: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Generate a unique ID string.
   * @public
   * @param {Number} len ID length.
   * @returns {String} Returns the unique ID.
   * @example
   *
   *     var id = utils.uid(32);
   */
  uid: (len) => {
    var str       = '';
    const src     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const src_len = src.length;
    var i         = len;

    for (; i-- ;) {
      str += src.charAt(utils.ranNo(0, src_len - 1));
    }

    return str;
  }
};

/**
 * Exports module.
 */
module.exports = utils;
