describe('Test Express server', () => {
  before((done) => {
    require('./server')(4000, done);
  });

  it('should pass', (done) => {
    require('./actions/user');
    done();
  });
});
