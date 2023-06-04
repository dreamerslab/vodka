const should      = require('should');
const should_http = require('should-http');

module.exports = {
  ok: (err, res, body) => {
    should.not.exist(err);

    res.should.be.json();
    res.should.have.status(200);
  },

  create: (err, res, body) => {
    should.not.exist(err);

    res.should.be.json();
    res.should.have.status(201);
  },

  destroy: (err, res, body) => {
    should.not.exist(err);

    // Not sure why after updating packages headers now does not contain json header
    // res.should.be.json();
    res.should.have.status(204);
    should.not.exist(body);
  }
};
