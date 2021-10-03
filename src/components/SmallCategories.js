import React from 'react'
import { useHistory } from 'react-router-dom'
import { useImageSource } from '../hooks'

const SmallCategories = ({ title, imgSrc }) => {
  const imageSource = useImageSource(imgSrc)
  const history = useHistory()

  return (
    <div className="small-categories-section-link-container">
      <div
        //
        onClick={() => history.push(imgSrc)}
        style={{
          backgroundImage: `url(${imageSource})`
        }}
        className="small-categories-section-links"
      >
        <div className="title">{title}</div>
      </div>
    </div>
  )
}

export default SmallCategories
