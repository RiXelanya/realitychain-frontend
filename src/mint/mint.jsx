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
 const contractAddress = '0xA2aeAD85f89fc78f221A6259bd66a2072D3Ed45c';
 const [error,setError] = useState('')
 const [epicWhitelist, setEpicWhitelist] = useState(false);
 const [message, setMessage] = useState('')
 const [rarenum, setRarenum] = useState(1)
 const [epicnum, setEpicnum] = useState(1)
 const epictree = getMerkleEpicTree()
 const legendtree = getMerkleLegendTree()
 const provider = new ethers.BrowserProvider(window.ethereum);

 const errorMessage = err => {
   if (message !== '') {
      setMessage('')
   }
   setError(errorHandler(String(err.message)));

 }

 const chainverifier = async () => {
   const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    if(chainId !== '0xa4b1') {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xa4b1' }],
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

 const handleEpicMint = async () => {
   const signer = await provider.getSigner();
   let mintContract = new ethers.Contract(contractAddress,contractABI,signer);
   setMessage('')
   const proof = epictree.getHexProof(hashedAddress);
   const price = Number(epicnum) * 0.004
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
 }
 const handleRareMint = async () => {
   const signer = await provider.getSigner();
   let mintContract = new ethers.Contract(contractAddress,contractABI,signer);
   setMessage('')
      const price = Number(rarenum) * 0.0027
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
   
 }
 useEffect(()=> {
   const epicRoot = epictree.getHexRoot();
   const epicProof = epictree.getHexProof(hashedAddress);
   setEpicWhitelist(epictree.verify(epicProof,hashedAddress,epicRoot))
 },[hashedAddress,epictree,legendtree])

 const handleSubmit = event => {
   event.preventDefault()
 }
     return (
        <div className="mintInterface">
        <p className="mintInterfaceText">NFT Minting</p>
        <div className="mintingform">
         <div className="tabset">
         <input type="radio" name="tabset" id="tab1" aria-controls="rare"/>
					<label htmlFor="tab1">Rare</label>
					<input type="radio" name="tabset" id="tab2" aria-controls="epic"/>
					<label htmlFor="tab2">Epic</label>
               <div className="tab-panels">
							<section id="rare" className="tab-panel">
								<p className="mintInterfaceText">You're minting <strong className="rare">RARE</strong> Av8tars</p>	
                        <p className="mintInterfaceText">1 <strong className="rare">RARE</strong> Av8tars = 0.0027 $ETH</p>	
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
                        <p className="mintInterfaceText">1 <strong className="epic">EPIC</strong> Av8tars = 0.004 $ETH</p>
								<form onSubmit={handleSubmit}>
									<select name="amount" id="amount" className="input-field" onChange={handleEpicChange}>
										<option defaultValue="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
									</select>
									<button type="button" className="glow-on-hover" value="Mint" onClick={handleEpicMint} disabled={!epicWhitelist}>MINT!</button>
								</form>
                        {!epicWhitelist && <p>You are not whitelisted</p>}
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