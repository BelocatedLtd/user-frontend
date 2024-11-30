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
			<div className={cn('sidebar-item flex flex-col items-center', { active: isActive })}>
				{/* Icon */}
				<div className="icon text-2xl text-gray-700 text-center items-center">{item.icon}</div>
				{/* Title */}
				<div
					className={`title text-xs text-gray-500 mt-1 text-center ${
						!isMobile && !isOpen ? 'hidden' : ''
					}`}
				>
					{item.title}
				</div>
			</div>
		</Link>
	)
}

export default SidebarItems
