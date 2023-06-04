/**
 * Regular expression collection.
 * @public
 */
module.exports = {
  beginSlash    : /^\//,
  email         : /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
  format        : /\..+$/,
  jsFile        : /\.js$/,
  noneCharacters: /\W/g,
  tailSlash     : /\/$/,
  url           : /(https?):((\/\/)|(\\\\))+[\w\d:#@%\/$()~_?\+-=\\\.&]*/
};
