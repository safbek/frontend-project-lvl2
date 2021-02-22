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

    switch (type) {
      case 'nested':
        return children.map((child) => iter(child, `${parentKeyName}${name}.`)).join('');
      case 'changed':
        return `${prefix} was updated. From ${getValue(oldValue)} to ${getValue(newValue)}\n`;
      case 'unchanged':
        return '';
      case 'added':
        return `${prefix} was added with value: ${getValue(value)}\n`;
      case 'removed':
        return `${prefix} was removed\n`;
      default:
        throw new Error(`unexpected type ${type}`);
    }
  };
  return iter(arrayOfkeyDiff, '');
};

const plain = (nodes) => {
  const lines = nodes.map((node) => render(node));
  return lines.join('').trim();
};

export default plain;
