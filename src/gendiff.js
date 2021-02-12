import parse from './parsers.js';
import getFormatter from './formatters/index.js';
import buildDiff from './diffsBuilder.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const dataFromFile1 = parse(path1);
  const dataFromFile2 = parse(path2);

  const diff = buildDiff(dataFromFile1, dataFromFile2);

  const formattedDiff = getFormatter(diff, formatName);
  return formattedDiff;
};

export default genDiff;
