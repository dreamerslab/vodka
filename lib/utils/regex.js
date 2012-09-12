/**
 * Regular expression collection.
 * @public
 */
module.exports = {
  begin_slash         : /^\//,
  has_format          : /\..+$/,
  has_none_characters : /\W/g,
  is_js_file          : /\.js$/,
  is_email            : /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
  tail_slash          : /\/$/,
  url                 : /(https?):((\/\/)|(\\\\))+[\w\d:#@%\/$()~_?\+-=\\\.&]*/
};