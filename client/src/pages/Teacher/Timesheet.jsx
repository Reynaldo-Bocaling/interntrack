import React from 'react'
import TimesheetTable from '../../components/StudentTimesheets/Timesheet_table'
import {useQuery} from '@tanstack/react-query'
import { getStudentList } from '../../api/Api'

function Timesheet() {

  const {data:StudentTimesheet} = useQuery({
    queryKey: ["getTimesheet"],
    queryFn: getStudentList
  });
 
  const data = StudentTimesheet
  ?  StudentTimesheet.map(({
    firstname,
    lastname,
    timesheet
  })=>({
    name: `${firstname} ${lastname}`,
    timeSheet:timesheet
  })) : []


  return (
    <div>
      <TimesheetTable data={data} />
    </div>
  )
}

export default Timesheet
