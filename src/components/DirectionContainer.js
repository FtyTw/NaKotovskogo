import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import ContactForm from './ContactForm'
import Icon from './Icon'
import SmallCategories from './SmallCategories'
import { useImageSource, useDeviceDimensions } from '../hooks'
import { CategoriesText } from '../constants/CategoriesText'
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

const ControlButton = ({ onButtonClick, direction, isMobile }) => {
  return (
    <Col
      //
      className="small-categories-section-buttons"
      onClick={() => onButtonClick(direction)}
      style={{ transform: `rotate(${isMobile ? 270 : 0}deg)` }}
    >
      <Icon
        //
        prefix="fas"
        icon={`angle-${direction}`}
        size={'2x'}
        defaultColor="#50c3c2"
        tintColor="#D3D3D3"
      />
    </Col>
  )
}

const DirectionContainer = () => {
  const smallCategoriesRef = useRef()
  const { pathname } = useLocation()
  const prettifiedPath = useMemo(() => pathname && pathname.replace('/directions/', ''), [pathname])
  const { scrollHeight, scrollWidth, maxScroll } = useMemo(() => {
    if (!smallCategoriesRef || !smallCategoriesRef.current) {
      return { scrollHeight: 0, scrollWidth: 0, maxScroll: 0 }
    }
    const { children } = smallCategoriesRef.current
    const scrollHeight = parseInt(window.getComputedStyle(children[0], null).getPropertyValue('height'))
    const scrollWidth = parseInt(window.getComputedStyle(children[0], null).getPropertyValue('width'))

    return { scrollHeight, scrollWidth, maxScroll: children.length }
  }, [smallCategoriesRef.current])
  const isMobile = useDeviceDimensions()
  const data = useTemplateData(prettifiedPath)
  const imageSource = useImageSource(prettifiedPath)
  const handleSubmit = (e, data, title) => {
    e.preventDefault()
    console.log(data, title)

    return
  }

  const scrollToPosition = (negative) => {
    const param = isMobile ? 'scrollLeft' : 'scrollTop'
    const scrollValue = smallCategoriesRef.current[param]
    const scrollTo = isMobile ? scrollWidth : scrollHeight
    const scrollToValue = scrollTo * negative
    const finalValue = scrollValue + scrollToValue
    const step = (scrollTo / 10) * negative
    const maxScrollValue = scrollTo * maxScroll - scrollTo

    const interval = setInterval(() => {
      if (finalValue === smallCategoriesRef.current[param] || finalValue > maxScrollValue) {
        clearInterval(interval)
      }
      smallCategoriesRef.current[param] = smallCategoriesRef.current[param] + step
    }, 30)
  }

  const onButtonClick = (arg) => {
    try {
      const { scrollTop, scrollLeft } = smallCategoriesRef.current

      const params = isMobile ? [scrollLeft, scrollWidth] : [scrollTop, scrollHeight]
      const [from] = params
      if (arg === 'down') {
        scrollToPosition(1)
      }
      if (arg === 'up' && from > 0) {
        scrollToPosition(-1)
      }
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
          xs="10"
          sm="10"
          className="
          
           small-categories-section
           d-flex
           flex-row
           flex-md-column
           align-items-center
           justify-content-center 
            ml-auto
            mr-auto
           "
        >
          <ControlButton isMobile={isMobile} onButtonClick={onButtonClick} direction="up" />

          <div
            ref={smallCategoriesRef}
            className="
              small-categories
              d-flex
              flex-row 
              flex-md-column 
              p-0 m-0 
              align-items-center"
          >
            {CategoriesText.map(({ title, imgSrc }) => (
              <SmallCategories key={title} title={title} imgSrc={imgSrc} />
            ))}
          </div>

          <ControlButton isMobile={isMobile} onButtonClick={onButtonClick} direction="down" />
        </Col>
        {/*left side scrollbar*/}

        {/*picture and title section*/}
        <Col
          lg="5"
          md="8"
          xs="12"
          sm="12"
          className="d-flex flex-column text-center"
          style={{
            fontSize: 40
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
        <Col lg="4" md="12" xs="12" sm="12">
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            {data.points.map((point) => {
              return <div key={point}>{point}</div>
            })}
          </div>
          <div style={{ fontSize: 20 }}>{data.text}</div>
          <div style={{ fontSize: 20, fontWeight: 'bold' }}>*{data.markup}</div>
        </Col>

        <Col
          lg="6"
          md="8"
          xs="12"
          sm="12"
          className="ml-auto mr-md-auto mr-lg-0"
          style={{
            marginTop: 40
          }}
        >
          <ContactForm handleSubmit={(e, user) => handleSubmit(e, user, data.title)} />
        </Col>
      </>
    )
  )
}

export default DirectionContainer
