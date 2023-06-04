/**
 * Module dependencies.
 * @private
 */

const request = require('request');
const utils   = require('./utils');
const configs = require('./configs');

const buildUrl = (action, url, params) => {
  url = url.trim().replace(utils.regex.beginSlash, '');

  const paramPatterns = url.match(/:\w+/g);

  if (paramPatterns === null) return url;

  const replacedUrl = paramPatterns.reduce((accUrl, paramPattern) => {
    const paramKey = paramPattern.replace(':', '');

    if (!params[paramKey]) {
      throw new Error(`[vodka] lack of param: ${paramKey} for action: ${action}`);
    }

    return accUrl.replace(paramPattern, params[paramKey]);
  }, url);

  return replacedUrl;
};

module.exports = (action, req, res) => {
  let tmp = action.trim().split(' ');
  var opt = req;

  if (tmp.length <= 1) {
    throw new Error(`[vodka] 'Method' not specified in action: ${action}`);
  }

  opt.method = tmp[0].toLowerCase();

  if (!/^(post|get|put|delete)$/i.test(opt.method)) {
    throw new Error(`[vodka] 'Method' not allowed in action: ${action}`);
  }

  var params = req.params;

  delete req.params;

  opt.url = `${configs.ROOT}/${buildUrl(action, tmp[1], params)}`;
  opt.timeout = opt.timeout || configs.TIMEOUT;

  request(opt, res);
};
