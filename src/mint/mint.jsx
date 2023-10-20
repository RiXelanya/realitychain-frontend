import { getMerkleLegendTree } from "../utils/legendtree";
import { getMerkleEpicTree } from "../utils/epictree";
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
   setRarenum(Number(event.target.value))
 }

 const handleEpicChange = event => {
   setEpicnum(Number(event.target.value))
 }

 const handleLegendMint = async () => {
   
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
 const handleEpicMint = async () => {
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
 const handleRareMint = async () => {
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

 const handleSubmit = event => {
   event.preventDefault()
 }
     return (
        <div className="mintInterface">
        <p className="mintInterfaceText">Placeholder</p>
        <div className="mintingform">
         <div className="tabset">
         <input type="radio" name="tabset" id="tab1" aria-controls="rare"/>
					<label htmlFor="tab1">Rare</label>
					<input type="radio" name="tabset" id="tab2" aria-controls="epic" disabled={!epicWhitelist}/>
					<label htmlFor="tab2">Epic</label>
					<input type="radio" name="tabset" id="tab3" aria-controls="legendary" disabled={!legendWhitelist}/>
					<label htmlFor="tab3">Legendary</label>
               <div className="tab-panels">
							<section id="rare" className="tab-panel">
								<p className="mintInterfaceText">You're minting <strong className="rare">RARE</strong> Av8tars</p>	
								<form onSubmit={handleSubmit}>
									<select name="amount" id="amount" className="input-field" onChange={handleRareChange}>
										<option defaultValue="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
                              <option value="4">4</option>
										<option value="5">5</option>
									</select>
									<button type="button" onClick= {handleRareMint} className="glow-on-hover">MINT!</button>
								</form>
							</section>
							<section id="epic" className="tab-panel">
								<p className="mintInterfaceText">You're minting <strong className="epic">EPIC</strong> Av8tars</p>	
								<form onSubmit={handleSubmit}>
									<select name="amount" id="amount" className="input-field" onChange={handleEpicChange}>
										<option defaultValue="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
									</select>
									<button type="button" className="glow-on-hover" value="Mint" onClick={handleEpicMint} disabled={!epicWhitelist}>MINT!</button>
								</form>
							</section>
							<section id="legendary" className="tab-panel">
								<p className="mintInterfaceText">You're minting <strong className="legendary">LEGENDARY</strong> Av8tars</p>	
								<form onSubmit={handleSubmit}>
									<select name="amount" id="amount" className="input-field">
										<option defaultValue="1">1</option>
									</select>
									<button type="button" className="glow-on-hover" value="Mint" onClick={handleLegendMint} disabled={!legendWhitelist}>MINT!</button>
								</form>
							</section>
						</div>
            </div>
         </div>
        {message !== '' && <p>Your token id is {message}</p>}
        {error !== '' && <p className="errorMessage">{error}</p>}
        </div>
     )
}
export default MintInterface