import stylish from './stylish.js';
import plain from './plain.js';

const formatter = {
  stylish,
  plain,
  json: JSON.stringify,
};
export default (data, format) => {
  if (!formatter[format]) {
    throw new Error(`Invalid file format type: '.${format}'! Try supported file formats.`);
  }
  return formatter[format](data);
};
