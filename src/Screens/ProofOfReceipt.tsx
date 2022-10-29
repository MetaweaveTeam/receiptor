import { Container, Grid, Image, Spacer, Text } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import './ProofOfReceipt.css';

export default function ProofOfReceipt() {
  const { ar_txid } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ar_txid && /^([a-z,A-Z,0-9,\-,_]{43})$/.test(ar_txid)) {
      fetch(`http://localhost:3001/${ar_txid}`)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(JSON.stringify(result));
          },

          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          // https://reactjs.org/docs/faq-ajax.html
          (error) => {
            setError(error.message);
          }
        ).finally(() => {
          setLoading(false);
        });
    } else {
      console.log('HIIII');
      setError("Invalid arweave transaction id");
      setLoading(false);
    }
  }, [ar_txid]);

  const Loading = () => <>
    <Spacer y={4} />
    <Grid.Container justify="center">
      <Grid xs={12} justify="center">
      <span className="loader"></span>
      </Grid>
    </Grid.Container>
  </>

  const Error = (props: {error: String}) => <>
    <Spacer y={4} />
    <div style={{textAlign: 'center'}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="red" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
      <Text h3 style={{textAlign: 'center'}}>{props.error}</Text>
    </div>
  </>

  const Success = () => <>
    <div>
      Success
    </div>
  </>

  return(<Container fluid>
    <Spacer y={2} />
    <Image height="10rem" src="https://arweave.net/iLd18mc2LrOuOdnimK6SnzPXedIidIgnQK4oBKZePhQ" alt="Receiptor's Logo" />
    <Text h1 style={{textAlign: 'center'}}>Receiptor.xyz</Text>
    <Text h3 style={{textAlign: 'center'}}>Create receipts from your crypto transactions.</Text>
    {loading
      ? <Loading />
      : error
      ? <Error error={error} />
      : <Success />
    }
  </Container>)
}
