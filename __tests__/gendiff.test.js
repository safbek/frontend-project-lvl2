import gendiff from '../src/gendiff-cli/gendiff-cli.js';

const expected = [
  '+verbose: true',
  'proxy: 123.234.53.22',
  'follow: false',
  '-timeout: 50 +timeout: 20',
  'host: hexlet.io',
].join('\n');

test('difference between json files', () => {
  expect(gendiff('__fixtures__/before.json', '__fixtures__/after.json')).toBe(expected);
});

test('difference between yaml files', () => {
  expect(gendiff('__fixtures__/before.yml', '__fixtures__/after.yml')).toBe(expected);
});

test('difference between ini files', () => {
  expect(gendiff('__fixtures__/before.ini', '__fixtures__/after.ini')).toBe(expected);
});
