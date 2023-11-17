import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { verifyToken } from "../api/Api";
import PulseLoader from "react-spinners/PulseLoader";

import Rootlayout from "../layouts/Rootlayout";
import Login from "./Login";

import ViewUploadTask from "../components/Student-Task/ViewUploadTask";

// view Attendance Request Reuasable
import ViewAttendanceRequest from "../components/attendance-request/ViewAttendance";

// view timesheets
import ViewTimesheets from "../components/StudentTimesheets/ViewTimesheets";

// view user resubale
import TrainerInfoView from "../components/Trainer-Info/index";
import StudentInfoView from "../components/Student-Info/index";
import CoordinatorInfoView from "../components/Coordinator-Info/index";
import TeacherInfoView from "../components/Teacher-Info/index";

// student
import Attendance from "../pages/Student/Attendance";
import Home from "../pages/Student/Home";
import Profile from "../pages/Student/Profile";
import Records from "../pages/Student/Records";

import Announcement from "../pages/Student/Announcement";

// SuperAdmin pages
import SuperAdminDashboard from "../pages/SuperAdmin/Dashboard";
import SuperAdmin_Trainer_list from "../pages/SuperAdmin/Trainer";
import SuperAdmin_Student_list from "../pages/SuperAdmin/Student";
import SuperAdmin_StudentInfoView from "../pages/SuperAdmin/StudentViewInfo";
import SuperAdmin_Coordinator_list from "../pages/SuperAdmin/Coordinator";
import SuperAdmin_Teacher_list from "../pages/SuperAdmin/Teacher";
import SuperAdmin_Company from "../pages/SuperAdmin/Companies";
import SuperAdmin_DirectorInfo from "../pages/SuperAdmin/Director";
import SuperAdmin_MyProfile from "../pages/SuperAdmin/MyProfile";
import SuperAdmin_Settings from "../pages/SuperAdmin/Settings";

// Trainer pages
import TrainerDashboard from "../pages/Trainer/Dashboard";
import Trainer_Student_list from "../pages/Trainer/Student_list";
import Trainer_StudentTimesheets from "../pages/Trainer/Timesheet";
import Trainer_studentDailylog from "../pages/Trainer/DailyLogs";
import Trainer_StudentTask from "../pages/Trainer/StudentTask";
import Trainer_StudentAttendanceRequest from "../pages/Trainer/AttendanceRequest";
import TrainerMessage from "../pages/Trainer/Message";
import TrainerAnnouncement from "../pages/Trainer/Announcement";
import TrainerMyProfile from "../pages/Trainer/MyProfile";
import TrainerSettings from "../pages/Trainer/Settings";
import TrainerOldStudent from "../pages/Trainer/OldStudent";

// Teacher pages
import TeacherDashboard from "../pages/Teacher/Dashboard";
import TeacherrCompanies from "../pages/Teacher/Companies";
import TeacherViewCompany from "../pages/Teacher/ViewCompany";
import Teacher_Trainer_list from "../pages/Teacher/Trainer_list";
import Teacher_Student_list from "../pages/Teacher/Student_list";
import Teacher_StudentTimesheets from "../pages/Teacher/Timesheet";
import Teacher_studentDailylog from "../pages/Teacher/DailyLogs";
import Teacher_StudentTask from "../pages/Teacher/StudentTask";
import TeacherMessage from "../pages/Teacher/Message";
import TeacherAnnouncement from "../pages/Teacher/Announcement";
import TeacherNyProfile from "../pages/Teacher/MyProfile";
import TeacherSettings from "../pages/Teacher/Settings";
import TeacherOldStudent from "../pages/Teacher/OldStudent";

// Coordinator pages
import CoordinatorDashboard from "../pages/Coordinator/Dashboard";
import CoordinatorCompanies from "../pages/Coordinator/Companies";
import CoordinatorViewCompany from "../pages/Coordinator/ViewCompany";
import Coordinator_Trainer_list from "../pages/Coordinator/Trainer_list";
import Coordinator_Student_list from "../pages/Coordinator/Student_list";
import Coordinator_Teacher_list from "../pages/Coordinator/Teacher_list";
import CoordinatorMessage from "../pages/Coordinator/Message";
import CoordinatorAnnouncement from "../pages/Coordinator/Announcement";
import CoordinatorMyProfile from "../pages/Coordinator/MyProfile";
import CoordinatorSettings from "../pages/Coordinator/Settings";
import CoordinatorOldStudent from "../pages/Coordinator/OldStudent";

// Director pages
import DirectorDashboard from "../pages/Director/Dashboard";
import DirectorCompanies from "../pages/Director/Companies";
import DirectorStudentList from "../pages/Director/Student_list";
import DirectorMoa from "../pages/Director/MOA";
import DirectorViewCompany from "../pages/Director/ViewCompany";
import DirectorMessage from "../pages/Director/Message";
import DirectorAnnouncement from "../pages/Director/Announcement";
import Director_Coordinator_list from "../pages/Director/Coordinator_list";
import Director_Teacher_list from "../pages/Director/TeacherList";
import DirectorMyProfile from "../pages/Director/MyProfile";
import DirectorSettings from "../pages/Director/Settings";
import DirectorOldStudent from "../pages/Director/OldStudent";

const PrivateRoutes = () => {
  const {
    data: isRole,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getRole"],
    queryFn: verifyToken,
  });

  const isLogged = !(isRole === "Unauthorized" || isError);

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
      {
        path: "/MyProfile",
        element: <SuperAdmin_MyProfile />,
      },
      {
        path: "/Settings",
        element: <SuperAdmin_Settings />,
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
      {
        path: "/MyProfile",
        element: <DirectorMyProfile />,
      },
      {
        path: "/Settings",
        element: <DirectorSettings />,
      },
      {
        path: "/old-students",
        element: <DirectorOldStudent />,
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
      {
        path: "/MyProfile",
        element: <CoordinatorMyProfile />,
      },
      {
        path: "/Settings",
        element: <CoordinatorSettings />,
      },
      {
        path: "/old-students",
        element: <CoordinatorOldStudent />,
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
      {
        path: "/MyProfile",
        element: <TeacherNyProfile />,
      },
      {
        path: "/Settings/",
        element: <TeacherSettings />,
      },
      {
        path: "/old-students",
        element: <TeacherOldStudent />,
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
      {
        path: "/MyProfile",
        element: <TrainerMyProfile />,
      },
      {
        path: "/Settings",
        element: <TrainerSettings />,
      },
      {
        path: "/old-students",
        element: <TrainerOldStudent />,
      },
    ],

    Student: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Attendance",
        element: <Attendance />,
      },

      {
        path: "/Profile",
        element: <Profile />,
      },

      {
        path: "/record",
        element: <Records />,
      },
      {
        path: "/Announcement",
        element: <Announcement />,
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
