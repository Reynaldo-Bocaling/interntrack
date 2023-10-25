import React from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { BiInfoCircle } from "react-icons/bi";
import { BsChatDots, BsFillTrash3Fill } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { AiOutlineFieldTime } from "react-icons/ai";
import pic from "../../assets/images/dp.png";
import { Tabs } from "@mantine/core";
import StudentIfo from "./StudentIfo";
import StudentRequirements from "./StudentRequirements";
import StudentTask from "./StudentTask";
import StudentTimesheet from "./StudentTimeSheet";
import { getStudentInfo } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import PulseLloader from "react-spinners/PulseLoader";


const StudentViewInfo = () => {
  const currentDate = new Date();
  const {id} = useParams();

  const { 
    data:studentlist ,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["studentinfo"],
    queryFn: ()=> getStudentInfo(id)
  });


  const info = {
    id: studentlist && studentlist.id,
    firstname: studentlist && studentlist.firstname,
    middlename: studentlist && studentlist.middlename,
    lastname: studentlist && studentlist.lastname,
    contact: studentlist && studentlist.contact,
    email: studentlist && studentlist.email,
    address: studentlist && studentlist.address,
    gender: studentlist && studentlist.gender,
    campus: studentlist && studentlist.campus,
    college: studentlist && studentlist.college,
    program: studentlist && studentlist.program,
    major: studentlist && studentlist.major,
    profile: studentlist && studentlist.profile,
    company:studentlist &&studentlist.AreaOfAssignment.company.companyName,
    teacher: studentlist && studentlist.teacher.firstname + ' ' + studentlist.teacher.lastname,
    trainer: studentlist && studentlist.trainer.firstname + ' ' + studentlist.trainer.lastname,
    areaAssignment:studentlist ? studentlist.AreaOfAssignment.areaName: ''
  }



  const timesheet = studentlist && studentlist.timesheet.filter((item) => new Date(item.date) <= currentDate);


  const requirementData = studentlist ? studentlist.requirement : null;

  const taskData = studentlist ? studentlist.task : null

if(isError){
  return <h1 className="text-center my-10">Something wrong!! Please try again</h1>
}
  return (
    <div className="rounded-xl overflow-hidden -mt-3 -ml-2">


      {isLoading ? (
        <h1 className="text-center my-14 py-5 border rounded-lg">
          <PulseLloader
            color="#1892fc"
            margin={5}
            size={13}
            speedMultiplier={1}
            className="mx-auto"
          />
        </h1>
      ) : (
<>

<div className="cover"></div>

      <div className="flex flex-col gap-3 border-b bg-white">
        <div className="flex items-center gap-3">
          <div className=" ml-7 -mt-52 bg-white w-52 h-44 p-5 border-white right rounded-full shadow-md overflow-hidden">
            <img
              className=" w-44 h-44 object-cover object-center mb-2 rounded-lg"
              src={pic}
              alt={"profile picture"}
            />
          </div>

          <div className="left p-5 pl-5 w-full py-5">
            <div className="flex flex-col gap-5">
              <div className="name ">
                <h1 className="text-2xl font-semibold tracking-wide">
                  {`${studentlist && studentlist.firstname } ${studentlist && studentlist.lastname}`}
                </h1>
                <small className="text-blue-500 font-semibold tracking-wider">
                  Trainee
                </small>
              </div>

              <div className="flex items-center gap-5 mb-3 font-semibold">
                <NavLink className="flex items-center gap-1 text-blue-500 text-sm bg-blue-100 py-2 px-4 rounded-md">
                  <BsChatDots />
                  Send message
                </NavLink>
                <NavLink className="flex items-center gap-1 text-red-500 text-sm bg-red-100 py-2 px-4 rounded-md">
                  <BsFillTrash3Fill />
                  Drop
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-7 -mt-5">
          <Tabs defaultValue="info" className="w-full">
            <div className="flex items-center gap-36 mb-3">
              <Link
                to="/student-list/"
                className="font-semibold tracking-wide text-blue-500 rounded-full  px-3 flex items-center"
              >
                <MdKeyboardArrowLeft size={20} />
                Back
              </Link>
              <Tabs.List className="flex gap-4">
                <Tabs.Tab
                  className="text-base text-gray-500 tracking-wide"
                  value="info"
                  icon={<BiInfoCircle />}
                >
                  <p>Info</p>
                </Tabs.Tab>
                <Tabs.Tab
                  className="text-base text-gray-500 tracking-wide"
                  value="requirement"
                  icon={<HiOutlineDocumentDuplicate />}
                >
                  Requirements
                </Tabs.Tab>
                <Tabs.Tab
                  className="text-base text-gray-500 tracking-wide"
                  value="task"
                  icon={<GoTasklist />}
                >
                  Task
                </Tabs.Tab>
                <Tabs.Tab
                  className="text-base text-gray-500 tracking-wide"
                  value="timesheet"
                  icon={<AiOutlineFieldTime />}
                >
                  Timesheet
                </Tabs.Tab>
              </Tabs.List>
            </div>

            <Tabs.Panel value="info" pt="xs">
              <StudentIfo data={info} isLoading={isLoading} />
            </Tabs.Panel>
            <Tabs.Panel value="requirement" pt="xs">
              <StudentRequirements data={requirementData} />
            </Tabs.Panel>
            <Tabs.Panel value="task" pt="xs">
              <StudentTask data={taskData} />
            </Tabs.Panel>
            <Tabs.Panel value="timesheet" pt="xs">
              <StudentTimesheet data={timesheet}  />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
</>
      )}
      
    </div>
  );
};

export default StudentViewInfo;
