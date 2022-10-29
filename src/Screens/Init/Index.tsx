import { Container } from '@nextui-org/react';
import { ethers } from 'ethers';
import { useState } from 'react';
import './Index.css';
import Step1 from './Step1';
import Step2 from './Step2';

export default function Init() {
  const [txid, setTxid] = useState<ethers.providers.TransactionResponse>();

  const goToStep2 = (txid: ethers.providers.TransactionResponse) => setTxid(txid)

  return (<Container fluid>
    {!txid && <Step1 submit={goToStep2} />}
    {txid && <Step2 txid={txid} />}
  </Container>);
}
