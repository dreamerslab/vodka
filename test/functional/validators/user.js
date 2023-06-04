const should      = require('should');
const should_http = require('should-http');
const email       = require('../../../index').utils.regex.email;

module.exports = {
  user: (user) => {
    Object.keys(user).should.have.lengthOf(6);

    user.should.have.property('_id').with.lengthOf(24);
    user.should.have.property('name').which.is.a.String();
    user.should.have.property('email').which.is.a.String().and.match(email);
    user.should.have.property('website').which.is.a.String();
    user.should.have.property('created_at').which.is.a.Number();
    user.should.have.property('updated_at').which.is.a.Number();
    user.created_at.toString().should.have.lengthOf(13);
    user.updated_at.toString().should.have.lengthOf(13);
  }
};
