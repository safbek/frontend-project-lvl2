const getValue = (value) => {
  if (value === false || value === true
  || value === null || value === 0) {
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
  const prefix = `Property '${parentKeyName}${name}'`;

  if (type === 'unchanged' && children !== undefined) {
    parentKeyName += `${name}.`;
    return `${children.map((child) => plainSingleKeyDiff(child, parentKeyName)).join('')}`;
  }
  if (type === 'changed') {
    return `${prefix} was updated. From ${getValue(oldValue)} to ${getValue(newValue)}\n`;
  }
  if (type === 'added') {
    return `${prefix} was added with value: ${getValue(value)}\n`;
  }
  if (type === 'removed') {
    return `${prefix} was removed\n`;
  }
  return '';
};

const plain = (keyDiffs) => {
  const formattedDiffs = keyDiffs.map((keyDiff) => plainSingleKeyDiff(keyDiff));
  return formattedDiffs.join('').trim();
};

export default plain;
