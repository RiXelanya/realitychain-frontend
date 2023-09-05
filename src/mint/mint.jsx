import { getMerkleLegendTree } from "../utils/legend";
import { getMerkleEpicTree } from "../utils/epic";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import keccak256 from "keccak256";
import './mint.css'

const contractABI = require('./abi.json');

const MintInterface = props => {
 const { address } = props ;
 const hashedAddress = keccak256(address);
 const contractAddress = '0x23331Bdb6A8aB6B5A617032B81786DFB8aD410D7';
 const [error,setError] = useState('')
 const [legendWhitelist, setLegendWhitelist] = useState(false);
 const [epicWhitelist, setEpicWhitelist] = useState(false);
 const [message, setMessage] = useState('')
 const provider = new ethers.BrowserProvider(window.ethereum);

 const handleLegendMint = async () => {
   
   const signer = await provider.getSigner();
   let mintContract = new ethers.Contract(contractAddress,contractABI,signer);
   const proof = getMerkleLegendTree().getHexProof(hashedAddress);
   await mintContract.mintLegendary(1,proof,{ value: ethers.parseEther('0.05') }).wait().then(tx => {
      tx.wait()
   }).catch(err => {
      setError('there is an error');
   })
   // let tx = await mintContract.setMerkleRoot(rank,getMerkleLegendTree().getHexRoot())
 }
 const handleEpicMint = async () => {
   
   const signer = await provider.getSigner();
   let mintContract = new ethers.Contract(contractAddress,contractABI,signer);
   const proof = getMerkleEpicTree().getHexProof(hashedAddress);
   await mintContract.mintEpic(1,proof,{ value: ethers.parseEther('0.03') }).then(tx => {
      tx.wait()
   }).catch(err => {
      setError('there is an error');
   })
   // let tx = await mintContract.setMerkleRoot(rank,getMerkleLegendTree().getHexRoot())
 }
 const handleRareMint = async () => {
   
   const signer = await provider.getSigner();
   let mintContract = new ethers.Contract(contractAddress,contractABI,signer);
   let tx = await mintContract.mintRare(1,{ value: ethers.parseEther('0.01') }).then(tx => {
      return tx.wait()
   }).catch(err => {
      setError('there is an error');
   })
   const events = tx.logs
   const event = events[0].args
   setMessage(event[2])
   // let tx = await mintContract.setMerkleRoot(rank,getMerkleLegendTree().getHexRoot())
   
 }
 useEffect(()=> {
   const legend = getMerkleLegendTree();
   const legendRoot = legend.getHexRoot();
   const legendProof = legend.getHexProof(hashedAddress);
   const epic = getMerkleEpicTree();
   const epicRoot = epic.getHexRoot();
   const epicProof = epic.getHexProof(hashedAddress);
   setEpicWhitelist(epic.verify(epicProof,hashedAddress,epicRoot))
   setLegendWhitelist(legend.verify(legendProof,hashedAddress,legendRoot))
 },[hashedAddress])
     return (
        <div className="mintInterface">
        <p className="mintInterfaceText">Placeholder</p>
        <button onClick={handleLegendMint} className="mintButton" disabled={!legendWhitelist}>
         Legend mint
        </button>
        <button onClick={handleEpicMint} className="mintButton" disabled={!epicWhitelist}>
         Epic mint
         </button>
        <button onClick={handleRareMint} className="mintButton">
         Rare mint
         </button>
        {error !== '' && <p className="errorMessage">{error}</p>}
        {message !== '' && <p>{message}</p>}
        </div>
     )
}
export default MintInterface