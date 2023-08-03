import React from 'react'
import {FaEye} from 'react-icons/fa'
import {TbEdit} from 'react-icons/tb'
import {BsFillTrash3Fill} from 'react-icons/bs'
import {NavLink} from 'react-router-dom'
function Student_list() {
  return (
    <div>
    <div className='container'>
      <span className='text-2xl  font-semibold tracking-wider'>Trainee list</span>
      <table className="w-full min-w-max mt-5 border border-collapse bg-white text-[1rem]">
        <thead>
          <tr className='h-12 text-left'>
            <th className='pl-3 border'>Id</th>
            <th className='pl-3 border'>Name</th>
            <th className='pl-3 border'>Gender</th>
            <th className='pl-3 border'>Email</th>
            <th className='pl-3 border'>Phone #</th>
            <th className='pl-3 border'>Department</th>
            <th className='border text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className='h-12'>
            <td className='pl-3 border'>SUM2020-02837</td>
            <td className='pl-3 border'>Reynaldo F. Bocaling</td>
            <td className='pl-3 border'>Male</td>
            <td className='pl-3 border'>reynaldobocaling@gmail.com</td>
            <td className='pl-3 border'>099999999</td>
            <td className='pl-3 border'>WST</td>
            <td className='pl-3 border flex items-center h-12 gap-3 px-5'>
                <NavLink to='/student/' className='text-blue-500'> <FaEye size={20} /></NavLink>
                <NavLink className='text-green-500'> <TbEdit size={20} /></NavLink>
                <NavLink className='text-red-500'> <BsFillTrash3Fill size={19} /></NavLink>
            </td>
          </tr>
          <tr className='h-12'>
            <td className='pl-3 border'>SUM2020-02837</td>
            <td className='pl-3 border'>Reynaldo F. Bocaling</td>
            <td className='pl-3 border'>Male</td>
            <td className='pl-3 border'>reynaldobocaling@gmail.com</td>
            <td className='pl-3 border'>099999999</td>
            <td className='pl-3 border'>WST</td>
            <td className='pl-3 border flex items-center h-12 gap-3 px-5'>
                <NavLink className='text-blue-500'> <FaEye size={20} /></NavLink>
                <NavLink className='text-green-500'> <TbEdit size={20} /></NavLink>
                <NavLink className='text-red-500'> <BsFillTrash3Fill size={19} /></NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Student_list
