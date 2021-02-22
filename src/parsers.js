import yaml from 'js-yaml';
import ini from 'ini';

const parse = (format, fileContents) => {
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
