import _ from 'lodash';

const stringify = (value, space) => {
  if (_.isBoolean(value) || _.isNull(value)
  || _.isString(value) || _.isNumber(value)) {
    return value;
  }

  const indent = ' '.repeat(space + 6);
  const indentBraces = ' '.repeat(space + 2);

  const keys = Object.keys(value);
  const res = keys.map((name) => {
    const valueKey = value[name];

    if (typeof valueKey === 'object') {
      return `${indent}${name}: ${stringify(valueKey, space + 4)}\n`;
    }
    return `${indent}${name}: ${valueKey}\n`;
  });
  return `{\n${res.join('')}${indentBraces}}`;
};

const render = (nodes) => {
  const iter = (node, space = 2) => {
    const indent = ' '.repeat(space);
    const indentBraces = ' '.repeat(space + 2);
    const {
      name, type, value, children, oldValue, newValue,
    } = node;

    switch (type) {
      case 'nested':
        return `\n${indentBraces}${name}: {${children.map((child) => iter(child, space + 4)).join('')}\n${indentBraces}}`;
      case 'unchanged':
        return `\n${indentBraces}${name}: ${stringify(value, space)}`;
      case 'changed':
        return `\n${indent}- ${name}: ${stringify(oldValue, space)}\n${indent}+ ${name}: ${stringify(newValue, space)}`;
      case 'added':
        return `\n${indent}+ ${name}: ${stringify(value, space)}`;
      case 'removed':
        return `\n${indent}- ${name}: ${stringify(value, space)}`;
      default:
        throw new Error(`unexpected type ${type}`);
    }
  };
  return iter(nodes);
};

const stylish = (nodes) => {
  const lines = nodes.map((node) => render(node));
  return `{${lines.join('')}\n}`;
};

export default stylish;
