import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Contacts.scss'
import SocialIcons from '../components/SocialIcons'
import GoogleFrame from '../components/GoogleFrame'

const Contacts = () => {
  return (
    <Container className="contacts">
      <Row>
        <Col xs="6" lg="1" className="icons mt-3  flex-row flex-lg-column">
          <SocialIcons size={'3x'} />
        </Col>
        <Col lg="3" className="mt-4 pl-5">
          <h3>Контакты:</h3>
          <a href="tel:+380687929908" className="social">
            +38(068)&nbsp;792&nbsp;99&nbsp;08
          </a>
          <a href="tel:+380666653601" className="social">
            +38(066)&nbsp;665&nbsp;36&nbsp;01
          </a>
        </Col>
        <Col xs="12" lg="8" className="p-3">
          <GoogleFrame />
        </Col>
      </Row>
    </Container>
  )
}

export default Contacts
