import './userInterface.css'
import { React, useState } from 'react'
import MintInterface from '../mint/mint';
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
    
    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    if(chainId !== '0x66eed') {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x66eed' }],
        }).then(setAddress(account))
      }
      catch (err) {
        if (err.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x66eed',
              chainName: 'Arbitrum Goerli',
              rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc']
           }],
          }).then(setAddress(account)).catch(err => {setAddress('')})
        }
        else {
          setAddress('')
        }
      }
    }
    else {
      setAddress(account)
    }
  }

  if (address === '') {
    return (
        <button className="ConnectorButton" onClick={handleMetamaskConnect}>Connect Metamask</button>
    )
  }

  const handleAccountChange = accounts => {
    setAddress(accounts[0])
  }

  window.ethereum.on('accountsChanged', handleAccountChange)
  return (
    <div className='userInterface'>
    <p className='userInterfaceText'>Connected to Address<br></br>{address}</p>
    <div className="break"></div>
    <MintInterface address={address}></MintInterface>
    </div>
  )
}

export default UserInterface