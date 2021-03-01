const stringify = (obj, s) => {
  const indent = ' '.repeat(s + 6);
  const keys = Object.keys(obj);

  const res = keys.map((key) => {
    const value = obj[key];
    if (typeof value === 'object') {
      return `${indent}${key}: {\n${stringify(value, s + 4)}\n${indent}}`;
    }
    return `${indent}${key}: ${value}`;
  });
  return res.join('\n');
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
    if (type === 'added' && typeof value !== 'object') {
      return `\n${indent}+ ${name}: ${value}`;
    }
    if (type === 'added' && typeof value === 'object') {
      return `\n${indent}+ ${name}: {\n${stringify(value, space)}\n${indentBraces}}`;
    }
    if (type === 'removed' && typeof value !== 'object') {
      return `\n${indent}- ${name}: ${value}`;
    }
    if (type === 'removed' && typeof value === 'object') {
      return `\n${indent}- ${name}: {\n${stringify(value, space)}\n${indentBraces}}`;
    }
    if (type === 'changed') {
      if (typeof oldValue === 'object') {
        return `\n${indent}- ${name}: {\n${stringify(oldValue, space)}\n${indentBraces}}\n${indent}+ ${name}: ${newValue}`;
      }
      return `\n${indent}- ${name}: ${oldValue}\n${indent}+ ${name}: ${newValue}`;
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
