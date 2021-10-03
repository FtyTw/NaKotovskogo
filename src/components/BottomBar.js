import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

import GoogleFrame from './GoogleFrame'
import SocialIcons from './SocialIcons'
import { Contacts } from '../constants'
// import NavItem from './NavItem'
// import HeaderItems from '../constants/HeaderItems'
import './BottomBar.scss'

const BottomBar = () => {
  const location = useLocation()
  const [hide, setHide] = useState(0)

  useEffect(() => {
    setHide(location?.pathname.includes('contacts'))
  }, [location])

  return (
    <Container className={`footer ${hide ? 'd-none' : ''}`} fluid>
      <Row>
        <Col lg="4" xs="12" className="d-flex flex-column social-icons-section justify-content-center ">
          <div className="icons  justify-content-center  aling-items-center  ">
            <SocialIcons defaultColor={'#fff'} />
          </div>
          <div className="copyright d-flex justify-content-center ">Copyright Арт Студия на Котовского, 2018</div>
        </Col>
        <Col lg="4" xs="12" className="contacts-section d-flex flex-column justify-content-center aling-items-center">
          <div>Контакты:</div>
          {Contacts.map((contact, index) => (
            <div key={contact + index}>{contact}</div>
          ))}
          <div>
            ЖК &quot;Острова&quot;,&nbsp;Марсельская,&nbsp;40 <br />
          </div>
        </Col>
        <Col lg="4" xs="12" className="google-map d-flex justify-content-center ">
          <GoogleFrame />
        </Col>
      </Row>
    </Container>
  )
}
export default BottomBar
