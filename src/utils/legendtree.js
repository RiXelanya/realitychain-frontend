const merkle = require('merkletreejs') ;
const keccak256 = require('keccak256');
export const getMerkleLegendRoot = () => {
    return getMerkleLegendTree().getHexRoot()
}

export const getMerkleLegendTree = () => {
    return merkle.MerkleTree.unmarshalTree(marshal,keccak256, { sortPairs: true, })
}

const marshal = `{
  "options": {
    "complete": false,
    "isBitcoinTree": false,
    "hashLeaves": false,
    "sortLeaves": false,
    "sortPairs": true,
    "sort": false,
    "fillDefaultHash": null,
    "duplicateOdd": false
  },
  "root": "0xfd34c4f7d6ca27da683b30ac640991157481fa397f204bca3fa3c141143df6a6",
  "layers": [
    [
      "0xfcc33668f8f33fabaa6a2a80526635966090b003805e9ac2a04c0136ea21e833",
      "0x95185ece76682cbf96c3c74f9b6375ad63517ad4de2cd4f09435ea2210340a96",
      "0x504c46012cda71ffcd17913dad3f7e92a4310f9aa044f256367aef384dcaeae6",
      "0xccb9c634acaab6b807b7da5166b89cdc237ac885a620fbd8fc2319e860d732c2",
      "0x4e007cc0a0390cf2bdd0bcdf64c61c8cee6d22d1d1771318f388ae6221f4e0c0",
      "0xe3c5a46241c75f28ea87211144fd8dabf170d31c756a6c105b2e77c8d6dedf03"
    ],
    [
      "0x7414581121126d5af9d3c942268b68a15ab31e53647281145a461d64454849d7",
      "0x780b280f6040136af27429d4b0007ca7dace84c79e165fc0441f4329b86f4b73",
      "0x01ea577f9bb7dbd5543104590249305a772898117ef0198a0ba351f870c92a93"
    ],
    [
      "0x94abe006700c2312166d609e8b2aa1c4501f14967db7768a06b44884a5ed6f26",
      "0x01ea577f9bb7dbd5543104590249305a772898117ef0198a0ba351f870c92a93"
    ],
    [
      "0xfd34c4f7d6ca27da683b30ac640991157481fa397f204bca3fa3c141143df6a6"
    ]
  ],
  "leaves": [
    "0xfcc33668f8f33fabaa6a2a80526635966090b003805e9ac2a04c0136ea21e833",
    "0x95185ece76682cbf96c3c74f9b6375ad63517ad4de2cd4f09435ea2210340a96",
    "0x504c46012cda71ffcd17913dad3f7e92a4310f9aa044f256367aef384dcaeae6",
    "0xccb9c634acaab6b807b7da5166b89cdc237ac885a620fbd8fc2319e860d732c2",
    "0x4e007cc0a0390cf2bdd0bcdf64c61c8cee6d22d1d1771318f388ae6221f4e0c0",
    "0xe3c5a46241c75f28ea87211144fd8dabf170d31c756a6c105b2e77c8d6dedf03"
  ]
}`