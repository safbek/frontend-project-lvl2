import _ from 'lodash';

const getValue = (value) => {
  if (_.isBoolean(value) || _.isNull(value)) {
    return value;
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  if (typeof value === 'object') {
    return '[complex value]';
  }
  return value;
};

const render = (node) => {
  const iter = (diffNode, parentKeyName) => {
    const {
      name, type, value, children, oldValue, newValue,
    } = diffNode;

    const currentPath = `${parentKeyName}${name}`;

    switch (type) {
      case 'nested':
        return children.map((child) => iter(child, `${currentPath}.`)).join('');
      case 'changed':
        return `Property '${currentPath}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}\n`;
      case 'unchanged':
        return '';
      case 'added':
        return `Property '${currentPath}' was added with value: ${getValue(value)}\n`;
      case 'removed':
        return `Property '${currentPath}' was removed\n`;
      default:
        throw new Error(`unexpected type ${type}`);
    }
  };
  return iter(node, '');
};

const plain = (nodes) => {
  const lines = nodes.map((node) => render(node));
  return lines.join('').trim();
};

export default plain;
