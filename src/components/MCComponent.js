import React, { useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
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

  const toastCallback = () => {
    setToast('Запрос отправлен, ожидайте звонка от нашего администратора :)')
  }

  return (
    <Row className="mc-main-row mb-3">
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
          {points.map((item) => item !== title && <div key={item}>{item}</div>)}
        </div>
      </Col>

      <Col md="6" className="ml-md-auto mt-5">
        <ContactForm disabled={disabled} handleSubmit={(e, data) => sendEmail(e, data, title, toastCallback)} />
      </Col>
    </Row>
  )
}
export default MCComponent
