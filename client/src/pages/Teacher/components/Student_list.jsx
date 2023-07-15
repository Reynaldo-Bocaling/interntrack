import React from 'react'

function Student_list() {
  return (
    <div>
    <div className='container'>
      <span className='text-2xl  font-semibold tracking-wider'>Trainee</span>
      <table className="w-full mt-5 border border-collapse">
        <thead>
          <tr className='h-12'>
            <th className='pl-3'>Id</th>
            <th className='pl-3'>Firstname</th>
            <th className='pl-3'>Middlename</th>
            <th className='pl-3'>Lastname</th>
            <th className='pl-3'>Gender</th>
            <th className='pl-3'>Email</th>
            <th className='pl-3'>Phone #</th>
            <th className='pl-3'>Department</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Reynaldo</td>
            <td>Flores</td>
            <td>Bocaling</td>
            <td>Male</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Student_list
