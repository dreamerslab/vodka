const should  = require('should');
const configs = require('../../lib/configs');

describe('configs.js tests', () => {
  it('should have BASE_DIR, ROOT & TIMEOUT', () => {
    should(configs).have.property('BASE_DIR');
    should(configs).have.property('ROOT');
    should(configs).have.property('TIMEOUT');
  });
});
