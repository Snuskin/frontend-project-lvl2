import getContent from './parser.js';
import buildTree from './buildTree.js';
import _ from 'lodash';

const filterDifference = (notSortedTree) => {
  const getTree = notSortedTree.map((data) => {
    const dataKey = data.key;
    const dataValue = data.value;
    const datafirstValue = data.value1;
    const datasecondValue = data.value2;

      if (data.state === 'deleted') {
      return `  - ${dataKey} : ${dataValue}`;
      }
      if (data.state === 'added') {
        return `  + ${dataKey} : ${dataValue}`;
      }
      if (data.state === 'notChanged') {
        return `    ${dataKey} : ${dataValue}`;
      }
      if (data.state === 'changed') {
       return `  - ${dataKey} : ${datafirstValue}\n  + ${dataKey} : ${datasecondValue}`;
      }
  });

  return `{\n${getTree.join('\n')}\n}`;
};

const genDiff = (filePath1, filePath2) => {

  const file1DataParsed = getContent(filePath1);
  const file2DataParsed = getContent(filePath2);
  const unformedTree = buildTree(file1DataParsed, file2DataParsed);

  return filterDifference(unformedTree);
};

export default genDiff;