import parser from './src/gendiff-cli/parsers.js';
import getFormatter from './src/gendiff-cli/formatters/index.js';
import diffs from './src/gendiff-cli/diffsBuilder.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const dataFromFile1 = parser(path1);
  const dataFromFile2 = parser(path2);

  console.log(path1);
  console.log(dataFromFile1);

  const arrayOfKeyDiffs = diffs(dataFromFile1, dataFromFile2);

  const formattedDiffs = getFormatter(arrayOfKeyDiffs, formatName);
  return formattedDiffs;
};

export default genDiff;
