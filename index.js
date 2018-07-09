'use strict';

module.exports = describePercentage;

const DEFAULT_SECTORS = [{
  'text': `at the start`,
  'range': 0
}, {
  'text': `pretty much at the start`,
  'range': 0.35
}, {
  'text': `about halfway between the start and the end`,
  'range': 0.49
}, {
  'text': `halfway between the start and the end`,
  'range': 0.51
}, {
  'text': `about halfway between the start and the end`,
  'range': 0.75
}, {
  'text': `pretty much at the end`,
  'range': 0.95
}, {
  'text': `at the end`,
  'range': 1
}];

function describePercentage(progress, finish = 100, start = 0, sectors = DEFAULT_SECTORS) {
  if (start > finish) throw new RangeError("Cannot have a starting point ahead of the finishing point");
  if (!between(start, progress, finish)) throw new RangeError("Progress must be within the start and finishing point, inclusive");

  let progress_pc = (progress - start) / (finish - start);

  // Defaults
  if (!Array.isArray(sectors)) {
    sectors = DEFAULT_SECTORS;
  }

  sectors.sort((a, b) => a.range - b.range);

  const found_sector = sectors.find(s => progress_pc <= s.range);
  if (!found_sector)
    throw new ReferenceError(`No sector found for progress '${progress}'`);
  if (!found_sector.text)
    throw new ReferenceError(`No text node in sectors definition for the range ${found_sector.range}`)

  return found_sector.text;
}

function between(a, m, z) {
  return m >= a && m <= z;
}
