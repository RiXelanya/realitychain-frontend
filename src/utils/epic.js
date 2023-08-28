const merkle = require('merkletreejs') ;
const keccak256 = require('keccak256');
const addresses = [
    '0x8BE7F031F3d878dd01042f0E22b9126310a8E3AD',
    '0xA1D441EAcb7A2c50F8849846373105c8E837843B',
    '0x091Edc2C37b596a6aC2487bfC5d0937338EE7806'
];
export const getMerkleEpicRoot = () => {
const tree = getMerkleEpicTree()
return tree.getHexRoot()
}

export const getMerkleEpicTree = () => {
    const tree = new merkle.MerkleTree(addresses.map(address => keccak256(address)), keccak256, { sortPairs: true, });
    return tree
    }