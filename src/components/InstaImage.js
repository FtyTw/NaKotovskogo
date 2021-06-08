import React, { useEffect, useState, useMemo } from 'react'
import Icon from './Icon'
import './InstaImage.scss'
const InstaImage = ({ media_url, permalink, caption = '' }) => {
  const [url, setUrl] = useState(false)
  const [src, setSrc] = useState(false)
  const [text, setText] = useState('')
  const realCaption = useMemo(
    () => caption.replace('\n\n', '\n').split('\n')[0],

    [caption]
  )
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
      className="insta-image shadow"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        window.open(permalink, '_blank')
      }}
      style={{
        backgroundImage: `url(${src})`
      }}
    >
      {!media_url && (
        <Icon
          //
          prefix="fab"
          icon="instagram"
          size={'5x'}
          defaultColor="#C0C0C0"
          className="instagram-image"
          tintColor="#C0C0C0"
          style={{
            opacity: +!url
          }}
        />
      )}
      <div className="caption">{realCaption}</div>
    </div>
  )
}

export default InstaImage
