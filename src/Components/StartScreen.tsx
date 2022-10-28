import { Text, Dropdown, Input, Image, Grid, Checkbox, Spacer, Container, FormElement } from '@nextui-org/react';
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useConnectModal } from '@web3modal/react';
import { ethers } from 'ethers';
import './StartScreen.css';

const provider = new ethers.providers.InfuraProvider()

enum Status { pending = 'primary', error = 'error', ok = 'success' }

export default function StartScreen() {
  const [txid, setTxid] = useState("");
  const [txidStatus, setTxidStatus] = useState(Status.error);
  const [formIsValid, setFormIsValid] = useState(false);
  const formStatus = useRef({txid: false, tac: false})
  const walletConnect = useConnectModal()

  const updateFormStatus = () => setFormIsValid(formStatus.current.txid && formStatus.current.tac)

  const onChangeTxid = (txid: React.ChangeEvent<FormElement>) => {
    setTxid(txid.currentTarget.value);
    setTxidStatus(Status.pending);
    provider.getTransaction(txid.currentTarget.value)
    .then(value => {
      formStatus.current.txid = value ? true : false;
      setTxidStatus(value ? Status.ok : Status.error);
    })
    .catch((e: Error) => {
      console.debug(e.message);
      formStatus.current.txid = false;
      setTxidStatus(Status.error);
    })
    .finally(() => {
      updateFormStatus();
    })
  }
  const onActionNetwork = async (key: React.Key) => {
    if(key === "Other")
      window.open('https://arweave.net/TUFj7g7irqbaOv_XDxsM1BnWLZxWd7r2DBZeJPUTzIU', '_blank');
  }
  const onCheckTermsAndConditions = (isSelected: boolean) => {
    formStatus.current.tac = isSelected
    updateFormStatus();
  }

  return (<Container fluid>
    <Image height="10rem" src="https://arweave.net/iLd18mc2LrOuOdnimK6SnzPXedIidIgnQK4oBKZePhQ" alt="Receiptor's Logo" />
    <Text h1 style={{textAlign: 'center'}}>Receiptor</Text>
    <Text h3 style={{textAlign: 'center'}}>Create receipts from your crypto transactions.</Text>
    <Spacer y={2} />
    <Input
      status={txidStatus}
      onChange={onChangeTxid}
      value={txid}
      clearable
      bordered
      labelPlaceholder="txid"
      width='100%'
    />
    <Spacer y={0.5} />
    <Grid.Container gap={2}>
      <Grid xs={2} justify='center' alignItems='center'>
        <Text>Network: </Text>
      </Grid>
      <Grid xs>
        <Dropdown>
          <Dropdown.Button style={{width: '100%'}}>Ethereum mainnet</Dropdown.Button>
          <Dropdown.Menu aria-label="Static Actions" onAction={onActionNetwork}>
            <Dropdown.Item key="Ethereum mainnet">Ethereum mainnet</Dropdown.Item>
            <Dropdown.Item key="Other">Other</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
    </Grid.Container>
    <Grid.Container justify='center' alignItems='center' gap={2}>
      <Grid>
        <Checkbox onChange={onCheckTermsAndConditions}>
          <Text>
            I agree to the <a href="https://arweave.net/mI7jPDXWYFxA34OYyg8C14AW2QgNk2a-FjM67F66gxo" target='_blank' rel="noreferrer">terms and conditions</a>.
          </Text>
        </Checkbox>
      </Grid>
      <Grid>
        <button
          disabled={!formIsValid}
          onClick={walletConnect.open}
          style={!formIsValid ? {opacity: 0.2, cursor: 'not-allowed'} : {}}
          className={`wallet-connect-button ${walletConnect.isOpen && 'wallet-connect-button-connecting'}`}
        >
          <svg width="28" height="20" viewBox="0 0 28 20">
            <path fill={walletConnect.isOpen ? 'rgba(81,109,251,1)' : '#ffffff'} d="M7.386 6.482c3.653-3.576 9.575-3.576 13.228 0l.44.43a.451.451 0 0 1 0 .648L19.55 9.033a.237.237 0 0 1-.33 0l-.606-.592c-2.548-2.496-6.68-2.496-9.228 0l-.648.634a.237.237 0 0 1-.33 0L6.902 7.602a.451.451 0 0 1 0-.647l.483-.473Zm16.338 3.046 1.339 1.31a.451.451 0 0 1 0 .648l-6.035 5.909a.475.475 0 0 1-.662 0L14.083 13.2a.119.119 0 0 0-.166 0l-4.283 4.194a.475.475 0 0 1-.662 0l-6.035-5.91a.451.451 0 0 1 0-.647l1.338-1.31a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0Z"></path>
          </svg>
          {walletConnect.isOpen ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </Grid>
    </Grid.Container>
    <Spacer y={0.5} />
    <Grid.Container>
      <Grid xs={2} justify='center' alignItems='center'>
        <FontAwesomeIcon icon="circle-info" color="purple" size="2x" />
      </Grid>
      <Grid xs>
        <Text style={{textAlign: 'justify'}}>
          The wallet key you will connect with must be involved as one of the parties in the transaction referred by the transaction ID pasted on "txid".
        </Text>
      </Grid>
    </Grid.Container>
  </Container>);
}
