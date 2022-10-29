import { Container, Grid, Image, Spacer, Text } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ProofOfReceipt.css';
import { ArTransaction } from '../types';

export default function ProofOfReceipt() {
  const { ar_txid } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [tx, setTX] = useState<ArTransaction>();

  useEffect(() => {
    if (ar_txid && /^([a-z,A-Z,0-9,\-,_]{43})$/.test(ar_txid)) {
      fetch(`http://localhost:3001/${ar_txid}`)
        .then(res => res.json())
        .then(
          (result: ArTransaction) => {
            setTX(result);
          },

          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          // https://reactjs.org/docs/faq-ajax.html
          (error) => {
            setError(error.message);
          }
        ).finally(() => {
          // setLoading(false);
        });
    } else {
      setError("Invalid arweave transaction id");
      // setLoading(false);
    }
  }, [ar_txid]);

  const Loading = (props: {txid: String}) => {
    let txid = `${props.txid.slice(0,10)}...${props.txid.slice(-10,props.txid.length)}`;
    return (<>
      <Spacer y={4} />
      <Grid.Container justify="center">
        <Grid xs={12} justify="center">
          <span className="loader"></span>
        </Grid>
        <Spacer y={2} />
        <Grid xs={12} justify="center">
          <Text h4 className="loader_title">Retrieving Proof-of-Receipt</Text>
        </Grid>
        <Grid xs={12} justify="center">
          <Text h3>{txid}</Text>
        </Grid>
        <Spacer y={1} />
        <Grid xs={12} justify="center">
          <svg id="Layer_1" height="100" width="100" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 133.06 133.06">
            <path className="cls-1" d="M77.61,91.53a10.57,10.57,0,0,1-.78-2.11,24.72,24.72,0,0,1-.55-2.52,16.49,16.49,0,0,1-2.43,2.15,16.79,16.79,0,0,1-3,1.77A18.35,18.35,0,0,1,67.11,92a20.55,20.55,0,0,1-4.35.44,21.44,21.44,0,0,1-7-1.1,16.56,16.56,0,0,1-5.47-3.08,13.73,13.73,0,0,1-4.86-10.63q0-7.83,5.84-12.11t17.44-4.29h7.1V58.31a7.2,7.2,0,0,0-2.34-5.66c-1.55-1.39-3.8-2.08-6.73-2.08-2.6,0-4.49.55-5.68,1.67a5.79,5.79,0,0,0-1.79,4.47H46.54a13.49,13.49,0,0,1,1.4-6,14.64,14.64,0,0,1,4.08-5,20.29,20.29,0,0,1,6.55-3.41A28.57,28.57,0,0,1,67.43,41a30.64,30.64,0,0,1,8.37,1.1,20.08,20.08,0,0,1,6.71,3.26A14.9,14.9,0,0,1,87,50.82a17,17,0,0,1,1.61,7.58V79.66a36.34,36.34,0,0,0,.5,6.6,17,17,0,0,0,1.47,4.49v.78ZM65.46,82.59A13.55,13.55,0,0,0,69,82.14a14.05,14.05,0,0,0,3-1.2,10.24,10.24,0,0,0,2.29-1.67,8.79,8.79,0,0,0,1.51-1.9V68.85H69.31a19.66,19.66,0,0,0-5.08.57A9.81,9.81,0,0,0,60.79,71a6.43,6.43,0,0,0-2,2.48,7.6,7.6,0,0,0-.64,3.14A5.58,5.58,0,0,0,60,80.9Q61.81,82.6,65.46,82.59Z" transform="translate(-0.79 -1.52)"/>
            <circle className="cls-2" cx="66.53" cy="66.53" r="61.7"/>
          </svg>
        </Grid>
      </Grid.Container>
    </>);
  }


  const Error = (props: {error: String}) => <>
    <Spacer y={4} />
    <div style={{textAlign: 'center'}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="red" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
      <Text h3 style={{textAlign: 'center'}}>{props.error}</Text>
    </div>
  </>

  const Success = (props: {tx: ArTransaction}) => {
    const tx = props.tx;
    console.log(tx);
    var format = tx.format,
        id = tx.id,
        last_tx = tx.last_tx,
        owner = tx.owner,
        tags = tx.tags,
        target = tx.target,
        quantity = tx.quantity,
        data_root = tx.data_root,
        data = tx.data,
        data_size = tx.data_size,
        reward = tx.reward,
        signature = tx.signature;
    return (<>
      <div>
        <Text h3>Proof-of-Receipt</Text>
        <Spacer y={2} />
        <Text h4>Transaction ID</Text>
        <Text>{id}</Text>
        <Spacer y={2} />
        <Text h4>Owner</Text>
        <Text>{owner}</Text>
        <Spacer y={2} />
        <Text h4>Target</Text>
        <Text>{target}</Text>
        <Spacer y={2} />
        <Text h4>Quantity</Text>
        <Text>{quantity}</Text>
        <Spacer y={2} />
        <Text h4>Data</Text>
        <Text>{data}</Text>
        <Spacer y={2} />
        <Text h4>Data Size</Text>
        <Text>{data_size}</Text>
        <Spacer y={2} />
        <Text h4>Data Root</Text>
        <Text>{data_root}</Text>
        <Spacer y={2} />
        <Text h4>Reward</Text>
        <Text>{reward}</Text>
        <Spacer y={2} />
        <Text h4>Signature</Text>
        <Text>{signature}</Text>
        <Spacer y={2} />
        <Text h4>Last Transaction</Text>
        <Text>{last_tx}</Text>
      </div>
    </>);
  };

  return(<Container fluid>
    <Spacer y={2} />
    <Image height="10rem" src="https://arweave.net/iLd18mc2LrOuOdnimK6SnzPXedIidIgnQK4oBKZePhQ" alt="Receiptor's Logo" />
    <Text h1 style={{textAlign: 'center'}}>Receiptor.xyz</Text>
    <Text h3 style={{textAlign: 'center'}}>Create receipts from your crypto transactions.</Text>
    {loading
      ? <Loading txid={ar_txid ? ar_txid : ''} />
      : error
      ? <Error error={error} />
      : tx
      ? <Success tx={tx} />
      : ''
    }
  </Container>)
}
