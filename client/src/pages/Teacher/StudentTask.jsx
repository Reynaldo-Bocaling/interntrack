import React, { lazy, useState } from "react";
import { BiSearch } from "react-icons/bi";
const Task = lazy(()=> import("../../components/Student-Task/Task"));
const Table = lazy(()=> import("../../components/Student-Task/Table"));
import { useQuery } from "@tanstack/react-query";
import { getStudentList, getTeacher } from "../../api/Api";
import pic from "../../assets/images/emptyProfile.png";
import PulseLoader from "react-spinners/PulseLoader";

const StudentTask = () => {
  const [StudentId, setStudentId] = useState(0);
  const [Fullscreen, setFullscreen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const { data: studentTask, isLoading } = useQuery({
    queryKey: ["teacher_getStudentList2"],
    queryFn: getStudentList,
  });
  const { data: teacher_id, isLoading: teacher_idLoading } = useQuery({
    queryKey: ["teacher_getTeacherID"],
    queryFn: getTeacher,
  });

  const studentTaskFilter = studentTask
    ? studentTask.filter((item) => item.teacher_id == teacher_id?.id)
    : [];

  const data = studentTaskFilter
    ? studentTaskFilter
        .map(
          ({
            id,
            firstname,
            middlename,
            lastname,
            task,
            status,
            tasImageUrl,
            deletedStatus,
            profile_url,
          }) => ({
            studentNo: id,
            name: `${firstname} ${lastname}`,
            status: 1,
            totalTask: task.length,
            image: pic,
            Task: task,
            lastUpload: task.flatMap(({ date }) => date)[
              task.flatMap(({ date }) => date).length - 1
            ],
            deletedStatus,
            url: profile_url,
          })
        )
        .filter((item) => item.deletedStatus === 0)
        .filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        )
    : [];

  const taskRecords = data.filter((student) => student.studentNo === StudentId);

  const Studentlist = data.filter((data) => {
    return searchInput.toLowerCase() === ""
      ? data
      : data.name.toLowerCase().includes(searchInput);
  });

  if (isLoading || teacher_idLoading) {
    return (
      <div className="fixed top-0 l-20 h-screen w-full bg-white flex mt-32 justify-center">
        <div className="flex flex-col gap-4">
          <PulseLoader
            color="#03A8F5"
            margin={8}
            size={15}
            speedMultiplier={1}
          />

          <span className="text-gray-400 text-2xl tracking-wider font-medium">
            Loading..
          </span>
        </div>
      </div>
    );
  }

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
};

export default StudentTask;
