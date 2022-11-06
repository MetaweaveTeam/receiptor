import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import ABI from '../../ABI/usdt.json';
import './Index.css';
import {useAccount} from '@web3modal/react';
import { fetchToken } from '@wagmi/core';
import { Button, Grid, Text, Spacer, Card } from '@nextui-org/react';
import { PoR, Receipt } from '../../types';
import Txid from '../../Components/Txid';
import UserInput from '../../Components/UserInput';
import { provider } from '../../constants';

const iface = new ethers.utils.Interface(ABI);

export default function Step2({tx, submit}: {tx: ethers.providers.TransactionResponse, submit: (por: PoR) => void}) {
  const [isLoading, setIsLoading] = useState(true);
  const [vat, setVat] = useState<number>(0)
  const [notes, setNotes] = useState("")
  const walletAccount = useAccount()

  const [receipt, setReceipt] = useState<Receipt>({
    txid: tx.hash as `0x${string}`,
    erc20: {
      id: tx.to as `0x${string}`,
      ticker: "?",
      name: "?"
    },
    amount: -1,
    from: tx.from as `0x${string}`,
    to: "0x" as `0x${string}`
  })

  useEffect(() => {
    const decodedData = iface.parseTransaction({ data: tx.data, value: tx.value });

    fetchToken({address: tx.to as `0x${string}`})
    .then((erc20) => {
      setReceipt((prevReceipt: Receipt): Receipt => {
        return { 
          ...prevReceipt,
          erc20: {
            ...prevReceipt.erc20,
            ticker: erc20.symbol,
            name: erc20.name
          },
          amount: decodedData.args[1].toNumber() / Math.pow(10, Number(erc20.decimals)),
          to: decodedData.args[0]
        }
      })
      if(tx.blockHash)
        return provider.getBlock(tx.blockHash)
    })
    .then((block) => {
      console.log(block?.timestamp)
      setReceipt((prevReceipt: Receipt): Receipt => {
        return {
          ...prevReceipt,
          timestamp: block?.timestamp
        }
      })
    })
    .catch((e) => console.log(e))

    setIsLoading(false)
  }, [tx])

  const otherPartieAddress = walletAccount.account.address === tx.from ? receipt.to : tx.from

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
            <Text css={{textAlign: 'right'}}>no. <Txid hash={tx.hash as `0x${string}`} /></Text>
            <Text css={{textAlign: 'right'}}>Date {receipt.timestamp}</Text>
            <Spacer y={0.5} />
            <Card.Divider />
            <Spacer y={2} />
            <Text h2 css={{textAlign: 'center'}}>{receipt.amount} {receipt.erc20.ticker}</Text>
            <Text>{receipt.erc20.name}</Text>
            <Spacer y={2} />
            <Text b>from {walletAccount.account.address === receipt.from && '(you)'}</Text>
            <a className='wallet-address' target='_blank' rel="noreferrer" href={`https://etherscan.io/address/${receipt.from}`}>{tx.from}</a>
            <Card.Divider />
            <Text b>
              to {walletAccount.account.address === receipt.to && '(you)'}
            </Text>
            <a className='wallet-address' target='_blank' rel="noreferrer" href={`https://etherscan.io/address/${receipt.to}`}>{receipt.to}</a>
            <UserInput amount={receipt.amount} onChange={onUserInputChange} />
          </Card.Body>
        </Card>
        <Spacer y={2} />
        <Button color="gradient" onPress={() => submit({txid: tx.hash as `0x${string}`, vat: vat, notes: notes})}>encrypt for {`${otherPartieAddress?.slice(0,10)}...${otherPartieAddress?.slice(-10,otherPartieAddress.length)}`}</Button>
        <Spacer y={2} />
      </Grid.Container>
  )
}
