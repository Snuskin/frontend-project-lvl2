import getFileInfo from './parser.js';
import buildTree from './buildTree.js';
import _ from 'lodash';
import formatter from './__formatters__/index.js'

const genDiff = (filePath1, filePath2, format = 'stylish') => {

  const file1DataParsed = getFileInfo(filePath1);
  const file2DataParsed = getFileInfo(filePath2);
  const unformedTree = buildTree(file1DataParsed, file2DataParsed);

  return formatter(unformedTree, format);
};

export default genDiff;