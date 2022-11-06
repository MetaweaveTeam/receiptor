import { Container } from '@nextui-org/react';
import { ethers } from 'ethers';
import { useState } from 'react';
import DebugBanner from '../../Components/DebugBanner';
import { PoR } from '../../types';
import './Index.css';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

export default function Init() {
  const [tx, setTx] = useState<ethers.providers.TransactionResponse>();
  const [por, setPor] = useState<PoR>();

  const goToStep2 = (tx: ethers.providers.TransactionResponse) => setTx(tx)
  const goToStep3 = (por: PoR) => setPor(por)

  return (<Container fluid>
    {process.env.NODE_ENV === "development" && <DebugBanner />}
    {!por && !tx && <Step1 submit={goToStep2} />}
    {!por && tx && <Step2 tx={tx} submit={goToStep3} />}
    {por && <Step3 por={por} />}
  </Container>);
}
