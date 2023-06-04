const should = require('should');
const utils = require('../../lib/utils');

describe('utils.js tests', () => {
  describe('test utils.is', () => {
    it('should eql undefined', () => {
      utils.is(undefined).should.eql('undefined');
    });

    it('should eql null', () => {
      utils.is(null).should.eql('null');
    });

    it('should eql NaN', () => {
      utils.is(parseInt('fff')).should.eql('NaN');
    });

    it('should eql string', () => {
      utils.is('').should.eql('string');
    });

    it('should eql object', () => {
      utils.is({}).should.eql('object');
    });

    it('should eql array', () => {
      utils.is([]).should.eql('array');
      utils.is(new Array()).should.eql('array');
    });

    it('should eql number', () => {
      utils.is(1234).should.eql('number');
    });

    it('should eql boolean', () => {
      utils.is(true).should.eql('boolean');
    });

    it('should eql function', () => {
      utils.is(() => {}).should.eql('function');
    });

    it('should eql error', () => {
      utils.is(new Error()).should.eql('error');
    });
  });

  describe('test utils.merge', () => {
    const result = utils.merge(
      { a: 1, b: 2 },
      { a: 3, x: 4 }
    );

    it('should merge 2 objs with 3 props in total', () => {
      result.should.have.property('a').eql(3);
      result.should.have.property('b').eql(2);
      result.should.have.property('x').eql(4);
    });
  });

  describe('test utils.ranNo', () => {
    it('should produce random number between 5 to 20', () => {
      utils.ranNo(5, 20).should.be.within(5, 20);
    });
  });

  describe('test utils.uid', () => {
    it('should produce uid with length of 32', () => {
      utils.uid(32).should.be.a.String().and.have.lengthOf(32);
    });
  });
});
