import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { io } from 'socket.io-client';
import { BACKEND_URL } from '@/utils/globalConfig';
import { cn } from '../../../helpers';

type TSidebarItems = {
	item: {
		path: string;
		title: string;
		icon?: React.ReactNode;
		showBadge?: boolean; // Flag to enable badge
	};
	isOpen: boolean;
	isMobile?: boolean;
};

const socket = io(`${BACKEND_URL}`);

const SidebarItems = ({ item, isOpen, isMobile }: TSidebarItems) => {
	const pathname = usePathname();
	const isActive = pathname === item.path;
const notificationKey = 'taskBadgeAcknowledged';

	 const [showBadge, setShowBadge] = useState(false);

	useEffect(() => {
    const isAcknowledged = localStorage.getItem(notificationKey);
    setShowBadge(!isAcknowledged);

    socket.on('taskNotification', (data) => {
        if (!showBadge) {
            setShowBadge(true);
            localStorage.removeItem(notificationKey); // Reset acknowledgment status
        }
    });

    // Cleanup on unmount
    return () => {
        socket.off('taskNotification');
        // If you manage socket lifecycle here, uncomment:
        // socket.disconnect();
    };
}, []);

const handleBadgeClick = () => {
    setShowBadge(false);
    localStorage.setItem(notificationKey, 'true'); // Mark as acknowledged
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
				{/* Icon */}
				<div
					className="flex justify-center items-center text-2xl text-gray-700 relative"
					onClick={handleBadgeClick}
				>
					{item.icon}
					{/* Show badge if enabled */}
					{item.showBadge && showBadge && (
  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
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
