import _ from 'lodash';
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

export default buildTree;