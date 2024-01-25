import React, { lazy } from 'react'
const StudentInfo = lazy(()=> import('../../components/Student-Info/index'));
function StudentViewInfo() {

  
  return (
    <div>
      <StudentInfo />
    </div>
  )
}

export default StudentViewInfo
