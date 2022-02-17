import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import  cryptoCurrency  from '../../utils/Nomics';

const { Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL, Connection, signAndSendTransaction, PublicKey } = require("@solana/web3.js");

const Mainnet = () => {

    const [key, setKey] = useState("No Key");
    const [newKey, setNewKey] = useState('');
    const [test, setTest] = useState([]);
    const [sol, setSol] = useState()
    const [dollars, setDollars] = useState();
    const [accountLamports, setAccountLamports] = useState(0)
    let lamportsInSol = 1000000000;

    useEffect(async () => {

        // Will either automatically connect to Phantom, or do nothing.
        try {

            let pk = await window.solana.connect({ onlyIfTrusted: true })
            setKey(pk.publicKey.toBase58());

        } catch (e) {
            //console.log(e)
        }

        try {

            let price = await cryptoCurrency();

            setSol(price);
        } catch(e){

        }
        

    }, []);

    const connect = async () => {

        //Connect to Phantom Wallet, and set Public Key
        try {

            const resp = await window.solana.connect();
            const keyString = resp.publicKey.toString();
            setKey(keyString);

        } catch (e) {

            console.log(200);

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
            //   feePayer: newKey
            // });

            // //Adding the Program via SystemProgram & from/to public Keys
            // transaction.add(
            //   SystemProgram.transfer({
            //     fromPubkey: newKey,
            //     toPubkey: newKey,
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

    const consoleLogs = async () => {


        // const resp = await window.solana.connect();
        // const key = resp.publicKey.toString();
        // const bufferKey = resp.publicKey.encode();

        // Create a new public key from encoded base 58 encoded string
        let base58publicKey = new PublicKey(key);

        //set the new key as within a usestate variable
        setNewKey(base58publicKey);

        console.log(sol);

        // Return Account Info from User Logged In
        const network = "https://api.mainnet-beta.solana.com";
        const connection = new Connection(network);
        const accountInfo = await connection.getAccountInfo(base58publicKey);
        setAccountLamports(accountInfo.lamports/lamportsInSol);
        setDollars((parseFloat((accountInfo.lamports/lamportsInSol)) * parseFloat(sol)).toFixed(2));

    }
    return (
        <div className="">
            <h1 className="headerText d-flex justify-content-center">Phantom Main Net</h1>
            {key === "No Key" ? (<div className="m-4 headerText d-flex justify-content-center">Account Not Linked</div>) : (
                <div className="space headerText d-flex justify-content-center flex-column">
                    <p>Public Key: {key}</p>
                    <p>Account Value: {accountLamports} Lamports ~ ${dollars}</p>
                </div>
            )}
            <div className="">
                <button onClick={connect} className="netLinks">Connect</button>
                <button onClick={mainNetTransaction} className="netLinks">Main Net Transaction</button>
                <button onClick={consoleLogs} className="netLinks">Console Logs</button>
            </div>
            <div>
                <Link to="/" className="">Back</Link>
            </div>
        </div>
    )
}

export default Mainnet;