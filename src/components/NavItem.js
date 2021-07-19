import React from 'react'

const NavItem = ({ title, route, upper = false, onRedirect }) => (
	<div onClick={() => onRedirect(route)} className="nav-link art-nav-link ">
		{upper ? title.toUpperCase() : title}
	</div>
)

export default NavItem
