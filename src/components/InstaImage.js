import React, { useMemo } from 'react'
import Icon from './Icon'
import Blurred from './Blurred'
import './InstaImage.scss'

const InstaImage = ({ media_url, permalink, caption = '' }) => {
  const realCaption = useMemo(
    () => caption.replace('\n\n', '\n').split('\n')[0],

    [caption]
  )

  return (
    <div
      className="insta-image shadow"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        window.open(permalink, '_blank')
      }}
    >
      <Blurred url={media_url}></Blurred>
      <img src={media_url} />
      <div className="wrapper">
        <Icon
          //
          prefix="fab"
          icon="instagram"
          size={'2x'}
          defaultColor="#fff"
          className="instagram-image"
          tintColor="#C0C0C0"
          style={{
            opacity: 1
          }}
        />
      </div>
      <div className="caption">
        <div>
          <Icon
            //
            prefix="fab"
            icon="instagram"
            size={'5x'}
            defaultColor="#fff"
            className="instagram-image"
            tintColor="#C0C0C0"
            style={{
              opacity: 1
            }}
          />
        </div>
        <div>{realCaption}</div>
      </div>
    </div>
  )
}

export default InstaImage
