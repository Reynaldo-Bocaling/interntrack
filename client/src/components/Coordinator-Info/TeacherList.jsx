
import React from 'react'
import pic from '../../assets/images/dp.png'
import {Avatar} from "@nextui-org/react";

const StudentList = ({data}) => {
  console.log('student',data);

  return (
    <div>
      <div className="text-xl text-gray-700 font-semibold tracking-wide mt-3 mb-5 ml-5">
          Teacher List
        </div>
      <div className='max-w-[97%] w-full my-5 mx-5 rounded-lg border p-4'>
        <table className=' w-full'>
          <thead>
            <tr className='h-12'>
              <th className='text-sm text-left pl-3'>ID</th>
              <th className='text-sm text-left pl-3'>Name</th>
              <th className='text-sm text-left pl-3'>Email</th>
              <th className='text-sm text-left pl-3'>Campus</th>
              <th className='text-sm text-left pl-3'>College</th>
              <th className='text-sm text-left pl-3'>Program</th>
              <th className='text-sm text-left pl-3'>Major</th>
              <th className='text-sm text-left pl-3'>Total Student</th>
            </tr>
          </thead>
          <tbody>
            {
              data? (
                data.map((item,index)=>(
                  <tr key={index} className='h-14'>
                    <td className='text-left pl-3'>{item.id}</td>
                    <td className='text-left pl-3'>
                      <div className='flex items-center gap-2'>
                        <Avatar src={pic} size="sm" />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="text-sm text-left pl-3">{item.email}</td>
                    <td className="text-sm text-left pl-3">{item.campus}</td>
                    <td className="text-sm text-left pl-3">{item.college}</td>
                    <td className="text-sm text-left pl-3">{item.program}</td>
                    <td className="text-sm text-left pl-3">{item.major}</td>
                    <td className="text-sm text-center pl-3">{item.totalStudent}</td>
                  </tr>
                ))
              )
              :
              (
              <h1>NO RECORD</h1>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentList
