const merkle = require('merkletreejs') ;
const keccak256 = require('keccak256');
const readline = require('readline');
const fs = require('fs');

const meta = `const merkle = require('merkletreejs') ;
const keccak256 = require('keccak256');

export const getMerkleEpicRoot = () => {
  const tree = getMerkleEpicTree()
  return tree.getHexRoot()
  }
  
  
export const getMerkleEpicTree = () => {
      return merkle.MerkleTree.unmarshalTree(marshal,keccak256, { sortPairs: true, })
  }

const marshal = \``

const getMerkleEpicTree1 = async () => {
    let tree = new merkle.MerkleTree([], keccak256, { sortPairs: true, });
    const file = readline.createInterface({
        input: fs.createReadStream('src/utils/epic.txt'),
    });
    for await (const line of file) {
        tree.addLeaf(keccak256(line))
    }
    return tree
}
  
const main = async () => {
    try {
        const tree = await getMerkleEpicTree1();
        const marshal = merkle.MerkleTree.marshalTree(tree)
        fs.writeFile('src/utils/epictree.js',(meta + marshal + "`"),err => {
            if (err) {
                console.error(err);
            }
        })    
    }
    catch (e) {
        console.error(e)
    }
}

main()
