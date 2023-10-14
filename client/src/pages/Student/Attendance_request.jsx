import React from 'react'

function Attendance_request() {
  return (
    <div>
      <div className='p-1 rounded-lg'>
        <div className='flex items-center justify-between'>
          <h1 className="text-xl font-bold tracking-wider text-gray-700 mb-3 ml-3 mt-3">
          Attendance request
            </h1>
        </div>
        <div className="mt-4  p-2 rounded-lg bg-white shadow-lg shadow-slate-200 border border-slate-100">
          <table className='w-full'>
            <thead>
              <tr className='h-12 border-b'>
                <th className='text-xs tracking-wide text-left pl-2'>Date</th>
                <th className='text-xs tracking-wide text-left pl-2'>Time in</th>
                <th className='text-xs tracking-wide text-left pl-2'>Time out</th>
                <th className='text-xs tracking-wide'>Total hours</th>
                <th className='text-xs tracking-wide text-left pl-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className='h-14'>
                <td className='text-xs tracking-wide pl-2'>January 02</td>
                <td className='text-xs tracking-wide pl-2'>8:00</td>
                <td className='text-xs tracking-wide pl-2'>4:00 out</td>
                <td className='text-xs tracking-wide pl-2'>8 hrs</td>
                <td className='text-xs tracking-wide pl-2 w-1/6'>
                  <div>
                    <span className='text-xs text-red-500 font-medium bg-red-100 py-[7px] px-3 rounded-full tracking-wider '>Decline</span>
                  </div>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-xs tracking-wide pl-2'>January 03</td>
                <td className='text-xs tracking-wide pl-2'>8:00</td>
                <td className='text-xs tracking-wide pl-2'>4:00 out</td>
                <td className='text-xs tracking-wide pl-2'>8 hrs</td>
                <td className='text-xs tracking-wide pl-2 w-1/6'>
                  <div>
                    <span className='text-xs text-green-500 font-medium bg-green-100 py-[7px] px-3 rounded-full tracking-wider '>Approved</span>
                  </div>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-xs tracking-wide pl-2'>January 04</td>
                <td className='text-xs tracking-wide pl-2'>8:00</td>
                <td className='text-xs tracking-wide pl-2'>4:00 out</td>
                <td className='text-xs tracking-wide pl-2'>8 hrs</td>
                <td className='text-xs tracking-wide pl-2 w-1/6'>
                  <div>
                    <span className='text-xs text-green-500 font-medium bg-green-100 py-[7px] px-3 rounded-full tracking-wider '>Approved</span>
                  </div>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-xs tracking-wide pl-2'>January 05</td>
                <td className='text-xs tracking-wide pl-2'>8:00</td>
                <td className='text-xs tracking-wide pl-2'>4:00 out</td>
                <td className='text-xs tracking-wide pl-2'>8 hrs</td>
                <td className='text-xs tracking-wide pl-2 w-1/6'>
                  <div>
                    <span className='text-xs text-green-500 font-medium bg-green-100 py-[7px] px-3 rounded-full tracking-wider '>Approved</span>
                  </div>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-xs tracking-wide pl-2'>January 06</td>
                <td className='text-xs tracking-wide pl-2'>8:00</td>
                <td className='text-xs tracking-wide pl-2'>4:00 out</td>
                <td className='text-xs tracking-wide pl-2'>8 hrs</td>
                <td className='text-xs tracking-wide pl-2 w-1/6'>
                  <div>
                    <span className='text-xs text-green-500 font-medium bg-green-100 py-[7px] px-3 rounded-full tracking-wider '>Approved</span>
                  </div>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-xs tracking-wide pl-2'>January 07</td>
                <td className='text-xs tracking-wide pl-2'>8:00</td>
                <td className='text-xs tracking-wide pl-2'>4:00 out</td>
                <td className='text-xs tracking-wide pl-2'>8 hrs</td>
                <td className='text-xs tracking-wide pl-2 w-1/6'>
                  <div>
                    <span className='text-xs text-orange-600 font-medium bg-orange-100 py-[2px] px-3 rounded-full tracking-wider '>Pending</span>
                  </div>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-xs tracking-wide pl-2'>January 08</td>
                <td className='text-xs tracking-wide pl-2'>8:00</td>
                <td className='text-xs tracking-wide pl-2'>4:00 out</td>
                <td className='text-xs tracking-wide pl-2'>8 hrs</td>
                <td className='text-xs tracking-wide pl-2 w-1/6'>
                  <div>
                    <span className='text-xs text-orange-600 font-medium bg-orange-100 py-[7px] px-3 rounded-full tracking-wider '>Pending</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Attendance_request
