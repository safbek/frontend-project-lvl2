import parse from './parsers.js';
import getFormatter from './formatters/index.js';
import diffs from './diffsBuilder.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const dataFromFile1 = parse(path1);
  const dataFromFile2 = parse(path2);

  const keyDiff = diffs(dataFromFile1, dataFromFile2);

  const formattedDiff = getFormatter(keyDiff, formatName);
  return formattedDiff;
};

export default genDiff;
