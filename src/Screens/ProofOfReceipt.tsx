import { Container, Image, Text } from "@nextui-org/react";
import { useParams } from "react-router-dom";

export default function ProofOfReceipt() {
  const { ar_txid } = useParams();

  return(<Container fluid>
    <Image height="10rem" src="https://arweave.net/iLd18mc2LrOuOdnimK6SnzPXedIidIgnQK4oBKZePhQ" alt="Receiptor's Logo" />
    <Text h1 style={{textAlign: 'center'}}>Receiptor.xyz</Text>
    <Text h3 style={{textAlign: 'center'}}>Create receipts from your crypto transactions.</Text>
    ar_txid: {ar_txid}
  </Container>)
}