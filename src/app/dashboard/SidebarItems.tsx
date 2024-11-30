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
	isMobile?: boolean
}

const SidebarItems = ({ item, isOpen, isMobile }: TSidebarItems) => {
	const router = useRouter()

	const pathname = usePathname()
	const isActive = pathname === item.path

	return (
		<Link href={item.path}>
			<div className={cn(isActive && 'active')}>
				<div className='sidebar-item flex flex-col items-center'>
					<div className='icon'>{item.icon}</div>
					{/* Title displayed below the icon */}
					<div className={`title text-sm mt-1 ${!isMobile && !isOpen ? 'hidden' : ''}`}>
						{item.title}
					</div>
				</div>
			</div>
		</Link>
	)
}

export default SidebarItems
