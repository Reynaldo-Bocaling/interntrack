import React from 'react'
import { Link, useParams} from 'react-router-dom'
import { BiSearch } from "react-icons/bi";


const ViewAttendanceRequest = () => {
  
  return (
    <div>
      <div className='bg-white shadow-lg shadow-slate-200 border border-slate-100 p-5 rounded-lg'>
        <div className='flex items-center justify-between'>
          <span className='text-xl font-semibold tracking-wider'>Attendance request</span>
          <div className="h-10 w-[230px] flex items-center gap-2 bg-white rounded-full px-3 shadow-sm border shadow-slate-200 ">
            <BiSearch className='text-blue-500' />
            <input
              type="text"
              placeholder="Search date"
              // onChange={(e) => setSearchInput(e.target.value)}
              className="outline-none text-sm"
            />
          </div>
        </div>
        <div className="mt-7 border p-3 rounded-lg">
          <table className='w-full'>
            <thead>
              <tr className='h-12 border-b'>
                <th className='text-sm tracking-wide text-left pl-2'>Date</th>
                <th className='text-sm tracking-wide text-left pl-2'>Time in</th>
                <th className='text-sm tracking-wide text-left pl-2'>Time out</th>
                <th className='text-sm tracking-wide'>Total hours</th>
                <th className='text-sm tracking-wide text-left pl-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className='h-14'>
                <td className='text-sm tracking-wide pl-2'>January 02</td>
                <td className='text-sm tracking-wide pl-2'>8:00</td>
                <td className='text-sm tracking-wide pl-2'>4:00 out</td>
                <td className='text-sm tracking-wide pl-2'>8 hrs</td>
                <td className='text-sm tracking-wide pl-2 w-1/6'>
                  <div>
                    <span className='text-xs text-red-500 font-medium bg-red-100 py-[7px] px-3 rounded-full tracking-wider '>Decline request</span>
                  </div>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-sm tracking-wide pl-2'>January 03</td>
                <td className='text-sm tracking-wide pl-2'>8:00</td>
                <td className='text-sm tracking-wide pl-2'>4:00 out</td>
                <td className='text-sm tracking-wide pl-2'>8 hrs</td>
                <td className='text-sm tracking-wide pl-2 w-1/6'>
                  <div>
                    <span className='text-xs text-green-500 font-medium bg-green-100 py-[7px] px-3 rounded-full tracking-wider '>Approved</span>
                  </div>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-sm tracking-wide pl-2'>January 04</td>
                <td className='text-sm tracking-wide pl-2'>8:00</td>
                <td className='text-sm tracking-wide pl-2'>4:00 out</td>
                <td className='text-sm tracking-wide pl-2'>8 hrs</td>
                <td className='text-sm tracking-wide pl-2 w-1/6'>
                  <div>
                    <span className='text-xs text-green-500 font-medium bg-green-100 py-[7px] px-3 rounded-full tracking-wider '>Approved</span>
                  </div>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-sm tracking-wide pl-2'>January 05</td>
                <td className='text-sm tracking-wide pl-2'>8:00</td>
                <td className='text-sm tracking-wide pl-2'>4:00 out</td>
                <td className='text-sm tracking-wide pl-2'>8 hrs</td>
                <td className='text-sm tracking-wide pl-2 w-1/6'>
                  <div>
                    <span className='text-xs text-green-500 font-medium bg-green-100 py-[7px] px-3 rounded-full tracking-wider '>Approved</span>
                  </div>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-sm tracking-wide pl-2'>January 06</td>
                <td className='text-sm tracking-wide pl-2'>8:00</td>
                <td className='text-sm tracking-wide pl-2'>4:00 out</td>
                <td className='text-sm tracking-wide pl-2'>8 hrs</td>
                <td className='text-sm tracking-wide pl-2 w-1/6'>
                  <div>
                    <span className='text-xs text-green-500 font-medium bg-green-100 py-[7px] px-3 rounded-full tracking-wider '>Approved</span>
                  </div>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-sm tracking-wide pl-2'>January 07</td>
                <td className='text-sm tracking-wide pl-2'>8:00</td>
                <td className='text-sm tracking-wide pl-2'>4:00 out</td>
                <td className='text-sm tracking-wide pl-2'>8 hrs</td>
                <td className='text-sm tracking-wide pl-2 w-1/6'>
                  <div>
                    <span className='text-xs text-orange-600 font-medium bg-orange-100 py-[7px] px-3 rounded-full tracking-wider '>Pending</span>
                  </div>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-sm tracking-wide pl-2'>January 08</td>
                <td className='text-sm tracking-wide pl-2'>8:00</td>
                <td className='text-sm tracking-wide pl-2'>4:00 out</td>
                <td className='text-sm tracking-wide pl-2'>8 hrs</td>
                <td className='text-sm tracking-wide pl-2 w-1/6'>
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

export default ViewAttendanceRequest
