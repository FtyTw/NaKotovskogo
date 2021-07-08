import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Icon from './Icon'
// import NavItem from './NavItem'
// import HeaderItems from '../constants/HeaderItems'
import './BottomBar.scss'

const GoogleFrame = () => {
  return (
    <iframe
      className="google-frame"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d774.1451252995166!2d30.79668775920481!3d46.57042576524337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe21fab12bdb56384!2z0J7RgdGC0YDQvtCy0LA!5e0!3m2!1sru!2sua!4v1610306080934!5m2!1sru!2sua"
      allowFullScreen=""
      aria-hidden="false"
      tabIndex="0"
    ></iframe>
  )
}

const BottomBar = () => {
  const socialIcons = ['instagram', 'facebook', 'viber', 'telegram']
  const contacts = ['+38(068) 792 99 08 ', '+38(066) 665 36 01 ']
  const socialLinks = {
    viber: 'https://invite.viber.com/?g2=AQArEKuu1c2lzkwqkiFR1B4kEOZAX4HVuwz5v9WE95n04hZvVfNwS8IdJkRU%2FaEc',
    facebook: 'https://www.facebook.com/profile.php?id=100030937249979',
    instagram: 'https://www.instagram.com/art_studio_od/',
    telegram: 'https://t.me/artmast'
  }

  const handleSocialClick = (icon) => window.open(`${socialLinks[icon]}`, '_blank')

  return (
    <Container className="footer" fluid>
      <Row>
        <Col lg="4" xs="12" className="d-flex flex-column social-icons-section justify-content-center ">
          <div className="icons  justify-content-center  aling-items-center  ">
            {socialIcons.map((icon) => (
              <Icon
                //
                key={icon}
                style={{ marginLeft: 10 }}
                onClick={() => handleSocialClick(icon)}
                defaultColor="#fff"
                icon={icon}
                size={'2x'}
              />
            ))}
          </div>
          <div className="copyright d-flex justify-content-center ">Copyright Арт Студия на Котовского, 2018</div>
        </Col>
        <Col lg="4" xs="12" className="contacts-section d-flex flex-column justify-content-center aling-items-center">
          <div>Контакты:</div>
          {contacts.map((contact, index) => (
            <div key={contact + index}>{contact}</div>
          ))}
          <div>
            ЖК &quot;Острова&quot;,&nbsp;Марсельская, 40 <br />
            {/*(нажми, чтоб открыть карту)*/}
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
