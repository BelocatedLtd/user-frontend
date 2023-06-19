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
      endOfWeek.setDate(startOfWeek.getDate() + 7);

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
    <div className='w-full flex justify-center'>
        <div className='flex items-center gap-3'>
            <div className='flex items-center border-r border-gray-200 p-2'>Time Remaining:</div>
            <div className='w-[250px] flex items-center justify-between p-2 gap-3'>
              <div className='flex flex-col items-center'>
                <h1 className='text-2xl font-bold'>{countDown.days}</h1> 
                <p>days</p>
              </div>
              <div className='flex flex-col items-center'>
                <h1 className='text-2xl font-bold'>{countDown.hours}</h1>
                <p>hrs</p>
              </div>
              <div className='flex flex-col items-center'>
                <h1 className='text-2xl font-bold'>{countDown.minutes}</h1> 
                <p>mins</p>
              </div>
              <div className='flex flex-col items-center'>
                <h1 className='text-2xl font-bold'>{countDown.seconds}</h1>
                <p>secs</p> 
              </div>
            </div>
            
        </div>
    </div>
  )
}

export default FreeTaskCount