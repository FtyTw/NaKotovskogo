import React, { useState, useEffect, Component, useRef, useLayoutEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Nav, Container, Row, Col, Image, Navbar } from 'react-bootstrap'
import NavItem from './NavItem'
import HeaderItems from '../constants/HeaderItems'
import logo from '../assets/images/logo.jpg'
import './Header.scss'

const Header = (props) => {
  const navRef = useRef(null)
  const imageRef = useRef(null)
  const [fixed, setFixed] = useState(false)
  const [headerTop, setHeaderTop] = useState(0)
  const [viewPadding, setViewPadding] = useState(0)
  const onScroll = (evt) => {
    const { height } = window.getComputedStyle(imageRef.current)
    setHeaderTop(parseInt(height))
    setFixed(window.scrollY >= parseInt(height))
  }
  const onLoadSetPadding = () => {
    const { height } = window.getComputedStyle(navRef.current)
    setViewPadding(parseInt(height))
  }
  const headerOnScrollStyles = {
    position: 'fixed',
    zIndex: 10001,
    backgroundColor: '#ffffff',
    opacity: 0.9
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
          <Navbar expand="lg">
            <Navbar.Brand href="/about" className="d-md-none header-brand-style">
              Арт-студия Котовского
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto" />
            <Navbar.Collapse id="basic-navbar-nav " className="justify-content-center">
              <Nav>
                {HeaderItems.map(({ title, route }) => (
                  <NavItem upper key={title} title={title} route={route} />
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
