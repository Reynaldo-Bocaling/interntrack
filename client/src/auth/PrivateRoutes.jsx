import React , {lazy} from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {  verifyUser } from "../api/Api";
import PulseLoader from "react-spinners/PulseLoader";

const Rootlayout = lazy(()=> import("../layouts/Rootlayout"));
const Login = lazy(()=> import("./Login"));

const ViewUploadTask = lazy(()=> import("../components/Student-Task/ViewUploadTask"));

// view Attendance Request Reuasable
const ViewAttendanceRequest = lazy(()=> import("../components/attendance-request/ViewAttendance"))

// view timesheets
const ViewTimesheets = lazy(()=> import("../components/StudentTimesheets/ViewTimesheets"));

// view user resubale
const TrainerInfoView = lazy(()=> import("../components/Trainer-Info/index"));
const StudentInfoView = lazy(()=> import("../components/Student-Info/index"));
const CoordinatorInfoView = lazy(()=> import("../components/Coordinator-Info/index"));
const TeacherInfoView = lazy(()=> import("../components/Teacher-Info/index"));

// student
const Attendance = lazy(()=> import("../pages/Student/Attendance"));
const Home = lazy(()=> import("../pages/Student/Home"));
const Profile = lazy(()=> import("../pages/Student/Profile"))
const Records = lazy(()=> import("../pages/Student/Records"));

const Announcement = lazy(()=> import("../pages/Student/Announcement"));

// SuperAdmin pages
const SuperAdminDashboard = lazy(()=> import("../pages/SuperAdmin/Dashboard"))
const SuperAdmin_Trainer_list  = lazy(()=> import("../pages/SuperAdmin/Trainer"));
const SuperAdmin_Student_list = lazy(()=> import("../pages/SuperAdmin/Student"));
const SuperAdmin_StudentInfoView = lazy(()=> import("../pages/SuperAdmin/StudentViewInfo"))
const SuperAdmin_Coordinator_list  = lazy(()=> import("../pages/SuperAdmin/Coordinator"));
const SuperAdmin_Teacher_list = lazy(()=>import("../pages/SuperAdmin/Teacher"));
const SuperAdmin_Company = lazy(()=>import("../pages/SuperAdmin/Companies"));
const SuperAdmin_DirectorInfo = lazy(()=>import("../pages/SuperAdmin/Director"));
const SuperAdmin_MyProfile = lazy(()=>import("../pages/SuperAdmin/MyProfile"));
const SuperAdmin_Settings = lazy(()=>import("../pages/SuperAdmin/Settings"));

// Trainer pages
const TrainerDashboard  = lazy(()=> import("../pages/Trainer/Dashboard"));
const Trainer_Student_list = lazy(()=> import("../pages/Trainer/Student_list"));
const Trainer_StudentTimesheets = lazy(()=> import("../pages/Trainer/Timesheet"));
const Trainer_studentDailylog = lazy(()=> import("../pages/Trainer/DailyLogs"));
const Trainer_StudentTask = lazy(()=> import("../pages/Trainer/StudentTask"));
const Trainer_StudentAttendanceRequest = lazy(()=> import("../pages/Trainer/AttendanceRequest"));
const TrainerMessage = lazy(()=> import("../pages/Trainer/Message"));
const TrainerAnnouncement = lazy(()=> import("../pages/Trainer/Announcement"));
const TrainerMyProfile = lazy(()=> import("../pages/Trainer/MyProfile"));
const TrainerSettings = lazy(()=> import("../pages/Trainer/Settings"));
const TrainerOldStudent = lazy(()=> import("../pages/Trainer/OldStudent"));

// Teacher pages
const TeacherDashboard =  lazy(()=>import ("../pages/Teacher/Dashboard"));
const TeacherrCompanies = lazy(()=> import("../pages/Teacher/Companies"));
const TeacherViewCompany = lazy(()=> import("../pages/Teacher/ViewCompany"));
const Teacher_Trainer_list = lazy(()=> import("../pages/Teacher/Trainer_list"));
const Teacher_Student_list = lazy(()=> import("../pages/Teacher/Student_list"));
const Teacher_StudentTimesheets = lazy(()=> import("../pages/Teacher/Timesheet"));
const Teacher_studentDailylog = lazy(()=> import("../pages/Teacher/DailyLogs"));
const Teacher_StudentTask = lazy(()=> import("../pages/Teacher/StudentTask"));
const TeacherMessage = lazy(()=> import("../pages/Teacher/Message"))
const TeacherAnnouncement = lazy(()=> import("../pages/Teacher/Announcement"));
const TeacherNyProfile = lazy(()=> import("../pages/Teacher/MyProfile"));
const TeacherSettings = lazy(()=> import("../pages/Teacher/Settings"));
const TeacherOldStudent = lazy(()=> import("../pages/Teacher/OldStudent"));
const TeacherWeeklyReportList = lazy(()=> import("../pages/Teacher/WeeklyReportList"));


// Coordinator pages
const CoordinatorDashboard = lazy(()=> import("../pages/Coordinator/Dashboard"));
const CoordinatorCompanies = lazy(()=> import("../pages/Coordinator/Companies"));
const CoordinatorViewCompany = lazy(()=> import("../pages/Coordinator/ViewCompany"));
const Coordinator_Trainer_list = lazy(()=> import("../pages/Coordinator/Trainer_list"));
const Coordinator_Student_list = lazy(()=> import("../pages/Coordinator/Student_list"));
const Coordinator_Teacher_list = lazy(()=> import("../pages/Coordinator/Teacher_list"));
const CoordinatorMessage = lazy(()=> import("../pages/Coordinator/Message"));
const CoordinatorAnnouncement = lazy(()=> import("../pages/Coordinator/Announcement"));
const CoordinatorMyProfile = lazy(()=> import("../pages/Coordinator/MyProfile"));
const CoordinatorSettings = lazy(()=> import("../pages/Coordinator/Settings"));
const CoordinatorOldStudent = lazy(()=> import("../pages/Coordinator/OldStudent"));
const CoordinatorWeeklyReportList = lazy(()=> import("../pages/Coordinator/WeeklyReportList"));

// Director pages
const DirectorDashboard = lazy(()=> import("../pages/Director/Dashboard"));
const DirectorCompanies = lazy(()=> import("../pages/Director/Companies"));
const DirectorStudentList = lazy(()=> import("../pages/Director/Student_list"));
const DirectorMoa = lazy(()=> import("../pages/Director/MOA"));
const DirectorViewCompany = lazy(()=> import("../pages/Director/ViewCompany"));
const DirectorMessage = lazy(()=> import("../pages/Director/Message"));
const DirectorAnnouncement = lazy(()=> import("../pages/Director/Announcement"));
const Director_Coordinator_list = lazy(()=> import("../pages/Director/Coordinator_list"));
const Director_Teacher_list = lazy(()=> import("../pages/Director/TeacherList"));
const DirectorMyProfile = lazy(()=> import("../pages/Director/MyProfile"));
const DirectorSettings = lazy(()=> import("../pages/Director/Settings"));
const DirectorOldStudent = lazy(()=> import("../pages/Director/OldStudent"));


const PrivateRoutes = () => {
  const {
    data: isRole,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getRole"],
    queryFn: verifyUser,
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
      {
        path: "/weekly-report",
        element: <CoordinatorWeeklyReportList />,
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
      {
        path: "/weekly-report",
        element: <TeacherWeeklyReportList />,
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
