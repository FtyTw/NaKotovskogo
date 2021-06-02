import React from 'react'
import { Link } from 'react-router-dom'

const NavItem = (props) => {
  const { title, route, upper = false } = props

  return (
    <Link className="nav-link art-nav-link " to={route}>
      {upper ? title.toUpperCase() : title}
    </Link>
  )
}

export default NavItem
