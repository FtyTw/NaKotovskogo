import React, { useRef, useState, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { useOnScroll, useOnBeforeUnload } from '../hooks'

const TransitionComponent = ({ children, style }) => {
  const padding = 100
  const opacity = 0.5
  const mainRef = useRef()
  const [mainPadding, setMainPadding] = useState(padding)
  const [mainOpacity, setMainOpacity] = useState(opacity)
  const classNumber = useMemo(() => Math.floor(Math.random() * 100), [children])

  const onScroll = () => {
    const { offsetTop } = mainRef.current
    const {
      scrollY,
      innerHeight,
      screen: { height: screenHeight }
    } = window
    const scrollingOver = scrollY + screenHeight >= offsetTop + padding

    if (scrollingOver) {
      setMainPadding(0)
      setMainOpacity(0.5 + padding / 200)
    } else {
      setMainPadding(padding)
      setMainOpacity(opacity)
    }
  }
  const beforeUnload = (event) => {
    window.scrollTo(0, 0)
  }

  useOnScroll(onScroll)
  useOnBeforeUnload(beforeUnload)

  return (
    <div
      style={{
        padding: mainPadding,
        opacity: mainOpacity,
        ...style
      }}
      ref={mainRef}
      className={`transition-component-${classNumber}`}
    >
      <span>{children}</span>
    </div>
  )
}

export default TransitionComponent
