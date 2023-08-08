
import React from 'react'
import {TimeIcon } from "../../React-Icons";
import { NavLink } from 'react-router-dom';

import pic from '../../assets/images/task1.jpg'

const  StudentTask = () => {
  return (
    <div>
      <div className='container py-2 px-5'>
        <header className='flex items-center justify-between mb-5'>
          <span className='text-2xl text-gray-700 font-semibold tracking-wide'>Task</span>
          
            <div className='bg-white p-1 px-3 py-2 flex items-center gap-2 rounded-full shadow-md shadow-slate-200 border border-gray-100'>
            <select  className='w-[220px] outline-none'>
              <option value="">Select Date</option>
              <option value="">January 1</option>
              <option value="">January 2</option>
              <option value="">January 3</option>
              <option value="">January 4</option>
              <option value="">January 5</option>
            </select>
            </div>
        </header>
      <section
          className={`flex flex-wrap justify-between gap-5`}
        >
          {Array.from({ length: 9 }, (item, index) => (
            <div
              key={index}
              className="bg-white shadow-md shadow-slate-200 border border-slate-100 rounded-lg p-3 flex flex-col justify-end w-[230px]"
            >
              <img
                className="w-full h-40 object-cover object-center mb-2 rounded-lg"
                src={pic}
                alt={"ds"}
              />

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-center w-full pb-1 mb-2 border-b">
                    <h2 className="text-base text-gray-800 font-semibold tracking-wide">
                      Check Student Code
                    </h2>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="">
                      <p className="text-xs text-gray-600">August 3, 2023</p>
                    </div>

                    <NavLink
                      to="/ViewedStudentTask"
                      className="text-base font-semibold text-blue-500 py-2 px-2"
                    >
                      View
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default StudentTask
