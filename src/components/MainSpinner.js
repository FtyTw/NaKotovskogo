import React, { useRef, useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import logo from '../assets/images/logo.jpg'
import './MainSpinner.scss'

const MainSpinner = ({ hideSpinner }) => {
  const size = window.innerWidth
  const [opacity, setOpacity] = useState(1)
  const [intervalValue, setIntervalValue] = useState()
  const [degreesInterval, setDegreesInterval] = useState()
  const [degrees, setDegrees] = useState(0)
  const spinnerRef = useRef()
  const rotateDiv = (deg) => {
    const div = spinnerRef.current
    div.style.webkitTransform = 'rotate(' + deg + 'deg)'
    div.style.mozTransform = 'rotate(' + deg + 'deg)'
    div.style.msTransform = 'rotate(' + deg + 'deg)'
    div.style.oTransform = 'rotate(' + deg + 'deg)'
    div.style.transform = 'rotate(' + deg + 'deg)'
  }
  const changeOpacity = () => {
    const opacityInterval = setInterval(() => {
      setOpacity((prevOpacity) => {
        if (prevOpacity <= 0) {
          clearInterval(opacityInterval)
          clearInterval(degreesInterval)

          return
        }

        return (prevOpacity * 100 - 5) / 100
      })
    }, 50)
  }

  useEffect(() => {
    let degrees = 0
    const interval = setInterval(() => {
      degrees = (degrees + 10) % 360
      rotateDiv(degrees)
    }, 10)
    setDegreesInterval(interval)
  }, [])

  useEffect(() => {
    if (hideSpinner) {
      changeOpacity()
    }
  }, [hideSpinner])

  return opacity ? (
    <div className="main-spinner">
      <div
        className="main-spinner-container"
        style={{
          height: size * 0.4,
          width: size * 0.4,
          opacity
        }}
      >
        <div ref={spinnerRef} className="main-spinner-circling-dots">
          <div className="dots" style={{ top: 0 }} />
          <div className="dots" style={{ bottom: 0 }} />
        </div>
        <Image style={{ maxWidth: '80%', maxHeight: '80%' }} src={logo} roundedCircle />
      </div>
    </div>
  ) : null
}

export default MainSpinner
