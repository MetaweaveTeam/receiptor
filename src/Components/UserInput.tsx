import { Card, Col, Container, FormElement, Input, Link, Row, Spacer, Text } from "@nextui-org/react";
import { useState } from "react";
import { Receipt } from "../types";

const num = Intl.NumberFormat('en-US', {minimumFractionDigits: 2 })

export default function UserInput({receipt, onChange}: {receipt: Receipt, onChange: ({vat}: {vat: number}) => void}) {
  const [vat, setVat] = useState<number>(0)
  const [vatAmount, setVatAmount] = useState<number>(0)
  const [price, setPrice] = useState<number>(receipt.amount)

  const onChangeVAT = (vat: React.ChangeEvent<FormElement>) => {
    const vatRate = Number(vat.currentTarget.value)

    if(!isNaN(vatRate)){
      setPrice(receipt.amount - (receipt.amount * vatRate) / 100)
      setVatAmount((receipt.amount * vatRate) / 100)
      setVat(vatRate)
      onChange({vat: vatRate})
    }
  }
  
  return(<>
    <Container css={{textAlign: 'right'}}>
      <Spacer />
      <Row>
        <Col span={12}>
          <Link
            href={`https://etherscan.io/token/${receipt.erc20.id}`}
            target="_blank"
            style={{margin: 'auto'}}
            block
            isExternal
            color="primary"
          >
            {receipt.erc20.ticker} - {receipt.erc20.name}
          </Link>
        </Col>
      </Row>
      <Spacer />
      <Row>
        <Col>Price</Col>
        <Col>
          <Text b>
            {num.format(price)}
          </Text>
        </Col>
        <Col>VAT rate</Col>
      </Row>
      <Card.Divider />
      <Row gap={1}>
        <Col>VAT</Col>
        <Col>
          <Text b>
            {num.format(vatAmount)}
          </Text>
        </Col>
        <Col>
          <Input
            min="0"
            max="100"
            labelRight="%"
            onChange={onChangeVAT}
            value={vat}
            aria-label="vat"
            size="xs"
            type="number"
            fullWidth
            />
        </Col>
      </Row>
      <Card.Divider />
      <Row gap={1}>
        <Col>Total</Col>
        <Col>{num.format(receipt.amount)}</Col>
        <Col>
          <Input
            min="0"
            max="100"
            type="range"
            size="xs"
            aria-label="vat"
            value={vat}
            onChange={onChangeVAT}
            fullWidth
            />
        </Col>
      </Row>
    </Container>
  </>
  )
}