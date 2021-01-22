import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff-cli/gendiff-cli.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

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
    expect(genDiff(beforePath, afterPath, 'stylish')).toBe(getResult('stylish').trim());
    expect(genDiff(beforePath, afterPath, 'plain')).toBe(getResult('plain').trim());
    expect(genDiff(beforePath, afterPath, 'json')).toBe(getResult('json').trim());
  },
);
