import yaml from 'js-yaml';

const getContent = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

export default (file, extension) => {
  if (getContent[extension] === undefined) {
    throw new Error(`Unexpected file extension: ${extension}! Supported formats: 'yaml/yml', 'json'`);
  }
  return getContent[extension](file);
};
