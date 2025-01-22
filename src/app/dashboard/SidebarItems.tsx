import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { io } from 'socket.io-client';
import { BACKEND_URL } from '@/utils/globalConfig';


import { useSelector } from 'react-redux';
import { selectUser} from '@/redux/slices/authSlice';

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

	const user = useSelector(selectUser)
	const userId = user?.id
	const isActive = pathname === item.path;

	const notificationKey = `taskBadgeAcknowledged_${item.path}`;
	const [showBadge, setShowBadge] = useState(false);

	useEffect(() => {
		console.log(userId);
		if (userId) {
			socket.emit('joinRoom', userId);
		}

		const isAcknowledged = localStorage.getItem(notificationKey);
		setShowBadge(!isAcknowledged);

		socket.on('taskNotification', (data) => {
			if (data.userId === userId && !showBadge) {
				setShowBadge(true);
				localStorage.removeItem(notificationKey); // Reset acknowledgment status
			}
		});

		return () => {
			socket.off('taskNotification');
		};
	}, [userId, showBadge, notificationKey]);

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
					borderTopLeftRadius: '100px',
				}}
			>
				<div
					className="flex justify-center items-center text-2xl text-gray-700 relative"
					onClick={handleBadgeClick}
				>
					{item.icon}
					{item.showBadge && showBadge && (
						<span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
					)}
				</div>
				<div
					className={`text-xs text-white mt-1 text-center ${
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
