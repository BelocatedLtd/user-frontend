import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TaskNotificationBadge from './OngoingTaskNotification';
import { cn } from '../../../helpers';

type TSidebarItems = {
	item: {
		path: string;
		title: string;
		icon?: React.ReactNode;
		showBadge?: boolean; // Flag to indicate whether to show the notification badge
	};
	isOpen: boolean;
	isMobile?: boolean;
};

const SidebarItems = ({ item, isOpen, isMobile }: TSidebarItems) => {
	const pathname = usePathname();
	const isActive = pathname === item.path;

	const [showBadge, setShowBadge] = useState(item.showBadge);

	// Handle click to clear badge
	const handleBadgeClick = () => {
		setShowBadge(false); // Clear the badge
	};

	return (
		<Link href={item.path}>
			<div
				className={cn('sidebar-item flex flex-col items-center relative', {
					active: isActive,
				})}
				style={{
					padding: '16px 6px',
				}}
			>
				{/* Centered Icon */}
				<div className="flex justify-center items-center text-2xl text-gray-700 relative">
					{item.icon}
					{/* TaskNotificationBadge for items with showBadge flag */}
					{showBadge && item.showBadge && (
						<TaskNotificationBadge onClick={handleBadgeClick} />
					)}
				</div>
				{/* Title */}
				<div
					className={`text-xs text-gray-500 mt-1 text-center ${
						!isMobile && !isOpen ? 'hidden' : ''
					}`}
				>
					{item.title}
				</div>
			</div>
		</Link>
	);
};

export default SidebarItems;
