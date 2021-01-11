import stylish from './stylish-formatter.js';
import plain from './plain-formatter.js';

const formatters = {
  stylish,
  plain,
};

const getFormatter = (formatName = 'stylish') => formatters[formatName];

export default getFormatter;
