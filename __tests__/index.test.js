import fs from 'fs';
import { dirname } from 'path';
import path from 'path';
import genDiff from '../index.js';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputFormats = ['json', 'yml', 'ini'];

const getFilepaths = (formats) => formats.map((item) => [
  path.join(__dirname, '..', '__fixtures__', `before.${item}`),
  path.join(__dirname, '..', '__fixtures__', `after.${item}`),
]);

const getResult = (otputFormat) => {
  const resultPath = path.join(__dirname, '..', '__fixtures__', `diff-${otputFormat}`);
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
