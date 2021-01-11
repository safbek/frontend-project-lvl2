import gendiff from '../src/gendiff-cli/gendiff-cli.js';

const expected = [
  `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    },
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    },
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    },
  + group3: {
        fee: 100500
        deep: {
            id: {
                number: 45
            }
        }
    }
  }`,
].join('\n');

test('difference between json files', () => {
  expect(gendiff('__fixtures__/before.json', '__fixtures__/after.json')).toBe(expected);
});
