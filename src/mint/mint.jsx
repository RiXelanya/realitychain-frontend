import { getMerkleLegendTree } from "../utils/legend";
import { getMerkleEpicTree } from "../utils/epic";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import keccak256 from "keccak256";
import './mint.css'
import { errorHandler } from "../error/error";

const contractABI = require('./abi.json');

const MintInterface = props => {
 const { address } = props ;
 const hashedAddress = keccak256(address);
 const contractAddress = '0xF3a2bBd09d38bf120a940F965266034248eC0F84';
 const [error,setError] = useState('')
 const [legendWhitelist, setLegendWhitelist] = useState(false);
 const [epicWhitelist, setEpicWhitelist] = useState(false);
 const [message, setMessage] = useState('')
 const [rarenum, setRarenum] = useState(1)
 const [epicnum, setEpicnum] = useState(1)
 const provider = new ethers.BrowserProvider(window.ethereum);

 const errorMessage = err => {
   if (message !== '') {
      setMessage('')
   }
   setError(errorHandler(String(err.message)));

 }

 const chainverifier = async () => {
   const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    if(chainId !== '0x66eed') {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x66eed' }],
          }).catch(err => {throw new Error("Wrong Chain")});
    }
 }

 const eventHandler = tx => {
   const events = tx.logs ;
   const event = events.map(event => String(event.args[2]))
   let temp = ''
   event.forEach(event => temp = temp + event + " ")
   setMessage(temp)
   if (error !== '') {
      setError('')
   }
 }

 const handleRareChange = event => {
   setRarenum(event.target.value)
 }

 const handleEpicChange = event => {
   setEpicnum(event.target.value)
 }

 const handleLegendMint = async (event) => {
   event.preventDefault()
   
   const signer = await provider.getSigner();
   let mintContract = new ethers.Contract(contractAddress,contractABI,signer);
   const proof = getMerkleLegendTree().getHexProof(hashedAddress);
      await chainverifier().then(
         () => mintContract.mintLegendary(proof,{ value: ethers.parseEther('0.05') })
         ).then(tx => {
         return tx.wait()
      }).then(tx => {
         eventHandler(tx)     
      }).catch(err => {
         errorMessage(err)
   })
   // let tx = await mintContract.setMerkleRoot(rank,getMerkleLegendTree().getHexRoot())
 }
 const handleEpicMint = async (event) => {
   event.preventDefault()
   
   const signer = await provider.getSigner();
   let mintContract = new ethers.Contract(contractAddress,contractABI,signer);
   setMessage('')
   const proof = getMerkleEpicTree().getHexProof(hashedAddress);
   const price = Number(epicnum) * 0.03
   await chainverifier().then(
      () => mintContract.mintEpic(epicnum,proof,{ value: ethers.parseEther(String(price)) })
      ).then(tx => {
      return tx.wait()
   }).then(tx => {
      eventHandler(tx)     
   }).catch(err => {
      errorMessage(err)
})
   setEpicnum(1)
   // let tx = await mintContract.setMerkleRoot(rank,getMerkleLegendTree().getHexRoot())
 }
 const handleRareMint = async (event) => {
   event.preventDefault()
   
   const signer = await provider.getSigner();
   let mintContract = new ethers.Contract(contractAddress,contractABI,signer);
   setMessage('')
      const price = Number(rarenum) * 0.01
      await chainverifier().then(
         () => mintContract.mintRare(rarenum,{ value: ethers.parseEther(String(price)) })
         ).then(tx => {
         return tx.wait()
      }).then(tx => {
         eventHandler(tx)     
      }).catch(err => {
         errorMessage(err)
   })
      setRarenum(1)
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
        <div classname="mintingform">
         <form onSubmit={handleLegendMint}>
            <input type="number" value="1" min="1" max="1" step="1"></input>
            <input type="submit" className="glow-on-hover" value="Legend Mint" disabled={!legendWhitelist}></input>
         </form>
        </div>
        <div classname="mintingform">
         <form onSubmit={handleEpicMint}>
         <input type="number" value={epicnum} onChange={handleEpicChange} min="1" max="3" step="1"></input>
            <input type="submit" className="glow-on-hover" value="Epic Mint" disabled={!epicWhitelist}></input>
         </form>
         </div>
        <div classname="mintingform">
        <form onSubmit={handleRareMint}>
            <input type="number" value={rarenum} onChange={handleRareChange} min="1" max="5" step="1"></input>
            <input type="submit" className="glow-on-hover" value="Rare Mint"></input>
         </form>
         </div>
        {message !== '' && <p>Your token id is {message}</p>}
        {error !== '' && <p className="errorMessage">{error}</p>}
        </div>
     )
}
export default MintInterface