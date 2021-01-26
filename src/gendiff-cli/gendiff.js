import parser from './parsers.js';
import getFormatter from './formatters/index.js';
import diffs from './diffsBuilder.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const dataFromFile1 = parser(path1);
  const dataFromFile2 = parser(path2);

  const arrayOfKeyDiffs = diffs(dataFromFile1, dataFromFile2);

  const formattedDiffs = getFormatter(arrayOfKeyDiffs, formatName);
  return formattedDiffs;
};

export default genDiff;
