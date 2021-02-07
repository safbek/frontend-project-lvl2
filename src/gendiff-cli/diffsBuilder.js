import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keysFromObj1 = Object.keys(obj1);
  const keysFromObj2 = Object.keys(obj2);

  const uniqKeys = _.uniq([...keysFromObj1, ...keysFromObj2]);
  const sortedKeys = _.sortBy(uniqKeys);

  const result = sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        name: key,
        type: 'nested',
        children: buildDiff(value1, value2),
      };
    }
    if (!_.has(obj1, key)) {
      return {
        name: key,
        type: 'added',
        value: value2,
      };
    }
    if (!_.has(obj2, key)) {
      return {
        name: key,
        type: 'removed',
        value: value1,
      };
    }
    if (_.isEqual(value1, value2)) {
      return {
        name: key,
        type: 'nested',
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

export default buildDiff;
