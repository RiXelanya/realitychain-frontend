const merkle = require('merkletreejs') ;
const keccak256 = require('keccak256');
const addresses = [
    '0xaddfa7B257B63f9140ddC2bd65366DE1F3EEFB51',
    '0x63A61F8000648776248C7c2ec23638A7d87eDA83',
    '0xc4dd136B6d5CF3AB27E2C7B3507584be332e8AdD',
    '0xfa1656f6785718BaE8A8790DBd91433Cd566dF8f'
];
const angga = '0xfa1656f6785718BaE8A8790DBd91433Cd566dF8f'
export const getMerkleRareRoot = () => {
const tree = getMerkleRareTree()
return tree.getHexRoot()
}

export const getMerkleRareTree = () => {
    const tree = new merkle.MerkleTree(addresses.map(address => keccak256(address)), keccak256, { sortPairs: true, });
    return tree
    }