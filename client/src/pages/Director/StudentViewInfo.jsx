import React, { lazy } from 'react'
const StudentInfo = lazy(() => import('../../components/Student-Info/index'));

const StudentViewInfo = () => {

  
  return (
    <div>
      <StudentInfo />
    </div>
  )
}

export default StudentViewInfo
