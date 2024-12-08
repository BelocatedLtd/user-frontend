import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '@/utils/globalConfig';
import { io } from 'socket.io-client';

const socket = io(`${BACKEND_URL}`);

type TaskNotificationBadgeProps = {
	onClick: () => void;
};

const OngoingTaskNotification = ({ onClick }: TaskNotificationBadgeProps) => {
	const [hasNotification, setHasNotification] = useState(false);

	useEffect(() => {
		// Listen for task approval events
		socket.on('taskApproved', () => {
			setHasNotification(true);
		});

		// Listen for task rejection events
		socket.on('taskRejected', () => {
			setHasNotification(true);
		});

		// Cleanup connection on component unmount
		return () => {
			socket.off('taskApproved');
			socket.off('taskRejected');
		};
	}, []);

	if (!hasNotification) return null;

	return (
		<span
			onClick={() => {
				setHasNotification(false);
				onClick();
			}}
			className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"
			title="New task update"
		></span>
	);
};

export default OngoingTaskNotification;
