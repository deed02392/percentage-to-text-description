# percentage-to-text-description

### Install
```sh
$ npm install --save percentage-to-text-description
```
### Usage
```js
const describePercentage = require('percentage-to-text-description')
describePercentage(progress, finish = 100, start = 0, sectors = DEFAULT_SECTORS)

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
```
