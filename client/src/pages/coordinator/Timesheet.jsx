import React from 'react'
import {StudentList} from '../../components/dummyData/Data'
import TimesheetTable from '../../components/StudentTimesheets/Timesheet_table'
function Timesheet() {



  return (
    <div>
      <TimesheetTable data={StudentList} />
    </div>
  )
}

export default Timesheet
