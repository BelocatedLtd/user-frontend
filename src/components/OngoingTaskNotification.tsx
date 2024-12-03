import React, { useEffect, useState } from 'react';
import { io } from '../path-to-app-file/app'; // Adjust the import path based on your file structure.

const OngoingTaskNotification = () => {
    const [hasNotification, setHasNotification] = useState(false);

    useEffect(() => {
        // Listen for task-approved events
        const socket = io();
        socket.on('taskApproved', () => {
            setHasNotification(true);
        });

        return () => {
            socket.disconnect(); // Clean up on unmount
        };
    }, []);

    const handleNotificationClick = () => {
        // Clear notification when the icon is clicked
        setHasNotification(false);
    };

    return (
        <div className="relative" onClick={handleNotificationClick}>
            {/* Your icon */}
            <div className="text-2xl text-gray-700">
                <i className="fas fa-tasks"></i>
            </div>

            {/* Notification Badge */}
            {hasNotification && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
        </div>
    );
};

export default OngoingTaskNotification;
