import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Icon = ({
  //
  size,
  icon = 'cross',
  tintColor = '#50c3c2',
  style,
  className,
  prefix = 'fab',
  defaultColor = '#000',
  onClick = () => console.log('icon on click')
}) => {
  const [color, setColor] = useState(defaultColor)

  return (
    <span
      //
      style={style}
      className={className}
      onMouseOver={() => setColor(tintColor)}
      onMouseLeave={() => setColor(defaultColor)}
      onClick={onClick}
    >
      <FontAwesomeIcon
        //
        icon={[prefix, icon]}
        color={color}
        size={size}
      />
    </span>
  )
}

export default Icon
