import fs from 'fs';
import module from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = module.dirname(__filename);

const inputFormats = ['json', 'yml', 'ini'];

const getFilepaths = (formats) => formats.map((item) => [
  module.join(__dirname, '..', '__fixtures__', `before.${item}`),
  module.join(__dirname, '..', '__fixtures__', `after.${item}`),
]);

const getResult = (otputFormat) => {
  const resultPath = module.join(__dirname, '..', '__fixtures__', `diff-${otputFormat}`);
  return fs.readFileSync(resultPath, 'utf8');
};

test.each(getFilepaths(inputFormats))(
  'gendiff',
  (beforePath, afterPath) => {
    expect(genDiff(beforePath, afterPath, 'stylish')).toEqual(getResult('stylish'));
    expect(genDiff(beforePath, afterPath, 'plain')).toEqual(getResult('plain').trim());
    expect(genDiff(beforePath, afterPath, 'json')).toEqual(getResult('json'));
  },
);
