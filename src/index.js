import fs from 'fs';
import _ from 'lodash';

const getContent = (file) => {
  const fileData = fs.readFileSync(file, 'utf8');
  const fileDataParsed = JSON.parse(fileData);
  return fileDataParsed;
};

const buildTree = (file1, file2) => {
  const firstFileKeys = _.keys(file1);
  const secondFileKeys = _.keys(file2);
  const uniqueKeys = _.sortBy(_.union(firstFileKeys, secondFileKeys));
  
  return uniqueKeys.map((key) => {
    if (!_.has(file1, key)) {
      return {key, state: 'added', value: file2[key]}
    }
    if (!_.has(file2, key)) {
      return {key, state: 'deleted', value: file1[key]}
    }
    if (!_.isEqual(file1[key], file2[key])) {
      return {key, state: 'changed', value1: file1[key], value2: file2[key]}
    }
    return {key, state: 'notChanged', value: file1[key]}
  })
};

const filterDifference = (notSortedTree) => {
  const finalTree = {}
  const getTree = notSortedTree.map((data) => {
    const dataKey = data.key;
    const dataValue = data.value;
    const datafirstValue = data.value1;
    const datasecondValue = data.value2;
      if (data.state === 'deleted') {
        
      return finalTree[`- ${dataKey}`] = dataValue;
      }
      if (data.state === 'added') {
        return finalTree[`+ ${dataKey}`] = dataValue;
      }
      if (data.state === 'notChanged') {
        return finalTree[dataKey] = dataValue;
      }
      if (data.state === 'changed') {
        const firstFileDif = finalTree[`- ${dataKey}`] = datafirstValue;
        const secondFileDif = finalTree[`+ ${dataKey}`] = datasecondValue;
       return firstFileDif + secondFileDif;
      }
    
  });

  return finalTree;
};

const genDiff = (filePath1, filePath2) => {

  const file1DataParsed = getContent(filePath1);
  const file2DataParsed = getContent(filePath2);

  const unformedTree = buildTree(file1DataParsed, file2DataParsed);
  return filterDifference(unformedTree)
 
};

export default genDiff;