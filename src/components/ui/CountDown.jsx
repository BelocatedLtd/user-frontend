import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const CountDown = ({handleDaysRemaining}) => {
    const [countDown, setCountDown] = useState({days: 0, hours: 0, minute: 0, seconds: 0})

    
    useEffect(() => {
      const updateCountdown = () => {
        const now = new Date();
        
        // Calculate the date when the week runs out (Sunday midnight)
        const daysUntilReset = (7 + 1 - now.getDay()) % 7; // Calculate days until Sunday
        const endOfWeek = new Date(now.getTime() + daysUntilReset * 24 * 60 * 60 * 1000);
        endOfWeek.setHours(0, 0, 0, 0);
  
        const currentTime = Date.now();
        const remainingTime = endOfWeek.getTime() - currentTime;
  
        if (remainingTime > 0) {
          const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
          const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  
          setCountDown({ days, hours, minutes, seconds });
        } else {
          // Reset the timer and start counting down from 7 days on Monday
          const daysUntilMonday = (8 - now.getDay()) % 7; // Calculate days until Monday
          const nextMonday = new Date(now.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000);
          nextMonday.setHours(0, 0, 0, 0);
  
          const resetTime = nextMonday.getTime() + 7 * 24 * 60 * 60 * 1000; // Add 7 days to reset to a week from Monday
          const newRemainingTime = resetTime - currentTime;
  
          const newDays = Math.floor(newRemainingTime / (1000 * 60 * 60 * 24));
          const newHours = Math.floor((newRemainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const newMinutes = Math.floor((newRemainingTime % (1000 * 60 * 60)) / (1000 * 60));
          const newSeconds = Math.floor((newRemainingTime % (1000 * 60)) / 1000);
  
          setCountDown({ days: newDays, hours: newHours, minutes: newMinutes, seconds: newSeconds });
        }
      };
  
      const timer = setInterval(updateCountdown, 1000);

      handleDaysRemaining(countDown.days)
  
      return () => clearInterval(timer);
    }, []);



    return (
            <div className='flex flex-col'>
              <h1 className='text-center'>{countDown.days}</h1>
              <small className='flex text-[8px]'>Hours: {countDown.hours} | Minutes: {countDown.minutes} | Seconds: {countDown.seconds} </small>
            </div>
    );
};

export default CountDown