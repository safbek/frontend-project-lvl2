const stringify = (obj, s) => {
  const indent = ' '.repeat(s + 6);
  let str;
  const keys = Object.keys(obj);

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

const getOperator = (t) => {
  let operator;
  if (t === 'added') {
    operator = '+';
  } else if (t === 'unchanged') {
    operator = ' ';
  } else {
    operator = '-';
  }
  return operator;
};

const singleKeyDiff = (value, type, s = 2) => {
  
};

const stylish = (tree) => {
  const iter = (obj, s = 2) => {
    const indent = ' '.repeat(s);
    const indentBraces = ' '.repeat(s + 2);

    const res = obj.map((key) => {
      const {
        name, type, value, children, oldValue, newValue,
      } = key;

      const stringifyValue = (val, n) => {
        if (typeof val !== 'object' || val === null) {
          return val;
        }
        return `{\n${stringify(val, n)}\n${indentBraces}}`;
      };

      const newLine = '\n';
      const valueStr = stringifyValue(value, s);
      const operator = getOperator(type);
      const prefix = `${newLine}${indent}${operator} ${name}`;

      let formattedStr;
      if (type === 'unchanged' && children !== undefined) {
        formattedStr = `${newLine}${indentBraces}${name}: {${iter(children, s + 4)}${newLine}${indentBraces}}`;
      } else if (type === 'unchanged' || type === 'added' || type === 'removed') {
        formattedStr = `${prefix}: ${valueStr}`;
      } else if (type === 'changed') {
        const oldValueStr = stringifyValue(oldValue, s);
        const newValueStr = stringifyValue(newValue, s);
        formattedStr = `${newLine}${indent}- ${name}: ${oldValueStr}${newLine}${indent}+ ${name}: ${newValueStr}`;
      }
      return formattedStr.replace(/,/g, '');
    });
    return res;
  };
  const formattedDiffs = iter(tree);
  return `{${formattedDiffs}\n  }`;
};

export default stylish;
