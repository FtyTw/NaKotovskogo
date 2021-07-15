import React, { useRef, useState, useEffect, useMemo, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import ContactForm from './ContactForm'
import Icon from './Icon'
import SmallCategories from './SmallCategories'
import { useImageSource, useDeviceDimensions } from '../hooks'
import { CategoriesText } from '../constants/CategoriesText'
import { sendEmail } from '../services/mail'
import { AppContext } from '../contexts'
import './DirectionContainer.scss'

const useTemplateData = (type) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    if (type) {
      const data = CategoriesText.filter(({ imgSrc }) => imgSrc === type)[0]
      setData(data)
    }
  }, [type])

  return data
}

const ControlButton = ({ onButtonClick, direction }) => {
  return (
    <div
      //
      className="small-categories-section-buttons"
      onClick={() => onButtonClick(direction)}
    >
      <Icon
        //
        prefix="fas"
        icon={`angle-${direction}`}
        size={'2x'}
        defaultColor="#50c3c2"
        tintColor="#D3D3D3"
      />
    </div>
  )
}

const DirectionContainer = () => {
  const smallCategoriesRef = useRef()
  const { pathname } = useLocation()
  const prettifiedPath = useMemo(() => pathname && pathname.replace('/directions/', ''), [pathname])
  const { setToast } = useContext(AppContext)
  const isMobile = useDeviceDimensions()
  const data = useTemplateData(prettifiedPath)
  const imageSource = useImageSource(prettifiedPath)

  const toastCallback = () => {
    setToast('Запрос отправлен, ожидайте звонка от нашего администратора :)')
  }
  const scrollToPosition = (negative, { scrollHeight, scrollWidth, correction }) => {
    const param = isMobile ? 'scrollLeft' : 'scrollTop'
    const scrollTo = isMobile ? scrollWidth : scrollHeight
    const step = ((scrollTo + correction) / 10) * negative
    let counter = 0
    const interval = setInterval(() => {
      counter++
      if (counter > 10) {
        clearInterval(interval)

        return
      }
      smallCategoriesRef.current[param] = smallCategoriesRef.current[param] + step
    }, 30)
  }

  const onButtonClick = (arg) => {
    const { width, height } = window.getComputedStyle(smallCategoriesRef.current)
    const { children } = smallCategoriesRef.current
    const { marginBottom } = window.getComputedStyle(children[0])
    const correction = parseInt(marginBottom, 10)

    const scrollHeight = parseInt(height, 10)
    const scrollWidth = parseInt(width, 10)
    const sizes = {
      scrollHeight,
      scrollWidth,
      correction
    }

    try {
      scrollToPosition(arg === 'down' ? 1 : -1, sizes)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    data && (
      <>
        {/*left side scrollbar*/}

        <Col
          lg="3"
          md="4"
          sm="10"
          xs="10"
          className="
           small-categories-section
           d-flex
           flex-row
           flex-md-column
           align-items-center
           "
        >
          <ControlButton onButtonClick={onButtonClick} direction="up" />
          <div
            ref={smallCategoriesRef}
            className="
              small-categories
              d-flex
              flex-row 
              flex-md-column 
             
              align-items-center"
          >
            {CategoriesText.map(({ title, imgSrc }) => (
              <SmallCategories key={title} title={title} imgSrc={imgSrc} />
            ))}
          </div>
          <ControlButton onButtonClick={onButtonClick} direction="down" />
        </Col>
        {/*left side scrollbar*/}
        <Col className="picture-text-form">
          <Row>
            {/*picture and title section*/}
            <Col
              lg="6"
              md="12"
              xs="12"
              sm="12"
              className="d-flex flex-column text-center mt-5 mt-lg-0 picture"
              style={{
                fontSize: 30
              }}
            >
              <span style={{ marginBottom: 20 }}>{data.title}</span>
              <img
                align="top"
                style={{
                  height: 400
                }}
                src={imageSource}
              />
            </Col>

            {/*picture and title section*/}

            <Col lg="6" md="12" xs="12" sm="12" className="text">
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                {data.points.map((point) => {
                  return <div key={point}>{point}</div>
                })}
              </div>
              <div style={{ fontSize: 17 }}>{data.text}</div>
              <div style={{ fontSize: 20, fontWeight: 'bold' }}>*{data.markup}</div>
            </Col>

            <Col
              lg="6"
              md="12"
              xs="12"
              sm="12"
              className="ml-auto mr-md-auto mr-lg-0 mb-lg-5 sign-form"
              style={{
                marginTop: 40
              }}
            >
              <ContactForm handleSubmit={(e, user) => sendEmail(e, user, data.title, toastCallback)} />
            </Col>
          </Row>
        </Col>
      </>
    )
  )
}

export default DirectionContainer
