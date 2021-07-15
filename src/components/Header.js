import React, { useState, useRef, useLayoutEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Nav, Container, Row, Col, Image, Navbar } from 'react-bootstrap'
import NavItem from './NavItem'
import HeaderItems from '../constants/HeaderItems'
import logo from '../assets/images/logo.jpg'
import './Header.scss'

const Header = () => {
  const history = useHistory()
  const [expanded, setExpanded] = useState(false)

  const navRef = useRef(null)
  const imageRef = useRef(null)
  const [fixed, setFixed] = useState(false)
  const [viewPadding, setViewPadding] = useState(0)
  const onScroll = () => {
    const { height } = window.getComputedStyle(imageRef.current)
    setFixed(window.scrollY >= parseInt(height))
    setExpanded(false)
  }
  const onLoadSetPadding = () => {
    //to do check the padding value
    const { height } = window.getComputedStyle(navRef.current)

    const parsedHeight = parseInt(height)
    setViewPadding(isNaN(parsedHeight) ? 0 : parsedHeight)
  }
  const headerOnScrollStyles = {
    position: 'fixed',
    zIndex: 10001,
    backgroundColor: '#ffffff',
    opacity: 0.9
  }
  const onBrandNameClick = (e) => {
    e.stopPropagation()
    setExpanded(false)
    history.push('/about')
  }

  useLayoutEffect(() => {
    onLoadSetPadding()
    window.addEventListener('scroll', onScroll, true)

    return window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Container className="header" fluid style={{ paddingBottom: fixed ? viewPadding : 0 }}>
      <Row>
        <Col md={12} className="d-flex justify-content-center" ref={imageRef}>
          <Col xs={6} md={4}>
            <NavLink className="nav-link art-nav-link " to="/about">
              <Image width="100%" height="100%" src={logo} rounded />
            </NavLink>
          </Col>
        </Col>
        <Col ref={navRef} style={fixed ? headerOnScrollStyles : null}>
          <Navbar collapseOnSelect expanded={expanded} expand="lg" className="p-0">
            <Navbar.Brand className="d-lg-none header-brand-style  d-flex justify-content-space-between w-100 mr-0">
              <span onClick={onBrandNameClick} className="brand-name">
                {' '}
                Арт-студия Котовского
              </span>
              <Navbar.Toggle onClick={() => setExpanded((expanded) => !expanded)} aria-controls="basic-navbar-nav" className="ml-auto" />
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav " className="justify-content-center">
              <Nav>
                {HeaderItems.map(({ title, route }) => (
                  <NavItem
                    upper
                    key={title}
                    title={title}
                    route={route}
                    onRedirect={() => {
                      setExpanded(false)
                    }}
                  />
                ))}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
  )
}

export default Header
