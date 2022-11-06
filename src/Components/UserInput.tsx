import { Col, Container, FormElement, Input, Row, Textarea } from "@nextui-org/react";
import { useState } from "react";

export default function UserInput({amount, onChange}: {amount: number | undefined, onChange: ({notes, vat}: {notes: string, vat: number}) => void}) {
  const [vat, setVat] = useState<number>(0)
  const [notes, setNotes] = useState("")

  const onChangeVAT = (vat: React.ChangeEvent<FormElement>) => {
    setVat(Number(vat.currentTarget.value))
    onChange({notes, vat: Number(vat.currentTarget.value)})
  }

  const onChangeNotes = (notes: React.ChangeEvent<FormElement>) => {
    setNotes(notes.currentTarget.value)
    onChange({notes: notes.currentTarget.value, vat})
  }

  return(<>
    <Textarea aria-label='notes' size="lg" value={notes} onChange={onChangeNotes} placeholder="Notes (optional)" css={{width: '100%'}}/>
    <Container>
      <Row>
        <Col>Price</Col>
        <Col>{amount}</Col>
        <Col>VAT rate</Col>
      </Row>
      <Row>
        <Col>VAT</Col>
        <Col>0</Col>
        <Col><Input labelRight="%" onChange={onChangeVAT} value={vat} aria-label="vat" size="xs" /></Col>
      </Row>
      <Row>
        <Col>Total</Col>
        <Col>50</Col>
        <Col>fds</Col>
      </Row>
    </Container>
  </>)
}