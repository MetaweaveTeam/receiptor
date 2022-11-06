import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import ABI from '../../ABI/usdt.json';
import './Index.css';
import {useToken, useAccount} from '@web3modal/react';
import { Button, Grid, Text, Spacer, Card } from '@nextui-org/react';
import { PoR } from '../../types';
import Txid from '../../Components/Txid';
import UserInput from '../../Components/UserInput';

export default function Step2({txid, submit}: {txid: ethers.providers.TransactionResponse, submit: (por: PoR) => void}) {
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState<number>()
  const [ticker, setTicker] = useState<string>()
  const [vat, setVat] = useState<number>(0)
  const [notes, setNotes] = useState("")
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

  const onUserInputChange = ({notes, vat}: {notes: string, vat: number}) => {
    setVat(vat)
    setNotes(notes)
  }

  return(
    isLoading
    ? <Loading />
    : <Grid.Container justify='center' alignItems="center" alignContent="center" direction="column" gap={2}>
        <Card>
          <Card.Body>
            <Text h1 css={{textAlign: 'right'}}>Receipt</Text>
            <Text css={{textAlign: 'right'}}>no. <Txid hash={txid.hash as `0x${string}`} /></Text>
            <Text css={{textAlign: 'right'}}>Date</Text>
            <Spacer y={0.5} />
            <Card.Divider />
            <Spacer y={2} />
            <Text h2 css={{textAlign: 'center'}}>{amount} {ticker}</Text>
            <Spacer y={2} />
            <Text b>from {walletAccount.account.address === txid.from && '(you)'}</Text>
            <a className='wallet-address' target='_blank' rel="noreferrer" href={`https://etherscan.io/address/${txid.from}`}>{txid.from}</a>
            <Card.Divider />
            <Text b>
              to {walletAccount.account.address === destAddress && '(you)'}
            </Text>
            <a className='wallet-address' target='_blank' rel="noreferrer" href={`https://etherscan.io/address/${destAddress}`}>{destAddress}</a>
            <UserInput amount={amount} onChange={onUserInputChange} />
          </Card.Body>
        </Card>
        <Spacer y={2} />
        <Button color="gradient" onPress={() => submit({txid: txid.hash as `0x${string}`, vat: vat, notes: notes})}>encrypt for {`${otherPartieAddress?.slice(0,10)}...${otherPartieAddress?.slice(-10,otherPartieAddress.length)}`}</Button>
        <Spacer y={2} />
      </Grid.Container>
  )
}
