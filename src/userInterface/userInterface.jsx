import './userInterface.css'
import { React, useState } from 'react'
import {Buffer} from 'buffer';
import MintInterface from '../mint/mint';
const { ethers } = require("ethers");
const UserInterface = props => {
  const [address, setAddress] = useState('');
  window.Buffer = window.Buffer || require("buffer").Buffer

  const handleMetamaskConnect = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
    const account = accounts[0];
    setAddress(account);
    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    if(chainId !== '0x66eed') {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x66eed' }],
          });
    }
  }

  if (address === '') {
    return (
        <button className="ConnectorButton" onClick={handleMetamaskConnect}>Connect Metamask</button>
    )
  }
  return (
    <div className='userInterface'>
    <p className='userInterfaceText'>Connected to Address<br></br>{address}</p>
    <MintInterface address={address}></MintInterface>
    </div>
  )
}

export default UserInterface