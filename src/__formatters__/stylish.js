import _ from 'lodash'

const stringify = (data, depth, replacer = ' ') => {

  if (!_.isObject(data)) {
  
    return String(data);
  };
  
  const indentForKey = replacer.repeat(depth + 1)
  const bracketIdent = replacer.repeat(depth);
  const massiveValue = Object.entries(data);
  const lines = massiveValue.map(([key, value]) => `${indentForKey}${key}: ${stringify(value, depth + 1)}`);
  
  return ['{', ...lines, `${bracketIdent}}`].join('\n'); 
    
};

const sign = {
  added: '+',
  deleted: '-',
  notChanged: ' ',
};

const stylish = (difference, replacer = '    ') => {
  const iter = (tree, depth) => tree.map((node) => {

    const indent = replacer.repeat(depth);
    const identForSign = indent.slice(2);

    const makeLine = (value, indicator) => `${identForSign}${indicator} ${node.key}: ${stringify(value, depth, replacer)}`;

    switch (node.state) {
      case 'added':
        return makeLine (node.afterValue, sign.added);
      case 'deleted':
        return makeLine (node.beforeValue, sign.deleted);
      case 'notChanged':
        return makeLine (node.beforeValue, sign.notChanged); 
      case 'changed':
        return [`${makeLine (node.beforeValue, sign.deleted)}`,
        `${makeLine (node.afterValue, sign.added)}`].join('\n');
      case 'nested':
        return `${indent}${node.key}: ${['{', ...iter(node.children, depth + 1), `${indent}}`].join('\n')}`;
      default:
        throw new Error (`Type ${node.state} is undefined`);
    }
  });

  const stylishDiff = iter(difference, 1);
  
  return ['{', ...stylishDiff, '}'].join('\n');
}
  export default stylish;