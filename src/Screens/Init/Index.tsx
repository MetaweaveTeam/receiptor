import { Container } from '@nextui-org/react';
import { ethers } from 'ethers';
import { useState } from 'react';
import { PoR } from '../../types';
import './Index.css';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

export default function Init() {
  const [txid, setTxid] = useState<ethers.providers.TransactionResponse>();
  const [por, setPor] = useState<PoR>();

  const goToStep2 = (txid: ethers.providers.TransactionResponse) => setTxid(txid)
  const goToStep3 = (por: PoR) => setPor(por)

  return (<Container fluid>
    <div style={{backgroundColor: 'red', color: 'white'}}>Apology, we couldn't finish everything we wanted to do on time. Although the final version should work for any type of tx involving Stablecoins, this MVP is working only with USDT transaction from wallet to wallet. Sorry for the inconvenience.</div>
    {!por && !txid && <Step1 submit={goToStep2} />}
    {!por && txid && <Step2 txid={txid} submit={goToStep3} />}
    {por && <Step3 por={por} />}
  </Container>);
}
