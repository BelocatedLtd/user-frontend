import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '../../../helpers'

type TSidebarItems = {
	item: {
		path: string
		title: string
		icon?: React.ReactNode
	}
	isOpen: boolean
}

const SidebarItems = ({ item, isOpen }: TSidebarItems) => {
	const router = useRouter()

	const pathname = usePathname()
	const isActive = pathname === item.path

	return (
		<Link href={item.path}>
			<div className={cn(isActive && 'active')}>
				<div className='sidebar-item'>
					<div className='sidebar-title'>
						<span>
							{item.icon && <div className='icon'>{item.icon}</div>}
							{isOpen && <div className=''>{item.title}</div>}
						</span>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default SidebarItems
