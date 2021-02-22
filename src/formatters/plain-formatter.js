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

const render = (arrayOfkeyDiff) => {
  const iter = (diff, parentKeyName) => {
    const {
      name, type, value, children, oldValue, newValue,
    } = diff;

    const prefix = `Property '${parentKeyName}${name}'`;

    if (type === 'nested' && children !== undefined) {
      return children.map((child) => iter(child, `${parentKeyName}${name}.`)).join('');
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
  return iter(arrayOfkeyDiff, '');
};

const plain = (nodes) => {
  const lines = nodes.map((node) => render(node));
  return lines.join('').trim();
};

export default plain;
