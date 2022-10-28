import _ from 'lodash';
const buildTree = (file1, file2) => {

    const firstFileKeys = _.keys(file1);
    const secondFileKeys = _.keys(file2);
    const uniqueKeys = _.sortBy(_.union(firstFileKeys, secondFileKeys));
  
    const tree = uniqueKeys.map((key) => {
      if (!_.has(file1, key)) {
        return {key, state: 'added', beforeValue: null, afterValue: file2[key], children: []}
      }
      if (!_.has(file2, key)) {
        return {key, state: 'deleted', beforeValue: file1[key], afterValue: null, children: []}
      }

      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        return {key, state: 'nested', beforeValue: file1[key], afterValue:file2[key], children: buildTree(file1[key], file2[key])}
      }

      if (!_.isEqual(file1[key], file2[key])) {
        return {key, state: 'changed', beforeValue: file1[key], afterValue: file2[key], children: []}
      }

      return {key, state: 'notChanged', beforeValue: file1[key], afterValue: null, children: []}
    })
  
    return tree
};


export default buildTree;