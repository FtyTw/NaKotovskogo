import React, { useContext, useState } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import { ContactForm, Blurred } from '../components'
import { sendEmail } from '../services/mail'
import { AppContext } from '../contexts'
import './MCComponent.scss'

const MCComponent = ({ item }) => {
  const {
    title,
    eventData: { media_url },
    points,
    disabled
  } = item

  const { setToast } = useContext(AppContext)
  const [showAlert, setShowAlert] = useState(disabled)
  const toastCallback = () => {
    setToast('Запрос отправлен, ожидайте звонка от нашего администратора :)')
  }

  return (
    <Row className="mc-main-row mb-5">
      <Col md="6" className="mc-image-section p-0">
        <Blurred url={media_url} />
        <img className="mc-image" src={media_url} />
      </Col>
      <Col md="6" className="mc-points">
        <div className="mc-splitter d-none d-md-block" />
        <div className="text p-0 pl-md-5 pr-md-5 pt-md-1">
          <div
            style={{
              fontWeight: 'bold',
              marginBottom: 20,
              textAlign: 'center'
            }}
          >
            {title}
          </div>
          {points.map((item, index) => item !== title && <div key={`${item}-${index}`}>{item}</div>)}
        </div>
      </Col>
      <Col md="6" className="ml-md-auto mt-5">
        {showAlert && (
          <Alert variant="warning" dismissible className="pr-3 pl-3" onClose={() => setShowAlert(false)}>
            <Alert.Heading>ВНИМАНИЕ!</Alert.Heading>
            <div className="mc-alert">
              Событие завершено, но вы можете выслать свои данные через эту форму и мы оповестим Вас, когда оно будет проходить снова. :)
            </div>
          </Alert>
        )}
        <ContactForm handleSubmit={(e, data) => sendEmail(e, data, title, toastCallback)} />
      </Col>
    </Row>
  )
}
export default MCComponent
