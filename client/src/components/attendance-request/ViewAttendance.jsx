import React from 'react'
import { Link, useParams} from 'react-router-dom'
import {MdOutlineArrowBackIosNew} from 'react-icons/md'
import profile from "../../assets/images/dp.png";

function ViewAttendanceRequest() {
     const {id } = useParams()
  return (
    <div>
      <div className='container flex flex-col gap-5 mt-5 bg-white shadow-lg shadow-slate-200 border border-slate-100 p-5 rounded-lg'>
        <Link to='/Attendance-request/' className='flex items-center justify-center gap-1 w-20 h-8 rounded-lg'>
          <MdOutlineArrowBackIosNew size={20} className='text-blue-500'/>
          <p className='text-blue-500 text-base font-semibold tracking-wider'>Back</p>
        </Link>

       <div className="profile flex items-center gap-3">
        <div className=" mt-2 rounded-full w-10 flex items-center justify-center bg-white border shadow-lg shadow-slate-200">
            <img
              src={profile}
              alt=""
              width={35}
              className="rounded-full mx-[0.35rem]"
            />
          </div>
          <span className='mt-2 text-lg font-semibold'>Reynaldo Bocaling</span>
       </div>

        <div className="mt-2 border p-3 rounded-lg">
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
                  <button className='text-white text-sm font-medium tracking-wider bg-blue-500 py-[7px] w-24 rounded-full'>
                    Confirm
                  </button>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-sm tracking-wide pl-2'>January 02</td>
                <td className='text-sm tracking-wide pl-2'>8:00</td>
                <td className='text-sm tracking-wide pl-2'>4:00 out</td>
                <td className='text-sm tracking-wide pl-2'>8 hrs</td>
                <td className='text-sm tracking-wide pl-2 w-1/6'>
                  <button className='text-white text-sm font-medium tracking-wider bg-blue-500 py-[7px] w-24 rounded-full'>
                    Confirm
                  </button>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-sm tracking-wide pl-2'>January 02</td>
                <td className='text-sm tracking-wide pl-2'>8:00</td>
                <td className='text-sm tracking-wide pl-2'>4:00 out</td>
                <td className='text-sm tracking-wide pl-2'>8 hrs</td>
                <td className='text-sm tracking-wide pl-2 w-1/6'>
                  <button className='text-white text-sm font-medium tracking-wider bg-blue-500 py-[7px] w-24 rounded-full'>
                    Confirm
                  </button>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-sm tracking-wide pl-2'>January 02</td>
                <td className='text-sm tracking-wide pl-2'>8:00</td>
                <td className='text-sm tracking-wide pl-2'>4:00 out</td>
                <td className='text-sm tracking-wide pl-2'>8 hrs</td>
                <td className='text-sm tracking-wide pl-2 w-1/6'>
                  <button className='text-white text-sm font-medium tracking-wider bg-blue-500 py-[7px] w-24 rounded-full'>
                    Confirm
                  </button>
                </td>
              </tr>
              <tr className='h-14'>
                <td className='text-sm tracking-wide pl-2'>January 02</td>
                <td className='text-sm tracking-wide pl-2'>8:00</td>
                <td className='text-sm tracking-wide pl-2'>4:00 out</td>
                <td className='text-sm tracking-wide pl-2'>8 hrs</td>
                <td className='text-sm tracking-wide pl-2 w-1/6'>
                  <button className='text-white text-sm font-medium tracking-wider bg-blue-500 py-[7px] w-24 rounded-full'>
                    Confirm
                  </button>
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
