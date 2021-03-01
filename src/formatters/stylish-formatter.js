const getOperator = (type) => {
  if (type === 'added') {
    return '+';
  }
  if (type === 'removed') {
    return '-';
  }
  if (type === 'nested' || type === 'unchanged') {
    return ' ';
  }
  throw new Error(`unexpected operator ${type}`);
};

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

const stringifyValue = (val, s) => {
  const indentBraces = ' '.repeat(s + 2);

  if (typeof val !== 'object' || val === null) {
    return val;
  }
  return `{\n${stringify(val, s)}\n${indentBraces}}`;
};

const singleValueFormattedStr = (name, type, value, s) => {
  const indent = ' '.repeat(s);
  const operator = getOperator(type);
  const prefix = `\n${indent}${operator} ${name}`;
  const valueStr = stringifyValue(value, s);

  return `${prefix}: ${valueStr}`;
};

const render = (diff, space = 2) => {
  const {
    name, type, value, children, oldValue, newValue,
  } = diff;

  const indent = ' '.repeat(space + 2);

  if (type === 'nested' && children !== undefined) {
    return `\n${indent}${name}: {${children.map((child) => render(child, space + 4)).join('')}\n${indent}}`;
  }
  if (type === 'changed') {
    return `${singleValueFormattedStr(name, 'removed', oldValue, space)}${singleValueFormattedStr(name, 'added', newValue, space)}`;
  }
  return singleValueFormattedStr(name, type, value, space);
};

const stylish = (nodes) => {
  const lines = nodes.map((node) => render(node));
  return `{${lines.join('')}\n}`;
};

export default stylish;
