import React, { useEffect, useState, useMemo, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import moment from 'moment'
import { AppContext } from '../contexts'
import { MCComponent } from '../components'
import { useDeviceDimensions } from '../hooks'
const currentMonth = moment().month() + 1
const today = Number(moment().format('D'))

const EventDay = ({ day, hasEvent, onClick, isMobile }) => {
  const disabled = useMemo(
    () => day < today && hasEvent,

    [day, hasEvent]
  )

  return (
    <div
      onClick={onClick}
      style={{
        //
        height: 100,
        border: '1px solid #50c3c2',
        width: isMobile ? '30%' : '10%',
        background: hasEvent ? '#50c3c2' : ' ',
        textAlign: 'right',
        padding: 10,
        fontSize: 20,
        borderRadius: 8,
        margin: 2,
        opacity: disabled ? 0.5 : 1,
        minWidth: 80
      }}
    >
      {day}
    </div>
  )
}
// #мастерклассодесса
const MasterClass = () => {
  const [daysArray, setDaysArray] = useState([])
  const { masterClasses: mcData, isReady } = useContext(AppContext)
  const [masterClasses, setMasterClasses] = useState(null)
  const [allMasterClasses, setAllMasterClasses] = useState(null)
  const isMobile = useDeviceDimensions()
  const setCalendar = () => {
    const daysInMonth = []
    for (let i = 0; i < moment().daysInMonth(); i++) {
      daysInMonth.push(i + 1)
    }
    setDaysArray(daysInMonth)
  }
  const handleInstagramMedia = () => {
    try {
      const mcsPrettified = mcData.reduce((acc, item) => {
        const [
          title,
          //
          date,
          level,
          forWho,
          price,
          description
        ] = item.caption.replace('\n\n', '\n').split('\n')

        const [realDate] = item.caption.match(/\d\d\.\d\d/g) ? item.caption.match(/\d\d\.\d\d/g) : [false]
        if (!realDate) return acc
        const [day, month] = realDate.split('.').map((i) => parseInt(i))

        const dayData = acc[day] ? acc[day] : []

        return currentMonth === month
          ? {
              ...acc,
              [day]: [
                ...dayData,
                {
                  title,
                  eventData: item,
                  points: [
                    title,
                    //
                    date,
                    level,
                    forWho,
                    price,
                    description
                  ]
                }
              ]
            }
          : acc
      }, {})
      if (mcsPrettified) {
        setAllMasterClasses(mcsPrettified)
      }

      const closestMcs = Object.keys(mcsPrettified).find((dayNumber) => +dayNumber > today)
      if (closestMcs) {
        setMasterClasses(mcsPrettified[closestMcs])
      }
    } catch (error) {
      console.log(error)
    }
  }
  const setMcsToOtherDay = (day) => allMasterClasses[day] && setMasterClasses(allMasterClasses[day])
  useEffect(() => {
    if (mcData?.length) {
      handleInstagramMedia(mcData)
      setCalendar()
    }
  }, [mcData])

  return (
    <Container>
      <Row className="flex-column-reverse flex-md-column align-center">
        {isReady &&
          masterClasses &&
          masterClasses.map((item, index) => {
            return (
              <Col md="12" key={item.eventData.id}>
                <MCComponent showSingle={masterClasses?.length === 1} item={item} positionInLine={index + 1} />
              </Col>
            )
          })}
        <Col
          md="12"
          className=" pb-3 pb-md-0 justify-content-center"
          style={{
            //
            marginTop: 50,
            maxWidth: '100%',
            display: 'flex',
            flexWrap: `${isMobile ? 'no' : ''}wrap`,
            cursor: 'pointer',
            overflowX: isMobile ? 'scroll' : 'auto'
          }}
        >
          {masterClasses &&
            daysArray.map((i, index) => (
              <EventDay isMobile={isMobile} key={index} day={i} hasEvent={allMasterClasses[i]} onClick={() => setMcsToOtherDay(i)} />
            ))}
        </Col>
      </Row>
    </Container>
  )
}

export default MasterClass
