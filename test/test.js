var expect = require('chai').expect;
var describePercentage = require('../index');

describe('describePercentage', function() {

  describe('at the start (0%)', function() {
    it('should return "at the start" for exactly 0%', function() {
      expect(describePercentage(0, 10)).to.equal("at the start");
    });

    it('should return "at the start" with default finish=100', function() {
      expect(describePercentage(0)).to.equal("at the start");
    });
  });

  describe('pretty much at the start (1-35%)', function() {
    it('should return "pretty much at the start" for 10%', function() {
      expect(describePercentage(1, 10)).to.equal("pretty much at the start");
    });

    it('should return "pretty much at the start" for 35%', function() {
      expect(describePercentage(35, 100)).to.equal("pretty much at the start");
    });

    it('should work with negative range near start', function() {
      // Range from -1000 (start) to 0 (finish), progress at -900 (10% in)
      expect(describePercentage(-900, 0, -1000)).to.equal("pretty much at the start");
    });

    it('should work with fully negative range near start', function() {
      // Range from -1000 (start) to -500 (finish), progress at -900 (20% in)
      expect(describePercentage(-900, -500, -1000)).to.equal("pretty much at the start");
    });
  });

  describe('about halfway (36-49% and 52-75%)', function() {
    it('should return "about halfway" for 40%', function() {
      expect(describePercentage(40, 100)).to.equal("about halfway between the start and the end");
    });

    it('should return "about halfway" for 60%', function() {
      expect(describePercentage(60, 100)).to.equal("about halfway between the start and the end");
    });

    it('should return "about halfway" for 75%', function() {
      expect(describePercentage(75, 100)).to.equal("about halfway between the start and the end");
    });
  });

  describe('exactly halfway (50-51%)', function() {
    it('should return "halfway" for exactly 50%', function() {
      expect(describePercentage(5, 10)).to.equal("halfway between the start and the end");
    });

    it('should return "halfway" for 51%', function() {
      expect(describePercentage(51, 100)).to.equal("halfway between the start and the end");
    });
  });

  describe('pretty much at the end (76-95%)', function() {
    it('should return "pretty much at the end" for 80%', function() {
      expect(describePercentage(80, 100)).to.equal("pretty much at the end");
    });

    it('should return "pretty much at the end" for 95%', function() {
      expect(describePercentage(95, 100)).to.equal("pretty much at the end");
    });
  });

  describe('at the end (96-100%)', function() {
    it('should return "at the end" for 100%', function() {
      expect(describePercentage(10, 10)).to.equal("at the end");
    });

    it('should return "at the end" for 96%', function() {
      expect(describePercentage(96, 100)).to.equal("at the end");
    });

    it('should return "at the end" with default finish=100', function() {
      expect(describePercentage(100)).to.equal("at the end");
    });
  });

  describe('error handling', function() {
    it('should throw RangeError when progress is before start', function() {
      expect(describePercentage.bind(null, -1, 10)).to.throw(RangeError, "Progress must be within the start and finishing point, inclusive");
    });

    it('should throw RangeError when progress is after end', function() {
      expect(describePercentage.bind(null, 11, 10)).to.throw(RangeError, "Progress must be within the start and finishing point, inclusive");
    });

    it('should throw RangeError when finish comes before start', function() {
      expect(describePercentage.bind(null, 11, -10)).to.throw(RangeError, "Cannot have a starting point ahead of the finishing point");
    });

    it('should throw RangeError when start equals finish and progress differs', function() {
      expect(describePercentage.bind(null, 5, 10, 10)).to.throw(RangeError, "Progress must be within the start and finishing point, inclusive");
    });
  });

  describe('custom sectors', function() {
    var customSectors = [
      { text: 'beginning', range: 0.33 },
      { text: 'middle', range: 0.66 },
      { text: 'end', range: 1 }
    ];

    it('should use custom sectors when provided', function() {
      expect(describePercentage(10, 100, 0, customSectors)).to.equal("beginning");
      expect(describePercentage(50, 100, 0, customSectors)).to.equal("middle");
      expect(describePercentage(90, 100, 0, customSectors)).to.equal("end");
    });
  });

  describe('edge cases', function() {
    it('should throw when start equals finish (division by zero edge case)', function() {
      // When start === finish, progress_pc becomes NaN (0/0), causing no sector match
      expect(describePercentage.bind(null, 5, 5, 5)).to.throw(ReferenceError, "No sector found for progress '5'");
    });

    it('should handle large numbers', function() {
      expect(describePercentage(500000, 1000000)).to.equal("halfway between the start and the end");
    });

    it('should handle decimal values', function() {
      expect(describePercentage(0.5, 1)).to.equal("halfway between the start and the end");
    });
  });

});
