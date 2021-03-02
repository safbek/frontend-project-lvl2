import _ from 'lodash';

const stringify = (obj, space) => {
  if (_.isBoolean(obj) || _.isNull(obj)) {
    return obj;
  }

  if (_.isString(obj) || _.isNumber(obj)) {
    return obj;
  }

  if (typeof obj === 'object') {
    const keys = Object.keys(obj);

    const res = keys.map((key) => {
      const value = obj[key];
      const indent = ' '.repeat(space + 6);
      if (typeof value === 'object') {
        return `${indent}${key}: {\n${stringify(value, space + 4)}\n${indent}}`;
      }
      return `\n${indent}${key}: ${value}`;
    });
    return res.join('\n');
  }
  return 'error';
  // throw new Error(`unexpected type ${obj}`);
};

const render = (nodes) => {
  const iter = (node, space = 2) => {
    const indent = ' '.repeat(space);
    const indentBraces = ' '.repeat(space + 2);
    const {
      name, type, value, children, oldValue, newValue,
    } = node;

    if (type === 'nested') {
      return `\n${indentBraces}${name}: {${children.map((child) => iter(child, space + 4)).join('')}\n${indentBraces}}`;
    }
    if (type === 'unchanged') {
      return `\n${indentBraces}${name}: ${value}`;
    }
    if (type === 'added') {
      return `\n${indent}+ ${name}: ${stringify(value, space)}`;
    }

    if (type === 'removed') {
      return `\n${indent}- ${name}: ${stringify(value, space)}`;
    }

    if (type === 'changed') {
      return `\n${indent}- ${name}: ${stringify(oldValue, space)}\n${indent}+ ${name}: ${stringify(newValue, space)}`;
    }
    throw new Error(`unexpected type ${type}`);
  };
  return iter(nodes);
};

const stylish = (nodes) => {
  const lines = nodes.map((node) => render(node));
  return `{${lines.join('')}\n}`;
};

export default stylish;
