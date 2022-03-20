import Head from 'next/head'
import Login from '../components/Login'
import { metamask } from "../components/connector"
import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import Contract from '../components/Contract'

export default function Home() {
  const { library } = useWeb3React();

  const [userbalance, setUserBalance] = useState()
  const { activate, active, account, deactivate, chainId } = useWeb3React()

  
  const updateBalance = async (address) => {
    const _balance = await library?.eth.getBalance(address);
    setUserBalance(library?.utils.fromWei(_balance));
  }

  useEffect(() => {
    updateBalance(account);
  }, [account, chainId])

  const connect = async () => {
    try {
      await activate(metamask)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='main flex justify-center items-center'>
      <Head>
        <title>Week-12-DApp</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className="container w-[50%] h-[80%] bg-gray-200 rounded-lg shadow-2xl p-[1.5%] flex justify-center items-center">
        {
          active ? <Contract chainId={chainId} account={account} userbalance={userbalance}/>
            :
            <Login connect={connect} />
        }
      </div>
    </div>
  )
}
