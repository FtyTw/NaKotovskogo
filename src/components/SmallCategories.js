import React from 'react'
import { Link } from 'react-router-dom'
import { useImageSource } from '../hooks'

const SmallCategories = ({ title, imgSrc }) => {
  const imageSource = useImageSource(imgSrc)

  return (
    <div
      className="small-categories-section-link-container"
      style={{
        backgroundImage: `url(${imageSource})`
      }}
    >
      <Link
        //
        to={imgSrc}
        className="small-categories-section-links"
      >
        {title}
      </Link>
    </div>
  )
}

export default SmallCategories
