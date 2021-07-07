import React from 'react'

import { Row, Col } from 'react-bootstrap'
import { ContactForm } from '../components'
import './MCComponent.scss'

const MCComponent = ({ item }) => {
  const {
    title,
    eventData: { media_url },
    points,
    disabled
  } = item

  return (
    <Row className="mc-main-row mb-3">
      <Col md="6" className="mc-image-section p-0">
        <div
          className="blurred"
          style={{
            backgroundImage: `url(${media_url})`
          }}
        ></div>
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
        <ContactForm disabled={disabled} handleSubmit={() => console.log('handleSubmit')} />
      </Col>
    </Row>
  )
}
export default MCComponent
