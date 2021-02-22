import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (file) => {
  const fileContents = fs.readFileSync(file, 'utf8');
  const format = path.extname(file).slice(1);
  switch (format) {
    case 'json':
      return JSON.parse(fileContents);
    case 'yml':
    case 'yaml':
      return yaml.load(fileContents);
    case 'ini':
      return ini.parse(fileContents);
    default:
      throw new Error(`Unknown data format: '${format}'.`);
  }
};

export default parse;
