import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Nav, Container, Row, Col, Fade, Collapse, Card, CardColumns, CardDeck, CardGroup, Carousel } from 'react-bootstrap'

import './About.scss'
import { CategoriesText } from '../constants/CategoriesText'
import { AboutUsCard, TransitionComponent, Icon } from '../components'
import { getInstagramData, getInstagramMedia } from '../services/instagram'

const getComputedStyles = (ref) => window.getComputedStyle(ref.current)

const InstaImage = ({ media_url, permalink, caption = '' }) => {
  const [url, setUrl] = useState(false)
  const [src, setSrc] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    if (media_url) {
      const image = new Image()
      image.src = media_url
      image.onload = () => {
        setUrl(media_url)
        setTimeout(() => {
          setSrc(media_url)
        }, 1000)
      }
    }
  }, [media_url])

  return (
    <div
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        window.open(permalink, '_blank')
      }}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        cursor: 'pointer'
      }}
      className="shadow"
    >
      {!media_url && (
        <Icon
          //
          prefix="fab"
          icon="instagram"
          size={'5x'}
          defaultColor="#C0C0C0"
          className="about-instagram-image"
          tintColor="#C0C0C0"
          style={{
            opacity: +!url
          }}
        />
      )}
    </div>
  )
}
const InstaMessagesContainer = ({ posts, index }) => {
  return (
    <div
      key={`instamessages-${index}`}
      style={{
        //
        width: '100%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      {posts.map((i, index) => {
        const { id, media_url, caption, permalink } = i

        return (
          <div style={{ width: '32%', height: '100%' }} key={`${media_url}-${index}`}>
            <InstaImage media_url={media_url} permalink={permalink} caption={caption} />
          </div>
        )
      })}
    </div>
  )
}
const About = () => {
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
      setInstaposts(posts)
    }, handleError)
    // }, handleError)
  }, [])

  return (
    <Container className="about">
      <Row>
        <Col md="12 mt-5">
          <Carousel slide={true} interval={1000000} controls style={{ width: '100%' }}>
            {instaPosts.map((posts, index) => {
              return (
                <Carousel.Item key={`posts-${index * 100}`} style={{ height: 400 }}>
                  <div className="d-flex flex-row h-100 justify-content-between">
                    <InstaMessagesContainer posts={posts} index={index} />
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
