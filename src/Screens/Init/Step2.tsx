import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import ABI from '../../ABI/usdt.json';
import './Index.css';
import {useToken, useAccount} from '@web3modal/react';
import { Button, Grid, Textarea, Text, Spacer, Input, FormElement } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PoR } from '../../types';

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

  const onChangeVAT = (vat: React.ChangeEvent<FormElement>) => {
    setVat(Number(vat.currentTarget.value))
  }

  const onChangeNotes = (notes: React.ChangeEvent<FormElement>) => {
    setNotes(notes.currentTarget.value)
  }

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
    : <Grid.Container justify='center' alignItems="center" alignContent="center" direction="column" gap={2}>
        <Grid xs={12} justify='space-between' alignItems="center" alignContent="center" direction="column">
          <FontAwesomeIcon icon="money-bill-transfer" size="3x" color="#00ff00" />
          <Spacer y={1} />
          <Text h3><FontAwesomeIcon icon="file-invoice-dollar" style={{paddingRight: '10px', color: '#D007E5'}}/> Transaction Receipt</Text>
        </Grid>
        <div className='txid'>
          <a target='_blank' rel="noreferrer" href={`https://etherscan.io/tx/${txid.hash}`}>{`${txid.hash.slice(0,15)}...${txid.hash.slice(-15,txid.hash.length)}`}</a>
        </div>
        <Text h1>
          {amount}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" width="45" height="45" style={{paddingLeft: '10px', paddingTop: '5px'}}><path d="M1000,0c552.26,0,1000,447.74,1000,1000S1552.24,2000,1000,2000,0,1552.38,0,1000,447.68,0,1000,0" fill="#53ae94"/><path d="M1123.42,866.76V718H1463.6V491.34H537.28V718H877.5V866.64C601,879.34,393.1,934.1,393.1,999.7s208,120.36,484.4,133.14v476.5h246V1132.8c276-12.74,483.48-67.46,483.48-133s-207.48-120.26-483.48-133m0,225.64v-0.12c-6.94.44-42.6,2.58-122,2.58-63.48,0-108.14-1.8-123.88-2.62v0.2C633.34,1081.66,451,1039.12,451,988.22S633.36,894.84,877.62,884V1050.1c16,1.1,61.76,3.8,124.92,3.8,75.86,0,114-3.16,121-3.8V884c243.8,10.86,425.72,53.44,425.72,104.16s-182,93.32-425.72,104.18" fill="#fff"/></svg>
        </Text>
        <h2><FontAwesomeIcon icon="share" size="xs" style={{paddingRight: '10px'}}/>from {walletAccount.account.address === txid.from && '(you)'}</h2>
        <a className='wallet-address' target='_blank' rel="noreferrer" href={`https://etherscan.io/address/${txid.from}`}>{txid.from}</a>
        <h2><FontAwesomeIcon icon="hand-holding-dollar" size="xs"  style={{paddingRight: '10px'}}/> to {walletAccount.account.address === destAddress && '(you)'}</h2>
        <a className='wallet-address' target='_blank' rel="noreferrer" href={`https://etherscan.io/address/${destAddress}`}>{destAddress}</a>
        <Spacer y={2} />
        <Textarea aria-label='notes' size="lg" value={notes} onChange={onChangeNotes} placeholder="Notes (optional)" css={{width: '100%', maxWidth: '570px'}}/>
        <Spacer y={2} />
        <Input required placeholder="VAT" value={vat.toString()} onChange={onChangeVAT} size="lg" type="number" fullWidth={true} css={{maxWidth: '570px'}} helperText="VAT %" label="VAT" labelRight="%" />
        <Spacer y={2} />
        <Button color="gradient" onPress={() => submit({txid: txid.hash as `0x${string}`, vat: vat, notes: notes})}>encrypt for {`${otherPartieAddress?.slice(0,10)}...${otherPartieAddress?.slice(-10,otherPartieAddress.length)}`}</Button>
      </Grid.Container>
  )
}
