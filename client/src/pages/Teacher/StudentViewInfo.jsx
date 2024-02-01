import React, { lazy } from 'react'
const StudentInfo = lazy(()=> import('../../components/Student-Info/index'))

const StudentViewInfo = ()  => {

  
  return (
    <>
      <StudentInfo />
    </>
  )
}

export default StudentViewInfo
