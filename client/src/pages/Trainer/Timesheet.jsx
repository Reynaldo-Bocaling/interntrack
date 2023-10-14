import React from 'react'
import TimesheetTable from '../../components/StudentTimesheets/Timesheet_table'
import {useQuery} from '@tanstack/react-query'
import { getTrainer, getStudentList } from '../../api/Api'

function Timesheet() {
  const currentDate = new Date(); 
  const {data:StudentTimesheet} = useQuery({
    queryKey: ["getTimesheet"],
    queryFn: getStudentList
  });
 
  const {data: getTrainer_id} = useQuery({
    queryKey: ['getTrainer_id'],
    queryFn: getTrainer
  })

  const data = StudentTimesheet
  ?  StudentTimesheet
  .filter((item)=> item.trainer_id === getTrainer_id?.id)
  .map(({
    id,
    firstname,
    lastname,
    timesheet
  })=>({
    id,
    name: `${firstname} ${lastname}`,
    timeSheet:timesheet
    ? timesheet.map(({
    id,
    timeIn,
    timeOut,
    totalHours,
    date,
    logStatus
    })=> ({
      id,
      timeIn: logStatus  !== 0 ? timeIn: 0,
      timeOut: logStatus  !== 0 ? timeOut: 0,
      totalHours: logStatus  !== 0 ? totalHours: 0,
      date,
    }))
    : []
  })) : []


  console.log(StudentTimesheet);


  return (
    <div>
      <TimesheetTable data={data} />
    </div>
  )
}

export default Timesheet
