import _ from 'lodash';
import parser from './parsers.js';
import getFormatter from './formatters/index.js';

const diffs = (obj1, obj2) => {
  const keysFromObj1 = Object.keys(obj1);
  const keysFromObj2 = Object.keys(obj2);

  const keys = _.uniq(_.concat(keysFromObj1, keysFromObj2)).sort();

  const result = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    let singleKeyDiff;

    if (typeof value1 === 'object' && typeof value2 === 'object') {
      singleKeyDiff = {
        name: key,
        type: 'unchanged',
        children: diffs(value1, value2),
      };
    } else if (value1 === undefined) {
      singleKeyDiff = {
        name: key,
        type: 'added',
        value: value2,
      };
    } else if (value2 === undefined) {
      singleKeyDiff = {
        name: key,
        type: 'removed',
        value: value1,
      };
    } else if (value1 === value2) {
      singleKeyDiff = {
        name: key,
        type: 'unchanged',
        value: value1,
      };
    } else {
      singleKeyDiff = {
        name: key,
        type: 'changed',
        oldValue: value1,
        newValue: value2,
      };
    }
    return singleKeyDiff;
  });
  return result;
};

const genDiff = (path1, path2, formatName) => {
  const dataFromFile1 = parser(path1);
  const dataFromFile2 = parser(path2);

  const arrayOfKeyDiffs = diffs(dataFromFile1, dataFromFile2);

  const formatter = getFormatter(formatName);
  const formattedDiffs = formatter(arrayOfKeyDiffs);
  console.log(formattedDiffs);
  return formattedDiffs;
};

export default genDiff;
