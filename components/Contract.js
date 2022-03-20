import { useEffect, useState } from "react";
import config from "../abi/TokenABI.json"
import { useWeb3React } from "@web3-react/core";
import Web3 from 'web3'

export default function Contract({ chainId, account, userbalance }) {
    const { library } = useWeb3React();
    const [contract, setContract] = useState(null);
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [supply, setSupply] = useState("0");
    const [price, setPrice] = useState("0");
    const [balance, setBalance] = useState("0");
    const [amount, setAmount] = useState("");
    const [owhBalance, setOwhBalance] = useState("");
    const [owhAddress, setOwhAddress] = useState("")
    const [buyToken, setBuyToken] = useState(0)
    useEffect(() => {
        getContractInfo();
    }, [chainId])

    const getContractInfo = async () => {
        try {
            const contractAddress = config["chains"][chainId];
            const _contract = new library.eth.Contract(config["abi"], contractAddress);
            setContract(_contract);

            setName(await _contract.methods.name().call());
            setSymbol(await _contract.methods.symbol().call());
            setSupply(await _contract.methods.totalSupply().call());
            setPrice(await _contract.methods.priceOfToken().call());
            setBalance(await _contract.methods.balanceOf(account).call());
        } catch (error) {
            console.log(error);
        }
    }
    const handleAddressChange = (e) => setOwhAddress(e.target.value);
    const handleAddressSubmit = async () => {
        try {
            const _owhBalance = await contract.methods.owhBalanceOf(account).call();
            setOwhBalance(_owhBalance);
        } catch (e) {
            console.log(e);
        }
    };

    const handleBuyToken = async () => {
        const numTokens = parseInt(buyToken);
        const priceInWei = parseInt(price);
        library.eth.sendTransaction({
            from: account,
            to: config["chains"][chainId],
            value: `${numTokens * priceInWei}`
        })
        setBuyToken("");
    }


    return (
        <div className="login flex flex-col">
            <h1>Account: {account}</h1>
            <h1>Balance: {balance}</h1>
            <h1>Symbol: {symbol}</h1>
            <h1>Name: {name}</h1>
            <h1>Supply: {supply} {symbol}</h1>
            <h1>Price: {library.utils.fromWei(price)} ETH</h1>
            <h1>{amount}</h1>
            <h1 className="mb-[10%]">User balance: {userbalance} ETH</h1>
            <input
                type="text"
                className={`border-2 px-2 flex-grow outline-none focus:bg-gray-100 p-[1%]`}
                value={owhAddress}
                onChange={handleAddressChange}
                placeholder="someone's address"
            />
            <button className="mt-[1%] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-[1%] border border-blue-500 hover:border-transparent rounded w-[20%] mb-[5%]" onClick={handleAddressSubmit}>Check</button>
            {
                owhBalance && (
                    <p className="mb-4">
                        The owhBalance is: <span className="text-blue-600">{library.utils.fromWei(owhBalance)}</span>
                    </p>
                )
            }
            <input
                type="text"
                className={`border-2 px-2 flex-grow outline-none focus:bg-gray-100 p-[1%]`}
                value={buyToken}
                onChange={(e) => setBuyToken(e.target.value)}
                placeholder="buy some tokens"
            />
            <button className="mt-[1%] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-[1%] border border-blue-500 hover:border-transparent rounded w-[20%]" onClick={handleBuyToken}>Buy</button>
        </div >
    )
}
