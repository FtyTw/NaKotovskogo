import React from 'react'
import { Link } from 'react-router-dom'

const NavItem = ({ title, route, upper = false, onRedirect }) => (
  <Link onClick={onRedirect} className="nav-link art-nav-link " to={route}>
    {upper ? title.toUpperCase() : title}
  </Link>
)

export default NavItem
