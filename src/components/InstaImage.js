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
      <Blurred url={media_url} />
      <div className="caption">{realCaption}</div>
      <img src={media_url} />
      <Icon
        //
        prefix="fab"
        icon="instagram"
        size={'5x'}
        defaultColor="#C0C0C0"
        className="instagram-image"
        tintColor="#C0C0C0"
        style={{
          opacity: 1
        }}
      />
    </div>
  )
}

export default InstaImage
