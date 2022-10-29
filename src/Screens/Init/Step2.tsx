import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import ABI from '../../ABI/usdt.json';
import './Index.css';
import {useToken, useAccount} from '@web3modal/react';
import { Button, Grid, Textarea, Text, Spacer } from '@nextui-org/react';


export default function Step2({txid}: {txid: ethers.providers.TransactionResponse}) {
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState<number>()
  const [ticker, setTicker] = useState<string>()
  const [destAddress, setDestAddress] = useState<`0x${string}`>();
  const token = useToken({address: txid.to as `0x${string}`})
  const walletAccount = useAccount()

  useEffect(() => {
    if(token.data && walletAccount){
      setTicker(token.data?.symbol);
      const iface = new ethers.utils.Interface(ABI);
      let decodedData = iface.parseTransaction({ data: txid.data, value: txid.value });
      setAmount(decodedData.args[1].toNumber() / Math.pow(10, token.data?.decimals));
      setDestAddress(decodedData.args[0]);
      setIsLoading(false);
    }
  }, [token.data, txid.data, txid.value, walletAccount])

  const otherPartieAddress = walletAccount.account.address === txid.from ? destAddress : txid.from

  const Loading = () => {
    return (
      <Grid.Container style={{height: '100vh'}} justify="center" alignContent='center' gap={2}>
        <span className='step2-loader'></span>
      </Grid.Container>
    )
  }

  return(
    isLoading
    ? <Loading />
    : <Grid.Container justify='center' alignItems="center" alignContent="center" direction="column">
        <div className='txid'>
          <a target='_blank' rel="noreferrer" href={`https://etherscan.io/tx/${txid.hash}`}>{txid.hash}</a>
        </div>
        <Text h1>
          {amount}
          <a target='_blank' rel="noreferrer" href={`https://etherscan.io/address/${txid.to}`}>{ticker}</a>
        </Text>
        <h2>from {walletAccount.account.address === txid.from && '(you)'}</h2>
        <a className='wallet-address' target='_blank' rel="noreferrer" href={`https://etherscan.io/address/${txid.from}`}>{txid.from}</a>
        <h2>to {walletAccount.account.address === destAddress && '(you)'}</h2>
        <a className='wallet-address' target='_blank' rel="noreferrer" href={`https://etherscan.io/address/${destAddress}`}>{destAddress}</a>
        <Textarea aria-label='notes' placeholder="Notes (optional)"/>
        <Spacer y={2} />
        <Button color="gradient">encrypt for {otherPartieAddress}</Button>
      </Grid.Container>
  )
}
