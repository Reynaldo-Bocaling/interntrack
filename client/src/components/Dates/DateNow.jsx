import React, { useState, useEffect } from 'react';

const DateNow = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className='pr-2 '>
      <p className='text-gray-600 text-[0.7rem] md:lg '>
        {currentDate}
      </p>
    </div>
  );
}

export default DateNow;
