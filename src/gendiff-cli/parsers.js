import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';


const parser = (file) => {
  const fileContents = fs.readFileSync(file, 'utf8');
  const format = path.extname(file);
  let data;

  if (format === '.json') {
    data = JSON.parse(fileContents);
  }

  if (format === '.yml') {
    data = yaml.safeLoad(fileContents);
  }

  if (format === '.ini') {
    data = ini.parse(fileContents);
  }
  return data;
};

export default parser;
