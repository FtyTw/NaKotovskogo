import React, { useRef, useEffect } from 'react'
import { Nav, Container, Row, Col, Image, Fade, Collapse, Card, CardColumns, CardDeck, CardGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import { useImageSource } from '../hooks'
import './AboutUsCard.scss'

const AboutUsCard = ({ title, imgSrc, text, points }) => {
  const history = useHistory()
  const imageSrc = useImageSource(imgSrc)
  return (
    <Card className="about-us-card" onClick={() => history.push(`/directions/${imgSrc}`)} style={{ cursor: 'pointer' }}>
      <Card.Img style={{ padding: 20 }} variant="top" src={imageSrc} />
      <Card.Body
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default AboutUsCard
