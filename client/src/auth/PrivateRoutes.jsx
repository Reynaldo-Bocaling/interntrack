import React, {useEffect, useState } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { verifyToken } from "../api/Api";
import PulseLoader from "react-spinners/PulseLoader";

import Rootlayout from "../layouts/Rootlayout"
import Login from "./Login"

import  ViewUploadTask from "../components/Student-Task/ViewUploadTask"

// view Attendance Request Reuasable
import ViewAttendanceRequest from "../components/attendance-request/ViewAttendance";

// view timesheets
import ViewTimesheets from "../components/StudentTimesheets/ViewTimesheets"

// view user resubale
import TrainerInfoView from "../components/Trainer-Info/index"
import StudentInfoView from "../components/Student-Info/index"
import CoordinatorInfoView from "../components/Coordinator-Info/index"
import TeacherInfoView from "../components/Teacher-Info/index"

// student
import Activities from "../pages/Student/Activities"
import Attendance from "../pages/Student/Attendance"
import AttendanceRequest from "../pages/Student/Attendance_request"
import DailyLogs from "../pages/Student/DailyLogs"
import Home from "../pages/Student/Home"
import Profile from "../pages/Student/Profile"
import Timesheet from "../pages/Student/TimeSheet"
import Weekly from "../pages/Student/WeeklyReport"
import ViewWeeklyReport from "../components/Weekly-Report/WeeklyReport"
import Records from "../pages/Student/Records"
import Info from "../components/Student-profile/Information"
import Requirements from "../components/Student-profile/Requirements"
import Security from "../components/Student-profile/Security"

// SuperAdmin pages
import SuperAdminDashboard from "../pages/SuperAdmin/Dashboard"
import SuperAdmin_Trainer_list from "../pages/SuperAdmin/Trainer"
import SuperAdmin_Student_list from "../pages/SuperAdmin/Student"
import SuperAdmin_StudentInfoView from "../pages/SuperAdmin/StudentViewInfo"
import SuperAdmin_Coordinator_list from "../pages/SuperAdmin/Coordinator"
import SuperAdmin_Teacher_list from "../pages/SuperAdmin/Teacher"
import SuperAdmin_Company from "../pages/SuperAdmin/Companies"
import SuperAdmin_DirectorInfo from "../pages/SuperAdmin/Director"

// Trainer pages
import TrainerDashboard from "../pages/Trainer/Dashboard"
import Trainer_Student_list from "../pages/Trainer/Student_list"
import Trainer_StudentTimesheets from "../pages/Trainer/Timesheet"
import Trainer_studentDailylog from "../pages/Trainer/DailyLogs"
import Trainer_StudentTask from "../pages/Trainer/StudentTask"
import Trainer_StudentAttendanceRequest from "../pages/Trainer/AttendanceRequest"
import Trainer_StudentLeave from "../pages/Trainer/LeaveRequest"
import TrainerMessage from "../pages/Trainer/Message"
import TrainerAnnouncement from "../pages/Trainer/Announcement"

// Teacher pages
import TeacherDashboard from "../pages/Teacher/Dashboard"
import TeacherrCompanies from "../pages/Teacher/Companies"
import TeacherViewCompany from "../pages/Director/ViewCompany"
import Teacher_Trainer_list from "../pages/Teacher/Trainer_list"
import Teacher_Student_list from "../pages/Teacher/Student_list"
import Teacher_StudentTimesheets from "../pages/Teacher/Timesheet"
import Teacher_studentDailylog from "../pages/Teacher/DailyLogs"
import Teacher_StudentTask from "../pages/Teacher/StudentTask"
import Teacher_StudentLeave from "../pages/Teacher/LeaveRequest"
import TeacherMessage from "../pages/Teacher/Message"
import TeacherAnnouncement from "../pages/Teacher/Announcement"

// Coordinator pages
import CoordinatorDashboard from "../pages/Coordinator/Dashboard"
import CoordinatorCompanies from "../pages/Coordinator/Companies"
import CoordinatorViewCompany from "../pages/Director/ViewCompany"
import Coordinator_Trainer_list from "../pages/Coordinator/Trainer_list"
import Coordinator_Student_list from "../pages/Coordinator/Student_list"
import Coordinator_Teacher_list from "../pages/Coordinator/Teacher_list"
import Coordinator_StudentLeave from "../pages/Coordinator/LeaveRequest"
import CoordinatorMessage from "../pages/Coordinator/Message"
import CoordinatorAnnouncement from "../pages/Coordinator/Announcement"

// Director pages
import DirectorDashboard from "../pages/Director/Dashboard"
import DirectorCompanies from "../pages/Director/Companies"
import DirectorStudentList from "../pages/Director/Student_list"
import DirectorMoa from "../pages/Director/MOA"
import DirectorViewCompany from "../pages/Director/ViewCompany"
import DirectorMessage from "../pages/Director/Message"
import DirectorAnnouncement from "../pages/Director/Announcement"
import Director_Coordinator_list from "../pages/Director/Coordinator_list"
import Director_Teacher_list from "../pages/Director/TeacherList"


const PrivateRoutes = () => {
  const navigate = useNavigate();
  const [isLogged, setIslogged] = useState(false);

  const {
    data: isRole,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getRole"],
    queryFn: verifyToken,
  });

  useEffect(() => {
    if (isRole === "Unauthorized" || isError) {
      setIslogged(false);
    } else {
      setIslogged(true);
    }
  }, [isError, isRole, navigate]);

  if (isLoading) {
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

  const roleRoutes = {
    SuperAdmin: [
      {
        path: "/",
        element: <SuperAdminDashboard />,
      },
      {
        path: "/Companies",
        element: <SuperAdmin_Company />,
      },
      {
        path: "/Trainer-list",
        element: <SuperAdmin_Trainer_list />,
      },
      {
        path: "/Student-list",
        element: <SuperAdmin_Student_list />,
      },
      {
        path: "/Teacher-list",
        element: <SuperAdmin_Teacher_list />,
      },
      {
        path: "/Coordinator-list",
        element: <SuperAdmin_Coordinator_list />,
      },
      {
        path: "/Teacher-list",
        element: <SuperAdmin_Coordinator_list />,
      },
      {
        path: "/view-student/:id",
        element: <SuperAdmin_StudentInfoView />,
      },
      {
        path: "/director",
        element: <SuperAdmin_DirectorInfo />,
      },
    ],

    Director: [
      {
        path: "/",
        element: <DirectorDashboard />,
      },
      {
        path: "/Companies",
        element: <DirectorCompanies />,
      },
      {
        path: "/moa",
        element: <DirectorMoa />,
      },
      {
        path: "/coordinator-list",
        element: <Director_Coordinator_list />,
      },
      {
        path: "/teacher-list",
        element: <Director_Teacher_list />,
      },
      {
        path: "/view-teacher/:id",
        element: <TeacherInfoView />,
      },
      {
        path: "/message",
        element: <DirectorMessage />,
      },
      {
        path: "/announcement",
        element: <DirectorAnnouncement />,
      },
      {
        path: "/moa",
        element: <DirectorMoa />,
      },
      {
        path: "/student-list",
        element: <DirectorStudentList />,
      },
      {
        path: "/view-student/:id",
        element: <StudentInfoView />,
      },
      {
        path: "/view-coordinator/:id",
        element: <CoordinatorInfoView />,
      },

      {
        path: "/view-company/:id",
        element: <DirectorViewCompany />,
      },
    ],

    Coordinator: [
      {
        path: "/",
        element: <CoordinatorDashboard />,
      },
      {
        path: "/Companies",
        element: <CoordinatorCompanies />,
      },
      {
        path: "/trainer-list",
        element: <Coordinator_Trainer_list />,
      },
      {
        path: "/teacher-list",
        element: <Coordinator_Teacher_list />,
      },
      {
        path: "/student-list",
        element: <Coordinator_Student_list />,
      },
      {
        path: "/view-trainer/:id",
        element: <TrainerInfoView />,
      },
      {
        path: "/view-teacher/:id",
        element: <TeacherInfoView />,
      },

      {
        path: "/view-timeSheet",
        element: <ViewTimesheets />,
      },
      
      {
        path: "/StudentTask/view",
        element: <ViewUploadTask />,
      },
      {
        path: "/leave-request",
        element: <Coordinator_StudentLeave />,
      },
      {
        path: "/message",
        element: <CoordinatorMessage />,
      },
      {
        path: "/announcement",
        element: <CoordinatorAnnouncement />,
      },
      {
        path: "/view-student/:id",
        element: <StudentInfoView />,
      },
      {
        path: "/view-company/:id",
        element: <CoordinatorViewCompany />,
      },
    ],

    Teacher: [
      {
        path: "/",
        element: <TeacherDashboard />,
      },
      {
        path: "/trainer-list",
        element: <Teacher_Trainer_list />,
      },
      {
        path: "/companies",
        element: <TeacherrCompanies />,
      },
      {
        path: "/student-list",
        element: <Teacher_Student_list />,
      },
      {
        path: "/timeSheet",
        element: <Teacher_StudentTimesheets />,
      },
      {
        path: "/view-timeSheet",
        element: <ViewTimesheets />,
      },
      {
        path: "/StudentTask",
        element: <Teacher_StudentTask />,
      },
      {
        path: "/StudentTask/view",
        element: <ViewUploadTask />,
      },
      {
        path: "/view-trainer/:id",
        element: <TrainerInfoView />,
      },
      {
        path: "/daily-logs",
        element: <Teacher_studentDailylog />,
      },
      {
        path: "/leave-request",
        element: <Teacher_StudentLeave />,
      },
      {
        path: "/message",
        element: <TeacherMessage />,
      },
      {
        path: "/announcement",
        element: <TeacherAnnouncement />,
      },
      {
        path: "/view-student/:id",
        element: <StudentInfoView />,
      },
      {
        path: "/view-company/:id",
        element: <TeacherViewCompany />,
      },
    ],

    Trainer: [
      {
        path: "/",
        element: <TrainerDashboard />,
      },
      {
        path: "/student-list",
        element: <Trainer_Student_list />,
      },
      {
        path: "/timeSheet",
        element: <Trainer_StudentTimesheets />,
      },
      {
        path: "/view-timeSheet",
        element: <ViewTimesheets />,
      },
      {
        path: "/StudentTask",
        element: <Trainer_StudentTask />,
      },
      {
        path: "/StudentTask/view",
        element: <ViewUploadTask />,
      },
      {
        path: "/daily-logs",
        element: <Trainer_studentDailylog />,
      },
      {
        path: "/Attendance-request",
        element: <Trainer_StudentAttendanceRequest />,
      },
      {
        path: "/Attendance-request/view/:id",
        element: <ViewAttendanceRequest />,
      },
      {
        path: "/leave-request",
        element: <Trainer_StudentLeave />,
      },
      {
        path: "/message",
        element: <TrainerMessage />,
      },
      {
        path: "/announcement",
        element: <TrainerAnnouncement />,
      },
      {
        path: "/view-student/:id",
        element: <StudentInfoView />,
      },
    ],


    Student: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/weeklyreport",
        element: <ViewWeeklyReport />,
      },
      {
        path: "/Profile/",
        element: <Profile />,
        children: [
          {
            path: "/Profile/",
            element: <Info />,
          },
          {
            path: "/Profile/security",
            element: <Security />,
          },
          {
            path: "/Profile/requirements",
            element: <Requirements />,
          },
        ],
      },

      {
        path: "/Attendance/",
        element: <Attendance />,
        children: [
          {
            path: "/Attendance/",
            element: <DailyLogs />,
          },
          {
            path: "/Attendance/Attendance-request",
            element: <AttendanceRequest />,
          },
        ],
      },

      {
        path: "/record/",
        element: <Records />,
        children: [
          {
            path: "/record/",
            element: <Weekly />,
          },
          {
            path: "/record/timesheet",
            element: <Timesheet />,
          },
          {
            path: "/record/activites",
            element: <Activities />,
          },
        ],
      },
    ],
  };

  const userRoutes = roleRoutes[isRole] || [];

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={!isLogged ? <Login /> : <Rootlayout role={isRole} />}
        >
          {userRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children &&
                route.children.map((childRoute, childIndex) => (
                  <Route
                    key={childIndex}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
            </Route>
          ))}
        </Route>
      </Routes>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default PrivateRoutes;
