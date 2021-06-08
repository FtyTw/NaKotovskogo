import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Nav, Container, Row, Col, Fade, Collapse, Card, CardColumns, CardDeck, CardGroup, Carousel } from 'react-bootstrap'

import './About.scss'
import { CategoriesText } from '../constants/CategoriesText'
import { AboutUsCard, TransitionComponent, Icon, InstaMessagesContainer } from '../components'
import { getInstagramData, getInstagramMedia } from '../services/instagram'
import { useDeviceDimensions } from '../hooks'

const getComputedStyles = (ref) => window.getComputedStyle(ref.current)

const About = () => {
  const isMobile = useDeviceDimensions()
  const myCarousel = useRef()
  const [instaPosts, setInstaposts] = useState([
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3]
  ])
  const [scrollValue, setScrollValue] = useState(0)
  const colors = ['lightblue', 'red', 'green', 'blue', 'yellow', 'purple']
  const loadMorePosts = () => {
    const instaposts = [...instaPosts]
    instaposts.push(instaPosts.length)
    setInstaposts(instaposts)
    scrollCarousel('increment')
  }
  const scrollCarousel = (direction) => {
    const { width } = getComputedStyles(myCarousel)
    const initialChildCountWidth = Math.floor(parseInt(width) / 3)
    const leftToScroll = scrollValue % initialChildCountWidth

    const scrollTo = direction
      ? scrollValue + (initialChildCountWidth - leftToScroll)
      : scrollValue - (leftToScroll || initialChildCountWidth)
    let initialValue = myCarousel.current.scrollLeft
    const interval = setInterval(() => {
      myCarousel.current.scrollLeft = scrollTo
      clearInterval(interval)
    }, 50)
  }

  const onCarouselScroll = (e) => {
    setScrollValue(myCarousel.current.scrollLeft)
  }
  const scrollLess = () => scrollCarousel()
  const handleError = (error) => console.log(String(error))
  useEffect(() => {
    // getInstagramData().then((response) => {
    getInstagramMedia({ limit: 9 }).then((response) => {
      const posts = response.data.data.reduce((accumulator, item, index, array) => {
        if ((index + 1) % 3 === 0) {
          accumulator.push(array.slice(index - 2, index + 1))
        }

        return accumulator
      }, [])
      setInstaposts(isMobile ? posts.flat() : posts)
    }, handleError)
    // }, handleError)
  }, [])

  return (
    <Container className="about">
      <Row>
        <Col md="12" className="mt-5">
          <Carousel slide={true} interval={1000000} controls style={{ width: '100%' }}>
            {instaPosts.map((posts, index) => {
              return (
                <Carousel.Item key={`posts-${index * 100}`} style={{ height: 400 }}>
                  <div className="d-flex flex-row h-100 justify-content-between">
                    <InstaMessagesContainer posts={posts} index={index} isMobile={isMobile} />
                  </div>
                </Carousel.Item>
              )
            })}
          </Carousel>
        </Col>
        <Col md="12" className="mb-5 mt-5">
          <div className="about-us-main-text ">
            Арт-студия на Котовского - мир творчества и вдохновения для детей и взрослых! Под руководством наших опытных
            художников-педагогов Вы получите реальные творческие навыки рисования в разных техниках, создадите свои произведения искусства и
            прекрасно отдохнете! Не важно, какой уровень и возраст ученика — рисовать умеет каждый, а мы помогаем раскрывать и
            совершенствовать эти умениия!
          </div>
        </Col>

        <TransitionComponent>
          <Col
            style={{
              maxWidth: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              marginBottom: 50
            }}
          >
            <CardColumns>
              {CategoriesText.map(({ title, imgSrc, text, points }, index) => {
                const cardProps = {
                  title,
                  imgSrc,
                  text,
                  points
                }
                // src={sourceSetter(imgSrc)}

                return <AboutUsCard {...cardProps} key={title} />
              })}
            </CardColumns>
          </Col>
        </TransitionComponent>
      </Row>
    </Container>
  )
}

export default About
