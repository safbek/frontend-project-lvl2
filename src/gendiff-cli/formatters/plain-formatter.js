const getValue = (value) => {
  if (value === false || value === true || value === null) {
    return value;
  }

  if (typeof value !== 'object') {
    return `'${value}'`;
  }
  return '[complex value]';
};

const plainSingleKeyDiff = (keyDiff, acc = '') => {
  const {
    name, type, value, children, oldValue, newValue,
  } = keyDiff;

  let parentKeyName = acc;
  let formattedStr;
  const prefix = `Property '${parentKeyName}${name}'`;

  if (type === 'unchanged' && children !== undefined) {
    parentKeyName += `${name}.`;
    formattedStr = `${children.map((child) => plainSingleKeyDiff(child, parentKeyName)).join('')}`;
  } else if (type === 'changed') {
    formattedStr = `${prefix} was updated. From ${getValue(oldValue)} to ${getValue(newValue)}\n`;
  } else if (type === 'added') {
    formattedStr = `${prefix} was added with value: ${getValue(value)}\n`;
  } else if (type === 'removed') {
    formattedStr = `${prefix} was removed\n`;
  } else {
    formattedStr = '';
  }
  return formattedStr;
};

const plain = (keyDiffs) => {
  const formattedDiffs = keyDiffs.map((keyDiff) => plainSingleKeyDiff(keyDiff));
  return formattedDiffs.join('');
};

export default plain;
