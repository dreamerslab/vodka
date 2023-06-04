const env = process.env;

/**
 * Exports module.
 */
module.exports = {
  BASE_DIR : env.BASE_DIR || process.cwd(),
  ROOT     : env.ROOT || 'http://127.0.0.1:4000',
  TIMEOUT  : env.TIMEOUT || 60000 // 1 min
};
