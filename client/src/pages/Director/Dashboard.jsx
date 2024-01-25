import React, { lazy } from "react";
import { FiUsers } from "react-icons/fi";
import { FcCalendar } from "react-icons/fc";
import { PiBuildingsBold } from "react-icons/pi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CircularProgressbar } from "react-circular-progressbar";
const DateNow = lazy(()=> import("../../components/Dates/DateNow"));
const LineChart = lazy(()=> import("../../components/charts/LineChart"));
import coverDirector from "../../assets/images/DirectorCover.png";
import { getCampus, getCompanyList, getCoordinatorList, getDirector, getStudentList, getTeacherList } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const Dashboard = () => {
  const formattedDate = format(new Date(), "yyyy-MM-dd");


  const {
    data: getDirectorInfo, isLoading: directorLoading
  } = useQuery({
    queryKey: ["getDirector"],
    queryFn: getDirector,
  });



  const {
    data: company, isLoading: companyLoading
  } = useQuery({
    queryKey: ["getCompanyList"],
    queryFn: getCompanyList,
  });


  const {
    data: StudentList,
    isLoading: studentLoading
  } = useQuery({
    queryKey: ["getStudentList"],
    queryFn: getStudentList,
  });


  const {
    data: coordinatorList, isLoading: coordinatorLoading
  } = useQuery({
    queryKey: ["getCoordinatorList"],
    queryFn: getCoordinatorList,
  });

  const  {
    data: teacherList, isLoading: teacherLoading
  } = useQuery({
    queryKey: ["getTeacherList"],
    queryFn: getTeacherList
  });

  
  const { data: getProgram, isLoading: programLoading } = useQuery({
    queryKey: ["getProgram"],
    queryFn: getCampus,
  });



  if(directorLoading || companyLoading || coordinatorLoading|| teacherLoading || programLoading || studentLoading) {
    return <center className="my-5 text-lg">Computing..</center>
  }



  const programList = getProgram
  ? getProgram.flatMap(({ college }) =>
      college?.flatMap(({ program }) => program)
    ).map(({trainingHours,program_description}) => ({trainingHours,program_description}) )
  : [];




  const getTime = StudentList 
  ? StudentList.flatMap(({timesheet}) => timesheet)
  .find((item)=> item.date === formattedDate)
  : []
  

  const getWeek = StudentList 
  ? StudentList.flatMap(({ timesheet }) => timesheet)
    .filter((item) => item.week === getTime?.week)
    .map(({ date, totalHours }) => ({
      date: format(new Date(date), "dd"),
      day: format(new Date(date), "EEEE"),
      totalHours
    }))
    .reduce((acc, { day, totalHours }) => {
      if (['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(day)) {
        acc[day] = (acc[day] || 0) + totalHours;
      }
      return acc;
    }, {})
  : {};
  


  
 

  const totalStudent = StudentList ? StudentList .filter((item) => item.deletedStatus ===0).length : [];
  const totalCoordinator = coordinatorList ? coordinatorList.length : [];
  const totalTeacher = teacherList ? teacherList.length : [];
  const companyList = company ? company.length : [];


 


  const totalAllHoursStudent = StudentList
  ?StudentList.map(({ program}) => 
  programList.find((item)=> item.program_description === program)?.trainingHours)
  .reduce((total, item) => total + item, 0)
:[]


const totalHoursStudent = StudentList
?StudentList
.flatMap(({ timesheet }) => timesheet)
.filter((item)=>item.logStatus === 1)
.reduce((total, item) => total + item.totalHours, 0)
:[];

const percentage = Math.floor(
(Math.round(totalHoursStudent) / totalAllHoursStudent) * 100
);


 

  const totalAssign = `${
    (StudentList.filter(
      (item) => item.trainer !== null && item.areaAssigned_id !== null
    ).length)}`;
  const totalUnAssign = `${
    (StudentList.filter(
      (item) => item.trainer === null && item.areaAssigned_id === null
    ).length )}`;



    const totalSlot = company
    ? company.flatMap(({areaOfAssignment}) => areaOfAssignment)
    .reduce((total, item) => total + item.slot, 0) - totalAssign
    :[] 



  const graphData = [
    {
      name: "Hours",
      data: Object.values(getWeek),
      color: "#00C6FD",
      fillColor: "rgba(255, 0, 0, 0.3)",
    },
  ];

  const countBox = [
    {
      label: "Student",
      totalCount: totalStudent,
      icon: FiUsers,
      iconBackground: "text-sky-500 bg-sky-100",
      ShadowColor: "shadow-red-50",
      extraText: [
        { label: "Assigned", totalCount: totalAssign, color: "text-green-500" },
        { label: "Unassigned", totalCount: totalUnAssign, color: "text-red-500" },
      ],
    },
    {
      label: "Coordinator",
      totalCount: totalCoordinator,
      icon: FiUsers,
      iconBackground: "text-green-500 bg-green-100",
      ShadowColor: "shadow-green-50",
    },
    {
      label: "Teacher",
      totalCount: totalTeacher,
      icon: FiUsers,
      iconBackground: "text-violet-500 bg-violet-100",
      ShadowColor: "shadow-red-50",
    },
    {
      label: "Company",
      totalCount: companyList,
      icon: PiBuildingsBold,
      iconBackground: "text-orange-500 bg-orange-100",
      ShadowColor: "shadow-blue-50",
      extraText: [
        { label: "Available slots", totalCount: totalSlot, color: "text-green-500" },
      ],
    },
  ];



  return (
    <>
       <div className="left-content flex  items-center justify-between mb-4">
            <div className="flex flex-col gap-2">
              <h1 className=" text-sm md:text-xl font-semibold tracking-wider text-gray-700">
                Director overview
              </h1>
              <small className="text-[0.6rem] text-blue-500 font-semibold tracking-wider">
                Director Dashboard
              </small>
            </div>
            <div className="flex items-center gap-3">
              <FcCalendar />
              <DateNow />
            </div>
          </div>
      <div className="flex flex-col md:flex md:flex-row gap-3">
        <div className="flex flex-col gap-3 w-full md:w-[70%]">

        <div className="relative col-span-4 h-auto bg-white rounded-lg p-3 shadow-xl overflow-hidden shadow-[#f4f2f2] border border-[#ecf0f1]">
          <img
            src={coverDirector}
            alt=""
            className="absolute -top-3 right-1 w-[200px]"
          />

          <div className="p-3">
            <p className="">
              Hello, <span className="font-semibold capitalize tracking-wide">{getDirectorInfo?.firstname}</span>
            </p>
            <p className="text-xs text-gray-500 max-w-[70%] w-full mt-3 tracking-wider">
              Your centralized control for overseeing OJT programs, tracking
              trainee progress, and accessing vital data and resources to ensure
              a successful training experience."
            </p>
            <button className="bg-sky-100 text-sky-500 text-xs font-medium py-2 px-8 mt-4 rounded-lg">
              View
            </button>
          </div>
        </div>
        <div className="col-span-4 row-span-2 bg-white rounded-lg  p-2 pb-10 shadow-xl shadow-blue-50 border border-[#ecf0f1]">
          <p className="text-base font-semibold mt-5 ml-4 mb-3">
            Student Hours rate per week
          </p>
          <div>
            <LineChart data={graphData} sizeHeight={260} />
          </div>
        </div>


        </div>
        

        <div className="flex flex-col  gap-3 sm:w-full md:w-[35%] ">
        <div className="grid grid-cols-2 gap-3 ">
          {countBox.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg py-5 px-3  shadow-md shadow-[#f2f4f5] border border-[#ecf0f1]"
            >
              <BiDotsVerticalRounded className="absolute right-3 top-3" />
              <div className={`${item.iconBackground} p-2 rounded-lg w-[33px]`}>
                <item.icon size={18} />
              </div>
              <p className="text-xs text-gray-500 tracking-wide mt-5 mb-2">
                {item.label}
              </p>
              <p className="text-lg font-bold pl-3">{item.totalCount}</p>
              {item.extraText && (
                <div className=" text-xs flex items-center justify-between gap-2 mt-1">
                  {item.extraText.map((text, i) => (
                    <p
                      key={i}
                      className={`${text.color} flex flex-col items-center justify-center`}
                    >
                      {text.label}:{" "}
                      <span className="font-medium">{text.totalCount}</span>
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="col-span-2 bg-white rounded-lg shadow-xl p-3 shadow-blue-50 border border-[#ecf0f1] flex flex-col items-center justify-center">
              <p className="text-lg font-semibold">Student Completion Rate</p>
              <div className="max-w-[200px] w-full p-4 ">
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage} %`}
                  styles={{
                    path: { stroke: `#20D117` },
                    trail: { stroke: "#E4F5E4", strokeWidth: 10 },
                    text: {
                      fill: `#333`,
                      fontSize: `1rem`,
                      fontWeight: 600,
                      dominantBaseline: "middle",
                      textAnchor: "middle",
                    },
                  }}
                  strokeWidth={10}
                />
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
