import { getMerkleLegendRoot, getMerkleLegendTree } from "../utils/legend";
import { getMerkleRareTree } from "../utils/rare";
import { getMerkleEpicTree } from "../utils/epic";
import { useState } from "react";
import { ethers } from "ethers";
import keccak256 from "keccak256";
import './mint.css'

const contractABI = require('./abi.json');

const MintInterface = props => {
 const { address } = props ;
 const contractAddress = '0x8789151CC40d245d62b056B236ff657A795ab081';
 const [rank, setRank] = useState(0);
 const [price, setPrice] = useState(0);
 const [tier, setTier] = useState('')
 const [proof,setProof] = useState('')
 const [error,setError] = useState('')
 const rare = getMerkleRareTree();
 const provider = new ethers.BrowserProvider(window.ethereum);

 const handleMint = async () => {
   
   const signer = await provider.getSigner();
   let mintContract = new ethers.Contract(contractAddress,contractABI,signer);
   console.log(proof);
   try {
   let tx = await mintContract.mint(rank,proof,"",{ value: ethers.parseEther(price) })
   // let tx = await mintContract.setMerkleRoot(rank,getMerkleLegendTree().getHexRoot())
   await tx.wait()
}
   catch {
      console.log('there is an error');
      setError('There is an error')
   }
 }

 if (rare.verify(rare.getProof(keccak256(address)),keccak256(address),rare.getRoot())) {
    if (tier !== 'rare') {
    setTier('rare');
    setRank(2);
    setPrice('0.01')
    setProof(rare.getHexProof(keccak256(address)))
 }
}
else {
    const epic = getMerkleEpicTree();
    if (epic.verify(epic.getProof(keccak256(address)),keccak256(address),epic.getRoot())) {
        if (tier !== 'epic') {
        setTier('epic');
        setRank(1);
        setPrice('0.03');
        setProof(epic.getHexProof(keccak256(address)))
     }
    }
     else {
        const legend = getMerkleLegendTree();
        if (legend.verify(legend.getProof(keccak256(address)),keccak256(address),legend.getRoot())) {
            if (tier !== 'legend'){
            setTier('legend');
            setRank(0);
            setPrice('0.05')
            setProof(legend.getHexProof(keccak256(address)))
         }
        }
     }
    }
     return (
        <div className="mintInterface">
        <p className="mintInterfaceText">You are whitelisted as {tier} address. Minting will cost {price} eth</p>
        <button onClick={handleMint} className="mintButton">{tier} mint</button>
        {error !== '' && <p className="errorMessage">{error}</p>}
        </div>
     )
}
export default MintInterface