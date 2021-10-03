import React from 'react'
import { Col } from 'react-bootstrap'
import Icon from './Icon'
import { SocialIcons, Contacts, SocialLinks } from '../constants'

const handleSocialClick = (icon) => window.open(`${SocialLinks[icon]}`, '_blank')
const SocialIconsComponent = ({ size = '2x', tintColor, defaultColor }) => {
  return SocialIcons.map((icon) => (
    <Icon
      //
      key={icon}
      style={{ marginLeft: 10 }}
      onClick={() => handleSocialClick(icon)}
      defaultColor={defaultColor}
      icon={icon}
      size={size}
      tintColor={tintColor}
    />
  ))
}

export default SocialIconsComponent
