import React from 'react'
import pic from "../../assets/images/task1.jpg";
import { ArrowLeft } from '../ReactIcon/React-Icons';
import { NavLink } from 'react-router-dom';

const ViewUploadTask = () => {
  return (
    <div className='mx-5'>
        <div className='text-xl font-semibold tracking-wide flex flex-col justify-center gap-5'> 
        <NavLink to='/StudentTask' className='text-base text-blue-500 tracking-wider flex items-center -ml-2'><ArrowLeft />Back</NavLink>
        <span className='text-lg'> Task Details</span>
         </div>
      <div className='flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden  h-full px-3'>
        
        <div className="image min-w-[500px] w-full h-[450px]">
            <img src={pic} alt="" className='w-full h-full rounded-lg' />
        </div>
        <div className='flex flex-col gap-1 p-5 py-7 bg-white'>
        <div className='flex flex-col gap-2 p-3'>
                <small className='text-blue-500'>Name:</small>
                <div className='text-2xl text-gray-700 font-semibold tracking-wide'>Reynaldo Bocaling</div>
            </div>
            <div className='flex flex-col gap-2 p-3'>
                <small className='text-blue-500'>Title:</small>
                <div className=''>Check Student Code</div>
            </div>
            <div className='flex flex-col gap-2 p-3'>
                <small className='text-blue-500'>Date:</small>
                <div className=''>January 3, 2023</div>
            </div>
            <div className='flex flex-col gap-2 p-3'>
                <small className='text-blue-500'>Description:</small>
                <div className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora hic numquam a saepe dolorem dolores neque voluptates, alias enim corrupti vero, sint voluptatibus! Velit sequi labore obcaecati, officia provident dolorem.</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ViewUploadTask
