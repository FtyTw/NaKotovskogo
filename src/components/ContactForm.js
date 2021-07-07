import React, { useState, useReducer } from 'react'
import { Button, Form } from 'react-bootstrap'
import './ContactForm.scss'
const initialState = {
  //
  name: '',
  phone: '',
  email: '',
  nameInvalid: false,
  phoneInvalid: false
}

const reducer = (state, { type, payload } = {}) => (!!type ? { ...state, [type]: payload } : initialState)

const ContactForm = ({ handleSubmit }) => {
  const [validated] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)

  const onHandleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const nameIsEmpty = !state.name.replace(/\s/g, '').length
    const nameNotValid = !state.name || nameIsEmpty
    const phoneNotANumber = !(!!state.phone && state.phone.match(/[+()\d]/g))
    const numberNotValid = !state.phone || phoneNotANumber
    dispatch({ type: `nameInvalid`, payload: nameNotValid })
    dispatch({ type: `phoneInvalid`, payload: numberNotValid })
    if (nameNotValid || numberNotValid) {
      return
    }

    handleSubmit(e, state)
    dispatch()
  }

  const onChange = (e) => {
    const {
      target: { name: type, value: payload }
    } = e
    dispatch({ type, payload })
  }

  return (
    <Form noValidate validated={validated} onSubmit={onHandleSubmit}>
      <Form.Group className="directions-form" controlId="formGridName">
        <Form.Control
          isInvalid={state.nameInvalid}
          required
          onChange={onChange}
          value={state.name}
          name="name"
          type="text"
          placeholder="Имя *"
        />

        <Form.Control.Feedback type="invalid">
          <strong> Имя не может быть пустым</strong>
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="directions-form" controlId="formGridPhone">
        <Form.Control
          isInvalid={state.phoneInvalid}
          required
          onChange={onChange}
          value={state.phone}
          type="text"
          name="phone"
          placeholder="Телефон *"
        />
        <Form.Control.Feedback type="invalid">
          <strong>{!state.phone ? 'Телефонный номер не может быть пустым' : 'Телефонный номер должен состоять из цифр'}</strong>
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="directions-form">
        <Form.Control onChange={onChange} value={state.email} as="textarea" name="email" placeholder="E-mail" rows={3} />
        <Button
          //
          className="d-block ml-auto mr-auto"
          style={{ marginTop: 20 }}
          variant="outline-info"
          type="submit"
        >
          Запись
        </Button>
      </Form.Group>
    </Form>
  )
}

export default ContactForm
