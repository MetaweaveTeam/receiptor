import { Text, Dropdown, Input, Image, Grid, Checkbox, Spacer, FormElement, Button, Card } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useConnectModal, useAccount, useDisconnect } from '@web3modal/react';
import { ethers } from 'ethers';
import ABI from '../../ABI/usdt.json';
import { provider } from '../../constants';
import './Index.css';

enum Status { pending = 'primary', error = 'error', ok = 'success' }

export default function Step1({ submit }: { submit: (txidValue: ethers.providers.TransactionResponse) => void }) {
  const [txidValue, setTxidValue] = useState<ethers.providers.TransactionResponse>();
  const [txid, setTxid] = useState("");
  const [txidPlaceholder, setTxidPlaceholder] = useState("txid");
  const [txidStatus, setTxidStatus] = useState(Status.error);
  const [formIsValid, setFormIsValid] = useState(false);
  const formStatus = useRef({txid: false, tac: false})
  const walletConnect = useConnectModal()
  const walletAccount = useAccount()
  const disconnect = useDisconnect()

  const updateFormStatus = () => setFormIsValid(formStatus.current.txid && formStatus.current.tac)

  useEffect(() => {
    if(walletAccount.account.isConnected && txidValue){
      const iface = new ethers.utils.Interface(ABI);
      let decodedData = iface.parseTransaction({ data: txidValue.data, value: txidValue.value });
      if(txidValue.from === walletAccount.account.address || decodedData.args[0] === walletAccount.account.address){
        setTxidPlaceholder("Okay!")
        setTxidStatus(Status.ok);
        formStatus.current.txid = true;
      }
      else{
        setTxidPlaceholder("Your wallet address is not part of this transaction")
        setTxidStatus(Status.error)
        formStatus.current.txid = false;
      }
      updateFormStatus();
    }
  }, [walletAccount.account.isConnected, walletAccount.account.address, txidValue])

  const onChangeTxid = (txid: React.ChangeEvent<FormElement>) => {
    setTxid(txid.currentTarget.value);
    setTxidStatus(Status.pending);
    setTxidPlaceholder("loading...");
    provider.getTransaction(txid.currentTarget.value)
    .then(value => {
      formStatus.current.txid = value ? true : false;
      setTxidStatus(value ? Status.ok : Status.error);
      setTxidPlaceholder(value ? 'valid transaction id' : 'invalid transaction id');
      setTxidValue(value)
    })
    .catch((e: Error) => {
      console.debug(e.message);
      formStatus.current.txid = false;
      setTxidStatus(Status.error);
      setTxidPlaceholder("invalid hash")
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

  return(<>
    <Card>
      <Card.Body>
        <Image height="10rem" src="https://arweave.net/iLd18mc2LrOuOdnimK6SnzPXedIidIgnQK4oBKZePhQ" alt="Receiptor's Logo" />
        <Text h1 style={{textAlign: 'center'}}>Receiptor.xyz</Text>
        <Text h3 style={{textAlign: 'center'}}>Create receipts from your crypto transactions.</Text>
      </Card.Body>
    </Card>
    <Spacer y={1} />
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
    <Spacer y={1} />
    <Card isHoverable>
      <Card.Body>
        <Spacer y={0.75} />
        <Input
          status={txidStatus}
          onChange={onChangeTxid}
          value={txid}
          clearable
          bordered
          labelPlaceholder={txidPlaceholder}
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
          <Grid justify='center'>
            {walletAccount.account.isConnected
            ? <>
                <Grid className='wallet-address'>
                  <a className='mobile_wallet' href="https://rainbow.me/0xeEEe8f7922E99ce6CEd5Cb2DaEdA5FE80Df7C95e" target="_blank" rel="noreferrer">
                    {`${walletAccount.account.address.slice(0, 6)}...${walletAccount.account.address.slice(-4)}`}
                  </a>
                  <a className='wallet' href="https://rainbow.me/0xeEEe8f7922E99ce6CEd5Cb2DaEdA5FE80Df7C95e" target="_blank" rel="noreferrer">
                    {walletAccount.account.address}
                  </a>
                </Grid>
                <Grid.Container justify='center' style={{marginLeft: 'auto', marginRight: 'auto', padding: '4px'}}>
                  <Button color="error" onClick={disconnect} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '5px', marginBottom: '5px'}}>disconnect</Button>
                  <Button disabled={!formIsValid} color="gradient" onPress={() => txidValue && submit(txidValue)} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '5px', marginBottom: '5px'}}>continue</Button>
                </Grid.Container>
              </>
            : <button
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
            }
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  </>)
}
