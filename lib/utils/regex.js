/**
 * Regular expression collection.
 * @public
 */
module.exports = {
  begin_slash     : /^\//,
  email           : /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
  format          : /\..+$/,
  js_file         : /\.js$/,
  none_characters : /\W/g,
  tail_slash      : /\/$/,
  url             : /(https?):((\/\/)|(\\\\))+[\w\d:#@%\/$()~_?\+-=\\\.&]*/
};
