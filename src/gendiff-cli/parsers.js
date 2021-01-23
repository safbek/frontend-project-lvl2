import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parser = (file) => {
  const fileContents = fs.readFileSync(file, 'utf8');
  const format = path.extname(file);

  if (format === '.json') {
    return JSON.parse(fileContents);
  }

  if (format === '.yml') {
    return yaml.safeLoad(fileContents);
  }

  if (format === '.ini') {
    return ini.parse(fileContents);
  }
  throw new Error(`Unknown data format: '${format}'.`);
};

export default parser;
