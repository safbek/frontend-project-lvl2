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


const stylish = (tree) => {
  const iter = (obj, s = 2) => {
    const indent = ' '.repeat(s);
    const indentBraces = ' '.repeat(s + 2);

    const res = obj.map((key) => {
      const {
        name, type, value, children, oldValue, newValue,
      } = key;

      // let operator;
      // if (type === 'added') {
      //   operator = '+';
      // }

      let formattedStr;
      const newLine = '\n';

      if (type === 'unchanged' && children !== undefined) {
        formattedStr = `${newLine}${indentBraces}${name}: {${iter(children, s + 4)}${newLine}${indentBraces}}`;
      } else if (type === 'unchanged' && children === undefined) {
        formattedStr = `${newLine}${indentBraces}${name}: ${value}`;
      } else if (type === 'added' && typeof value !== 'object') {
        formattedStr = `${newLine}${indent}+ ${name}: ${value}`;
      } else if (type === 'added' && typeof value === 'object') {
        formattedStr = `${newLine}${indent}+ ${name}: {${newLine}${stringify(value, s)}${newLine}${indentBraces}}`;
      } else if (type === 'removed' && typeof value !== 'object') {
        formattedStr = `${newLine}${indent}- ${name}: ${value}`;
      } else if (type === 'removed' && typeof value === 'object') {
        formattedStr = `${newLine}${indent}- ${name}: {${newLine}${stringify(value, s)}${newLine}${indentBraces}}`;
      } else if (type === 'changed') {
        if (typeof oldValue === 'object') {
          formattedStr = `${newLine}${indent}- ${name}: {${newLine}${stringify(oldValue, s)}${newLine}${indentBraces}}${newLine}${indent}+ ${name}: ${newValue}`;
        } else {
          formattedStr = `${newLine}${indent}- ${name}: ${oldValue}${newLine}${indent}+ ${name}: ${newValue}`;
        }
      }
      return formattedStr.replace(/,/g, '');
    });
    return res;
  };
  const formattedDiffs = iter(tree);
  return `{${formattedDiffs}\n  }`;
};

export default stylish;
