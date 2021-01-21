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
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
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

const expected2 = [
  `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
`,
].join('\n');

const expected3 = [
  `[
  {
    "name": "common",
    "type": "unchanged",
    "children": [
      {
        "name": "follow",
        "type": "added",
        "value": false
      },
      {
        "name": "setting1",
        "type": "unchanged",
        "value": "Value 1"
      },
      {
        "name": "setting2",
        "type": "removed",
        "value": 200
      },
      {
        "name": "setting3",
        "type": "changed",
        "oldValue": true,
        "newValue": null
      },
      {
        "name": "setting4",
        "type": "added",
        "value": "blah blah"
      },
      {
        "name": "setting5",
        "type": "added",
        "value": {
          "key5": "value5"
        }
      },
      {
        "name": "setting6",
        "type": "unchanged",
        "children": [
          {
            "name": "doge",
            "type": "unchanged",
            "children": [
              {
                "name": "wow",
                "type": "changed",
                "oldValue": "",
                "newValue": "so much"
              }
            ]
          },
          {
            "name": "key",
            "type": "unchanged",
            "value": "value"
          },
          {
            "name": "ops",
            "type": "added",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "name": "group1",
    "type": "unchanged",
    "children": [
      {
        "name": "baz",
        "type": "changed",
        "oldValue": "bas",
        "newValue": "bars"
      },
      {
        "name": "foo",
        "type": "unchanged",
        "value": "bar"
      },
      {
        "name": "nest",
        "type": "changed",
        "oldValue": {
          "key": "value"
        },
        "newValue": "str"
      }
    ]
  },
  {
    "name": "group2",
    "type": "removed",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "name": "group3",
    "type": "added",
    "value": {
      "fee": 100500,
      "deep": {
        "id": {
          "number": 45
        }
      }
    }
  }
]`,
].join('\n');

test('difference between json files in stylish format', () => {
  expect(gendiff('__fixtures__/before.json', '__fixtures__/after.json')).toBe(expected);
});

test('difference between yaml files in stylish format', () => {
  expect(gendiff('__fixtures__/before.yml', '__fixtures__/after.yml')).toBe(expected);
});

test('difference between json files in plain format', () => {
  expect(gendiff('__fixtures__/before.json', '__fixtures__/after.json')).toBe(expected2);
});

test('difference between yaml files in plain format', () => {
  expect(gendiff('__fixtures__/before.yml', '__fixtures__/after.yml')).toBe(expected2);
});


test('difference between json files in json format', () => {
  expect(gendiff('__fixtures__/before.json', '__fixtures__/after.json')).toBe(expected3);
});

test('difference between yaml files in json format', () => {
  expect(gendiff('__fixtures__/before.yml', '__fixtures__/after.yml')).toBe(expected2);
});
