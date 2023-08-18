import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { StudentData } from "../../components/Student-Task/Data";
import Task from "../../components/Student-Task/Task";
import Table from "../../components/Student-Task/Table";


const StudentTask = () => {
  const [StudentId, setStudentId] = useState(0);
  const [Fullscreen, setFullscreen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const data = StudentData.map(
    ({ studentNo, firstname, middleName, lastname, Task, status, image }) => ({
      studentNo,
      name: `${firstname} ${middleName.slice(0, 1)}.  ${lastname}`,
      status,
      totalTask: Task.length,
      lastUpload: Task[Task.length - 1].date,
      image,
      Task: Task,
    })
  );

  const taskRecords = data.filter((student) => student.studentNo === StudentId);

  const Studentlist = data.filter((data) => {
    return searchInput.toLowerCase() === ""
      ? data
      : data.name.toLowerCase().includes(searchInput);
  });

  return (
    <div className="relative">
      <div
        className={`${
          StudentId !== 0 ? "pr-[20rem]" : ""
        } flex items-center justify-between px-2  w-full duration-300`}
      >
        <h1 className=" text-xl font-bold tracking-wider text-gray-700">
          Student Task
        </h1>
        <div className="h-10 flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200">
          <BiSearch />
          <input
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search.."
            className="outline-none text-sm"
          />
        </div>
      </div>

      {/* table */}
      <div
        className={`${
          StudentId != 0 ? "mr-[20rem]" : ""
        } border p-3 rounded-lg bg-white mt-5 duration-300 `}
      >
        <Table
          data={data}
          datalist={Studentlist}
          StudentId={StudentId}
          setId={setStudentId}
          setFullscreen={setFullscreen}
        />
      </div>

      {/* right content */}
      {StudentId != 0 && (
        <div
          className={`${
            Fullscreen
              ? "w-[20rem] pt-[70px]"
              : "w-screen pl-[17.5rem] pr-5 pt-[65px]"
          } fixed top-0 right-0 h-screen  bg-white shadow-lg `}
        >
          <Task
            taskRecords={taskRecords}
            close={() => setStudentId(0)}
            Fullscreen={() => setFullscreen(!Fullscreen)}
            isFullScreen={Fullscreen}
          />
        </div>
      )}
    </div>
  );
}

export default StudentTask;
