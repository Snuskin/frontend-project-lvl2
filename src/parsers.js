import yaml from 'js-yaml';

const parsersByDataType = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

export default (fileData, dataType) => {
  if (!parsersByDataType[dataType]) {
    throw new Error(`Unexpected file extension: ${dataType}! Supported formats: 'yaml/yml', 'json'`);
  }
  return parsersByDataType[dataType](fileData);
};
