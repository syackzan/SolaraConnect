import './App.css';
import React, { useState, useEffect } from 'react';

// import { clusterApiUrl } from '@solana/web3js';
const { Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL, Connection, signAndSendTransaction, PublicKey } = require("@solana/web3.js");


const App = () => {

  const [key, setKey] = useState("No Key");
  const [encodedKey, setEncodedKey] = useState([]);
  const [test, setTest] = useState([]);
  let lamportsInSol = 1000000000;

  useEffect(() => {

    // Will either automatically connect to Phantom, or do nothing.
    try {

      let pk = window.solana.connect({ onlyIfTrusted: true})
      setKey(pk.publicKey.toBase58());

    } catch(e){
      console.log(e)
    }
    
  }, []);

  const connect = async () => {

    //Connect to Phantom Wallet, and set Public Key
    try {

      const resp = await window.solana.connect();
      const keyString = resp.publicKey.toString();
      setKey(keyString);
      let base58publicKey = new PublicKey(key);
      setTest(base58publicKey);
      

    } catch(e){

      console.log(400);

    }

  }

  //This Code Works!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const mainNetTransaction = async () => {
    //Testing with Kepair Generators
    try {

      //Network specifc to live Main Network of Solara
      const network = "https://api.mainnet-beta.solana.com";

      //Initializing connection
      const connection = new Connection(network);

      //Connecting to Phantom wallet & storing the public key in resp
      const resp = await window.solana.connect();

      //Get the latest Blockhash to use inside a transaction
      let recentBlockhash = await connection.getRecentBlockhash();

      //Confirms if Public Key is Equal
      const isEqual = resp.publicKey.equals(test);
      console.log(isEqual);

      // //Creating a new Transaction Instance with blockhash and who will pay transaction fee
      // const transaction = new Transaction ({
      //   recentBlockhash: recentBlockhash.blockhash,
      //   feePayer: test
      // });

      // //Adding the Program via SystemProgram & from/to public Keys
      // transaction.add(
      //   SystemProgram.transfer({
      //     fromPubkey: test,
      //     toPubkey: test,
      //     lamports: 100
      //   })
      // );
      // console.log(transaction);

      // //Signing the Transaction & sending it off
      // const { signature } = await window.solana.signAndSendTransaction(transaction);
      // console.log(signature);

      // //Confirm Transaction was complete
      // const completion = await connection.confirmTransaction(signature);
      // console.log(completion);
      
    } catch (e) {
      console.log(e);
    }
  }

  const mainnet = async () => {

    
    // const resp = await window.solana.connect();
    // const key = resp.publicKey.toString();
    // const bufferKey = resp.publicKey.encode();

    // Create a new public key from encoded base 58 encoded string
    let base58publicKey = new PublicKey(key);

    //set the new key as within a usestate variable
    setKey(base58publicKey);

    console.log(base58publicKey.toString());
    console.log(base58publicKey);
    // console.log(test);
    console.log(key);



    // // Return Account Info from User Logged In
    // const network = "https://api.mainnet-beta.solana.com";
    // const connection = new Connection(network);
    // const accountInfo = await connection.getAccountInfo(resp.publicKey);
    // console.log(accountInfo);
    // console.log(accountInfo.owner.toString());
  }

  return (
    <>
      {key === "No Key" ? (<div>No Keys</div>) : (
        <div>
          <p>Public Key: {key}</p>
          <p>Buffer Key: {encodedKey}</p>
      </div>
      )}
      <div className="flexColumn">
        <button onClick={connect} className="space">Connect</button>
        <button onClick={mainNetTransaction} className="space">Main Net Transaction</button>
        <button onClick={mainnet} className="space">Main Net</button>
      </div>
    </>

  )
}

export default App

