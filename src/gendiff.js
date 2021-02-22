import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';
import buildDiff from './diffsBuilder.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const fileContents1 = fs.readFileSync(path1, 'utf8');
  const fileContents2 = fs.readFileSync(path2, 'utf8');

  const format1 = path.extname(path1).slice(1);
  const format2 = path.extname(path2).slice(1);

  const dataFromFile1 = parse(format1, fileContents1);
  const dataFromFile2 = parse(format2, fileContents2);

  const diff = buildDiff(dataFromFile1, dataFromFile2);

  const formattedDiff = format(diff, formatName);
  return formattedDiff;
};

export default genDiff;
