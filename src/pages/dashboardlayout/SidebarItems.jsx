import React from 'react'
import { NavLink } from 'react-router-dom'

const activelink = ({ isActive }) => (isActive ? 'active' : 'sidelink')
const activeSublink = ({ isActive }) => (isActive ? 'active' : 'sidelink')

const SidebarItems = ({ item, isOpen }) => {
	return (
		<NavLink to={item.path} className={activelink}>
			<div className='sidebar-item .s-parent'>
				<div className='sidebar-title'>
					<span>
						{item.icon && <div className='icon'>{item.icon}</div>}
						{isOpen && <div className=''>{item.title}</div>}
					</span>
				</div>
			</div>
		</NavLink>
	)
}

export default SidebarItems
