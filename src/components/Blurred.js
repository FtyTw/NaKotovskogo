import React from 'react'

const Blurred = ({ url }) => {
  return (
    <div
      className="blurred"
      style={{
        backgroundImage: `url(${url})`
      }}
    ></div>
  )
}

export default Blurred
