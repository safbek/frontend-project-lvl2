import stylish from './stylish-formatter.js';
import plain from './plain-formatter.js';
import json from './json-formatter.js';


const formatters = {
  stylish,
  plain,
  json,
};

const getFormatter = (formatName = 'stylish') => formatters[formatName];
// const getFormatter = () => json;

export default getFormatter;
