import React, { lazy } from 'react'
const StudentInfo = lazy(()=> import('../../components/Student-Info/index'));
function StudentViewInfo() {

  
  return (
    <>
      <StudentInfo />
    </>
  )
}

export default StudentViewInfo
