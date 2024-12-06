import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '@/utils/globalConfig'

import { io } from 'socket.io-client'

const socket = io(`${BACKEND_URL}`)
// Adjust the import path based on your file structure.
type TaskNotificationBadgeProps = {
	onClick: () => void;
};
const OngoingTaskNotification = ({ onClick }: TaskNotificationBadgeProps) => {
    const [hasNotification, setHasNotification] = useState(false);
	const [newTasks, setNewTasks] = useState(false);

	useEffect(() => {
		// Connect to the WebSocket server
		const socket = io(`${BACKEND_URL}`)

		// Listen for task approval events
		socket.on('taskApproved', () => {
			setNewTasks(true);
		});

		// Cleanup connection on component unmount
		return () => {
			socket.disconnect();
		};
	}, []);
if (!newTasks) return null
	return (
		newTasks && (
			<span onClick={onClick} className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
		)
	);
};

export default OngoingTaskNotification;
