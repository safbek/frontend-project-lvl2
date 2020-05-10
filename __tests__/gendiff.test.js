import gendiff from '../src/gendiff-cli/gendiff-cli.js';

const expected = [
  '+verbose: true',
  'proxy: 123.234.53.22',
  'follow: false',
  '-timeout: 50 +timeout: 20',
  'host: hexlet.io',
].join('\n');

test('difference between two object', () => {
  expect(gendiff('__fixtures__/before.json', '__fixtures__/after.json')).toBe(expected);
});
