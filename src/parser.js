import yaml from 'js-yaml';

const getContent = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

export default (file, extension) => getContent[extension](file) ?? `Unexpected file extension: ${extension}! Supported formats: 'yaml/yml', 'json'`;
