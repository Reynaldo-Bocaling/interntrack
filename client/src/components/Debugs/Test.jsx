import React, { useState } from 'react';
import { format, addMinutes } from 'date-fns';

function Test() {
  const [timeIn, setTimeIn] = useState(new Date());
  const [adjustedTimeIn, setAdjustedTimeIn] = useState(null);

  // Function to adjust the time to the nearest 15 minutes
  const adjustTime = () => {
    const adjustedTime = addMinutes(timeIn, 15 - (timeIn.getMinutes() % 15));
    setAdjustedTimeIn(timeIn);
  };

  return (
    <div>
      <div>
        <label>Time In:</label>
        <input type="time" value={format(timeIn, 'HH:mm')} onChange={(e) => setTimeIn(new Date(e.target.value))} />
      </div>
      <button onClick={adjustTime}>Adjust Time In</button>
      {adjustedTimeIn && (
        <div>
          <p>Original Time In: {format(timeIn, 'HH:mm')}</p>
          <p>Adjusted Time In: {format(adjustedTimeIn, 'HH:mm')}</p>
        </div>
      )}
    </div>
  );
}

export default Test;
