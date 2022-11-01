import yaml from 'js-yaml';

const getContent = (file, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`Unexpected file extension: ${extension}! Supported formats: 'yaml/yml', 'json'`);
  }
};

export default getContent;
