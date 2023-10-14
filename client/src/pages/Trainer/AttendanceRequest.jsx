import React, { useState } from "react";
import AttendanceRequestItem from "../../components/attendance-request/AttendanceRequestItem";
import { userData } from "../../services/AttendanceRequestData";
import { BiSearch } from "react-icons/bi";
import { getTrainer, getStudentList } from '../../api/Api'
import {useQuery} from '@tanstack/react-query'

const AttendanceRequest = () => {
  const currentDate = new Date();

  const [searchInput, setSearchInput] = useState(null);

// get trainer id
  const {data: getTrainer_id} = useQuery({
    queryKey: ['getTrainer_id'],
    queryFn: getTrainer
  })

  // get student list
  const {data:StudentItem, isLoading} = useQuery({
    queryKey: ["getTimesheet"],
    queryFn: getStudentList
  });

  const studentRequest = StudentItem && Array.isArray(StudentItem)
  ? StudentItem
  .filter((item)=> item.trainer_id === getTrainer_id?.id)
  .map(({ id, firstname, lastname, accountStatus, timesheet }) => ({
      id,
      firstname,
      lastname,
      accountStatus,
      timesheet: timesheet && timesheet.filter((item) => new Date(item.date) <= currentDate && item.totalHours > 0 && item.logStatus === 0),
    })).filter((val) => {
      if (searchInput === null) {
        return val;
      } else if (val.firstname.toLowerCase().includes(searchInput)) {
        return val;
      }
    })
  : [];


  return (
    <div>
      <div className="pb-4 pl-2 flex items-center justify-between">
        <span className=" text-xl tracking-wide font-semibold">
          Attendance Request
        </span>

        <div className="h-10 w-[230px] flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200">
          <BiSearch />
          <input
            type="text"
            placeholder="Search.."
            onChange={(e) => setSearchInput(e.target.value)}
            className="outline-none text-sm"
          />
        </div>
      </div>

      <AttendanceRequestItem data={studentRequest} isLoading={isLoading} />
    </div>
  );
};

export default AttendanceRequest;
