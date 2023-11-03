import React, { useState } from 'react';
import { format, addMinutes, setMinutes, getMinutes, getHours } from 'date-fns';
import { Button } from '@nextui-org/react';

function App() {
  const [timeIn, setTimeIn] = useState(null);
  const [timeOut, setTimeOut] = useState(null);
  const [totalHours, setTotalHours] = useState(0.0);

  const handleTimeIn = () => {
    const currentTime = new Date();
    const adjustedTime = adjustTime(currentTime);
    setTimeIn(adjustedTime);
  };

  const handleTimeOut = () => {
    const currentTime = new Date();
    const adjustedTime = adjustTime(currentTime);
    setTimeOut(adjustedTime);

    if (timeIn) {
      const minutesWorked = Math.ceil((adjustedTime - timeIn) / 60000);
      const hoursWorked = minutesWorked / 60;
      setTotalHours(adjustTotalHours(totalHours + hoursWorked));
    }
  };

  const adjustTime = (time) => {
    const minutes = getMinutes(time);
    const hours = getHours(time);
    if (minutes >= 0 && minutes < 15) {
      return setMinutes(setMinutes(time, 0), 0);
    } else if (minutes >= 15 && minutes < 30) {
      return setMinutes(setMinutes(time, 0), 15);
    } else if (minutes >= 30 && minutes < 45) {
      return setMinutes(setMinutes(time, 0), 30);
    } else {
      return setMinutes(setMinutes(time, 0), 45);
    }
  };

  const adjustTotalHours = (hours) => {
    const totalMinutes = hours * 60;
    const adjustedMinutes = Math.floor(totalMinutes / 15) * 15;
    return adjustedMinutes / 60;
  };

 
  return (
    <div>
      <div>
        <p>Time In: {timeIn ? format(timeIn, 'h:mm a') : 'N/A'}</p>
        <p>Time Out: {timeOut ? format(timeOut, 'h:mm a') : 'N/A'}</p>
        <p>Total Hours: {totalHours.toFixed(2)} hours</p>
      </div>
      <Button onClick={handleTimeIn} disabled={timeIn !== null}>Time In</Button>
      <Button onClick={handleTimeOut} disabled={timeOut !== null}>Time Out</Button>
    </div>
  );
}

export default App;
