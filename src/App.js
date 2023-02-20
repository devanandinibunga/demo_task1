import React, {  useEffect, useState } from 'react';
import './App.css';
import { digitalwalletscontext } from './components/DataContext/DataContext';
import { DigitalWalletList } from './components/DigitalWalletList/DigitalWalletList';


function App() {

  const [totalDigitalWallets,setTotalDigitalWallets]=useState([]);
  let totalWalletsFromLocalStorage = JSON.parse(localStorage.getItem("storingDigitalWalletsToLocalStorage"));
  useEffect (() => {
    // let totalWalletsFromLocalStorage = JSON.parse(localStorage.getItem("storingDigitalWalletsToLocalStorage"));
    if (totalWalletsFromLocalStorage === null) {
      setTotalDigitalWallets([]);

    } else {
      setTotalDigitalWallets(totalWalletsFromLocalStorage);
    }
  }, []);

  return (
    <div className="App">
      <h1 className='digital-wallet-main-heading'>Wallets</h1>
      <digitalwalletscontext.Provider value={{totalDigitalWallets,setTotalDigitalWallets}}>
        <digitalwalletscontext.Consumer>
          {({setTotalDigitalWallets,totalDigitalWallets})=> (
          <DigitalWalletList totalDigitalWallets={totalDigitalWallets} setTotalDigitalWallets={setTotalDigitalWallets} />)}
        </digitalwalletscontext.Consumer>
      </digitalwalletscontext.Provider>
    </div>
  );
}

export default App;
