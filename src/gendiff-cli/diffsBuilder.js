import _ from 'lodash';

const diffs = (obj1, obj2) => {
  const keysFromObj1 = Object.keys(obj1);
  const keysFromObj2 = Object.keys(obj2);

  const keys = _.uniq(_.concat(keysFromObj1, keysFromObj2)).sort();
  const sortedKeys = [...keys].sort();

  const result = sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (typeof value1 === 'object' && typeof value2 === 'object') {
      return {
        name: key,
        type: 'unchanged',
        children: diffs(value1, value2),
      };
    }
    if (value1 === undefined) {
      return {
        name: key,
        type: 'added',
        value: value2,
      };
    }
    if (value2 === undefined) {
      return {
        name: key,
        type: 'removed',
        value: value1,
      };
    }
    if (value1 === value2) {
      return {
        name: key,
        type: 'unchanged',
        value: value1,
      };
    }
    return {
      name: key,
      type: 'changed',
      oldValue: value1,
      newValue: value2,
    };
  });
  return result;
};

export default diffs;
