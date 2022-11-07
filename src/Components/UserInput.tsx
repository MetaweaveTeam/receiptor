import { Card, Col, Container, FormElement, Input, Row, Spacer, Text } from "@nextui-org/react";
import { useState } from "react";

const num = Intl.NumberFormat('en-US', {minimumFractionDigits: 2 })

export default function UserInput({amount, onChange}: {amount: number, onChange: ({vat}: {vat: number}) => void}) {
  const [vat, setVat] = useState<number>(0)
  const [vatAmount, setVatAmount] = useState<number>(0)
  const [price, setPrice] = useState<number>(amount)

  const onChangeVAT = (vat: React.ChangeEvent<FormElement>) => {
    const vatRate = Number(vat.currentTarget.value)

    if(!isNaN(vatRate)){
      setPrice(amount - (amount * vatRate) / 100)
      setVatAmount((amount * vatRate) / 100)
      setVat(vatRate)
      onChange({vat: vatRate})
    }
  }
  
  return(
    <Container css={{textAlign: 'right'}}>
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
        <Col>{num.format(amount)}</Col>
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
  )
}