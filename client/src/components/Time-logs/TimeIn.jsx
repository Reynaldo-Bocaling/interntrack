import React, { useEffect, useState } from 'react';

function TimeIn() {
  const [canTimeIn, setCanTimeIn] = useState(false);
  const [timeIn, setTimeIn] = useState(localStorage.getItem('timeIn'));

  const checkTime = () => {
    const now = new Date();
    const hour = now.getHours();
    // Kung gusto mo mag-Time In ng 8 AM to 4 PM:
    // if (hour >= 8 && hour < 16) {
    if (hour != 10) {
      setCanTimeIn(true);
    }
  };

  useEffect(() => {
    checkTime(); // Tawagin ang checkTime function sa pag-mount ng component
  }, []);

  const handleTimeIn = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    localStorage.setItem('timeIn', formattedTime);
    setTimeIn(formattedTime);
    window.location.reload();
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Time In</h2>
      <p className="mb-2">Time In is allowed between 8 AM and 4 PM.</p>
      {timeIn ? (
        <p>Last Time In: {timeIn}</p>
      ) : canTimeIn ? (
        <button
          className="bg-blue-500 w-[180px] text-white px-4 py-2 rounded"
          onClick={handleTimeIn}
        >
          Time In
        </button>
      ) : (
        <p className='text-red-500'>Time In is not allowed at the moment.</p>
      )}
    </div>
  );
}

export default TimeIn;
