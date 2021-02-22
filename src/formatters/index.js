import stylish from './stylish-formatter.js';
import plain from './plain-formatter.js';
import json from './json-formatter.js';

const formatters = {
  stylish,
  plain,
  json,
};

const format = (diff, formatName) => formatters[formatName](diff);
export default format;
