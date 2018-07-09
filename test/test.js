var expect = require('chai').expect;
var describePercentage = require('../index');

describe('Progress at the start', function() {
  it('should say pretty much at the start', function() {
    expect(describePercentage(0, 10)).to.equal("at the start");
  });
});
describe('Progress at the start', function() {
  it('should say pretty much at the start', function() {
    expect(describePercentage(1, 10)).to.equal("pretty much at the start");
  });
});
describe('Progress half way', function() {
  it('should say halfway between the start and the end', function() {
    expect(describePercentage(5, 10)).to.equal("halfway between the start and the end");
  });
});
describe('Progress before the start', function() {
  it('should throw RangeError', function() {
    expect(describePercentage.bind(null, -1, 10)).to.throw(RangeError, "Progress must be within the start and finishing point, inclusive")
  });
});
describe('Progress after the end', function() {
  it('should throw RangeError', function() {
    expect(describePercentage.bind(null, 11, 10)).to.throw(RangeError, "Cannot have a starting point ahead of the finishing point");
  });
});
describe('Finish comes before start', function() {
  it('should throw RangeError', function() {
    expect(describePercentage.bind(null, 11, -10)).to.throw(RangeError, "Cannot have a starting point ahead of the finishing point");
  });
});
describe('Start is negative', function() {
  it('should say pretty much at the start', function() {
    expect(describePercentage(-900, 0, -1000)).to.equal("pretty much at the start");
  });
});
describe('End is negative', function() {
  it('should say pretty much at the start', function() {
    expect(describePercentage(-1000, -900, -500)).to.equal("pretty much at the start");
  });
});
