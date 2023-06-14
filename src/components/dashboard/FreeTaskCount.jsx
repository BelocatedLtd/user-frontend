import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const FreeTaskCount = () => {
    const [countDown, setCountDown] = useState({days: 0, hours: 0, minute: 0, seconds: 0})

    useEffect(() => {
      //Calculate the date when the week runs out
      const startOfWeek = new Date();
      startOfWeek.setHours(0, 0, 0, 0);
      
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      const updateCountdown = () => {
        const now = Date.now();
        const remainingTime = endOfWeek.getTime() - now;

        if (remainingTime > 0) {
            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            setCountDown({ days, hours, minutes, seconds });
        } else {
            //Perform the code that runs when the week runs out. That's resetting every users' freetaskCounter
        }
      };

      //Update the count down every second
      const timer = setInterval(updateCountdown, 1000);

      //Clean up the timer when the component is unmounted
      return () => clearInterval(timer);
    

    }, [])
    
  return (
    <div className='flex gap-1'>
        <p>
            Time Remaining: 
            {countDown.days} days,
            {countDown.hours} hours,
            {countDown.minutes} minutes,
            {countDown.seconds} seconds,
        </p>
    </div>
  )
}

export default FreeTaskCount