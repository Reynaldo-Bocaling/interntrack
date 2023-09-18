import React from 'react'
import TimeIn from '../../components/Time-logs/TimeIn'
import TimeOut from '../../components/Time-logs/TimeOut'







const TimeLogs = () => {
  return (
    <div className='bg-white rounded-lg shadow-sm'>
       <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-5">Time logs</h1>
      <div className="flex flex-col gap-10">
        <TimeIn />
        <TimeOut />
      </div>
    </div>
    </div>
  )
}

export default TimeLogs
