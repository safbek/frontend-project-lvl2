const getOperator = (type) => {
  let operator;
  if (type === 'added') {
    operator = '+';
  } else if (type === 'removed') {
    operator = '-';
  } else if (type === 'unchanged') {
    operator = ' ';
  } else {
    throw new Error(`unexpected operator ${type}`);
  }
  return operator;
};

const stringify = (obj, s) => {
  const indent = ' '.repeat(s + 6);
  const keys = Object.keys(obj);

  let str;
  const res = keys.map((key) => {
    const value = obj[key];
    if (typeof value === 'object') {
      str = `${indent}${key}: {\n${stringify(value, s + 4)}\n${indent}}`;
    } else {
      str = `${indent}${key}: ${value}`;
    }
    return str;
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

  let formattedStr;
  const indentBraces = ' '.repeat(s + 2);

  if (type === 'unchanged' && children !== undefined) {
    formattedStr = `\n${indentBraces}${name}: {${children.map((child) => stylishSingleKeyDiff(child, s + 4)).join('')}\n${indentBraces}}`;
  } else if (type === 'changed') {
    formattedStr = `${singleValueFormattedStr(name, 'removed', oldValue, s)}${singleValueFormattedStr(name, 'added', newValue, s)}`;
  } else {
    formattedStr = singleValueFormattedStr(name, type, value, s);
  }
  return formattedStr;
};

const stylish = (keyDiffs) => {
  const formattedDiffs = keyDiffs.map((keyDiff) => stylishSingleKeyDiff(keyDiff));
  return `{${formattedDiffs.join('')}\n}`;
};

export default stylish;
