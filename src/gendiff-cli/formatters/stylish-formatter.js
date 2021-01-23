const getOperator = (type) => {
  if (type === 'added') {
    return '+';
  }
  if (type === 'removed') {
    return '-';
  }
  if (type === 'unchanged') {
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

const stylishSingleKeyDiff = (keyDiff, s = 2) => {
  const {
    name, type, value, children, oldValue, newValue,
  } = keyDiff;

  const indentBraces = ' '.repeat(s + 2);

  if (type === 'unchanged' && children !== undefined) {
    return `\n${indentBraces}${name}: {${children.map((child) => stylishSingleKeyDiff(child, s + 4)).join('')}\n${indentBraces}}`;
  }
  if (type === 'changed') {
    return `${singleValueFormattedStr(name, 'removed', oldValue, s)}${singleValueFormattedStr(name, 'added', newValue, s)}`;
  }
  return singleValueFormattedStr(name, type, value, s);
};

const stylish = (keyDiffs) => {
  const formattedDiffs = keyDiffs.map((keyDiff) => stylishSingleKeyDiff(keyDiff));
  return `{${formattedDiffs.join('')}\n}`;
};

export default stylish;
