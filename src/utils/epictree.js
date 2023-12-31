const merkle = require('merkletreejs') ;
const keccak256 = require('keccak256');

export const getMerkleEpicRoot = () => {
  const tree = getMerkleEpicTree()
  return tree.getHexRoot()
  }
  
  
export const getMerkleEpicTree = () => {
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
  "root": "0x56bd8c88a72989fde5b2c4caf66f4d04a90bb13bfd69ebf9542b351c21121eab",
  "layers": [
    [
      "0x76cea51b65972e45891eb2c762370cc94a561834d335e3a7b01665fb66038c52",
      "0x71298a0c253b0083dba9d88e4714b34c620e1089c076d329d55ad3ad0f01df11",
      "0x5e6c324f58ef9433da1be275e4438280a120d8ab6f028f5874d776b0861ee044",
      "0xccb9c634acaab6b807b7da5166b89cdc237ac885a620fbd8fc2319e860d732c2",
      "0x4e007cc0a0390cf2bdd0bcdf64c61c8cee6d22d1d1771318f388ae6221f4e0c0",
      "0xe3c5a46241c75f28ea87211144fd8dabf170d31c756a6c105b2e77c8d6dedf03"
    ],
    [
      "0x7118a419f1fd5802bc5ee566edb5d31a358c2235b10510df8a7ceeb4b94e0969",
      "0x0dcd46e54463fee5c6cc0d242d73d948cfcc5bf573e3c5a6d74d24781fe6ee78",
      "0x01ea577f9bb7dbd5543104590249305a772898117ef0198a0ba351f870c92a93"
    ],
    [
      "0xa01aad6ec34bd51c874e5b59f1eb72fb46bb1e2e624b0f70d4ab251479960228",
      "0x01ea577f9bb7dbd5543104590249305a772898117ef0198a0ba351f870c92a93"
    ],
    [
      "0x56bd8c88a72989fde5b2c4caf66f4d04a90bb13bfd69ebf9542b351c21121eab"
    ]
  ],
  "leaves": [
    "0x76cea51b65972e45891eb2c762370cc94a561834d335e3a7b01665fb66038c52",
    "0x71298a0c253b0083dba9d88e4714b34c620e1089c076d329d55ad3ad0f01df11",
    "0x5e6c324f58ef9433da1be275e4438280a120d8ab6f028f5874d776b0861ee044",
    "0xccb9c634acaab6b807b7da5166b89cdc237ac885a620fbd8fc2319e860d732c2",
    "0x4e007cc0a0390cf2bdd0bcdf64c61c8cee6d22d1d1771318f388ae6221f4e0c0",
    "0xe3c5a46241c75f28ea87211144fd8dabf170d31c756a6c105b2e77c8d6dedf03"
  ]
}`