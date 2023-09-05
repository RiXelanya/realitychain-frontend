const merkle = require('merkletreejs') ;
const keccak256 = require('keccak256');
const addresses = [
    '0xadA4eC33b892D44c78Ee7Ef9681220E539dCe46c',
    '0x70c28d204B8De3Dc67cc2cc61Ee8bD1DD4a31421',
    '0xCbd0c738e309517b7ebaE6D9E99703E24C481015',
    '0x78aA4E08e78E47977a09E29b2ad7B1C7c6B05aA3',
    '0x9D35AED7ff571CBdFaF8a4710BebF105b54A38f4',
    '0x7c41F39B8d12409486d9ED36134AED9B2345CB6C'
];
export const getMerkleLegendRoot = () => {
const tree = getMerkleLegendTree()
return tree.getHexRoot()
}

export const getMerkleLegendTree = () => {
    const tree = new merkle.MerkleTree(addresses.map(address => keccak256(address)), keccak256, { sortPairs: true, });
    return tree
    }

// console.log(getMerkleLegendRoot())