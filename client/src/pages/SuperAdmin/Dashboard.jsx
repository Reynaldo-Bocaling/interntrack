import React from "react";
import { FiUsers } from "react-icons/fi";
import { FcCalendar } from "react-icons/fc";
import { PiBuildingsBold, PiUsersThree } from "react-icons/pi";
import DateNow from "../../components/Dates/DateNow";
import LineChart from "../../components/charts/SuperAdminLineChart";
import {
  getCompanyList,
  getCoordinatorList,
  getStudentList,
  getTeacherList,
  getTrainerList,
} from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const Dashboard = () => {
  const { data: company, isLoading: companyLoading } = useQuery({
    queryKey: ["getCompanyList"],
    queryFn: getCompanyList,
  });

  const { data: coordinatorList, isLoading: coordinatorLoading } = useQuery({
    queryKey: ["getCoordinatorList"],
    queryFn: getCoordinatorList,
  });

  const { data: teacherList, isLoading: teacherLoading } = useQuery({
    queryKey: ["getTeacherList"],
    queryFn: getTeacherList,
  });
  const { data: trainerList, isLoading: trainerLoading } = useQuery({
    queryKey: ["getTrainer22"],
    queryFn: getTrainerList,
  });

  const { data: StudentList, isLoading: studentLoading } = useQuery({
    queryKey: ["getStudentList2222"],
    queryFn: getStudentList,
  });

  const totalNewStudent = StudentList
    ? StudentList.filter((item) => item.deletedStatus === 0).length
    : [];
  const totalOldStudent = StudentList
    ? StudentList.filter((item) => item.deletedStatus === 1).length
    : [];
  const totalCoordinator = coordinatorList ? coordinatorList.length : [];
  const totalTeacher = teacherList ? teacherList.length : [];
  const totalTrainer = trainerList ? trainerList.length : [];
  const companyList = company ? company.length : [];

  const countBox = [
    {
      label: "New Students",
      icon: PiUsersThree,
      total: totalNewStudent,
      iconSize: 23,
      textColor: "text-green-500",
      // bgColor: 'bg-blue-100'
    },
    {
      label: "Old Student",
      icon: PiUsersThree,
      total: totalOldStudent,
      iconSize: 20,
      textColor: "text-red-500",
      // bgColor: 'bg-blue-100'
    },
    {
      label: "Trainers",
      icon: FiUsers,
      total: totalTrainer,
      iconSize: 18,
      textColor: "text-blue-500",
      // bgColor: 'bg-blue-100'
    },
    {
      label: "Teachers",
      icon: FiUsers,
      total: totalTeacher,
      iconSize: 18,
      textColor: "text-blue-500",
      // bgColor: 'bg-blue-100'
    },
    {
      label: "Coordinators",
      icon: FiUsers,
      total: totalCoordinator,
      iconSize: 18,
      textColor: "text-blue-500",
      // bgColor: 'bg-blue-100'
    },

    {
      label: "Company",
      icon: PiBuildingsBold,
      total: companyList,
      iconSize: 18,
      textColor: "text-violet-500",
      // bgColor: 'bg-blue-100'
    },
  ];

  const totalAllStudent = StudentList
    ? StudentList.map(({ createAt }) => format(new Date(createAt), "yyyy"))
    : [];

  const getBatchStudent = totalAllStudent.reduce((total, student) => {
    const studentY = student;
    total[studentY] = (total[studentY] || 0) + 1;
    return total;
  }, {});

  for (let i = 0; i < 6; i++) {
    // const year = Number(format(new Date(totalAllStudent[0]), 'yyyy')) + i;
    const year = 2023 + i;
    if (!getBatchStudent[year]) {
      getBatchStudent[year] = 0;
    }
  }

  console.log(totalAllStudent[0]);
  const graphData = [
    {
      name: "Students",
      data: Object.values(getBatchStudent),
      color: "#00C6FD",
      fillColor: "rgba(255, 0, 0, 0.3)",
    },
  ];

  if (
    companyLoading ||
    coordinatorLoading ||
    teacherLoading ||
    trainerLoading ||
    studentLoading
  ) {
    return <center className="my-5 text-lg">Computing..</center>;
  }

  return (
    <div className="min-h-full w-full">
      <div className="m-1 ">
        <div className="w-full flex flex-col">
          <div className="left-content flex  items-center justify-between mb-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold tracking-wider text-gray-700">
                Super admin overview
              </h1>
              <small className="text-blue-500 font-semibold tracking-wider">
                Super admin Dashboard
              </small>
            </div>
            <div className="flex items-center gap-3">
              <FcCalendar />
              <DateNow />
            </div>
          </div>

          <section className="grid grid-cols-4 grid-rows-5 gap-3">
            <div className="col-span-2 h-[160px] row-span-2 grid grid-cols-3 gap-[1.2px] bg-violet-100 rounded-lg shadow-xl overflow-hidden shadow-[#f4f2f2] border border-[#ecf0f1]">
              {countBox.map((item, i) => (
                <div
                  key={i}
                  className="bg-white flex items-center justify-between px-5"
                >
                  <div className={` ${item.textColor} p-2  rounded-full`}>
                    <item.icon size={item.iconSize} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium">{item.total}</span>
                    <small className="text-gray-500 text-[0.7rem]">
                      {item.label}
                    </small>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-2 col-start-3 row-start-1 row-end-6 bg-white rounded-lg p-3 shadow-xl overflow-hidden shadow-[#f4f2f2] border border-[#ecf0f1]">
              <p className="text-base font-semibold mt-3 ml-3">
                Total Students per year
              </p>
              <LineChart
                data={graphData}
                sizeHeight={300}
                years={Object.keys(getBatchStudent)}
              />
            </div>

            <div className="row-span-3 bg-white rounded-lg p-3 shadow-xl overflow-hidden shadow-[#f4f2f2] border border-[#ecf0f1] text-gray-500 flex flex-col items-center py-7">
              Under Development{" "}
              <span className="text-red-500 text-3xl">--</span>
            </div>
            <div className="row-span-3 bg-white rounded-lg p-3 shadow-xl overflow-hidden shadow-[#f4f2f2] border border-[#ecf0f1] text-gray-500 flex flex-col items-center py-7">
              Under Development{" "}
              <span className="text-red-500 text-3xl">--</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
