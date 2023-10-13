import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { verifyToken } from "../api/Api";

// auth
const Rootlayout = lazy(() => import("../layouts/Rootlayout"));
const Login = lazy(() => import("./Login"));
import PulseLoader from "react-spinners/PulseLoader";

// testzy
const ViewUploadTask = lazy(() =>
  import("../components/Student-Task/ViewUploadTask")
);

// view Attendance REquesr Reuasable
const ViewAttendanceRequest = lazy(() =>
  import("../components/attendance-request/ViewAttendance")
);

// view timesheets
const ViewTimesheets = lazy(() =>
  import("../components/StudentTimesheets/ViewTimesheets")
);

// view trainer resubale
const TrainerInfoView = lazy(() => import("../components/Trainer-Info/index"));

const StudentInfoView = lazy(() => import("../components/Student-Info/index"));
const CoordinatorInfoView = lazy(() =>
  import("../components/Coordinator-Info/index")
);
const TeacherInfoView = lazy(() => import("../components/Teacher-Info/index"));

// Student pages
const StudentDashboard = lazy(() => import("../pages/Student/Dashboard"));
const StudentTimesheets = lazy(() => import("../pages/Student/Timesheet"));
const StudentDailylog = lazy(() => import("../pages/Student/DailyLogs"));
const StudentUploadTask = lazy(() => import("../pages/Student/StudentTask"));
const StudentAttendanceRequest = lazy(() =>
  import("../pages/Student/AttendanceRequest")
);
const StudentLeave = lazy(() => import("../pages/Student/LeaveRequest"));
const StudentMessage = lazy(() => import("../pages/Student/Message"));
const StudentAnnouncement = lazy(() => import("../pages/Student/Announcement"));
const StudentTimeLogs = lazy(() => import("../pages/Student/DailyLogs"));

// student2
const Activities = lazy(() => import("../pages/Student2/Activities"));
const Attendance = lazy(() => import("../pages/Student2/Attendance"));
const AttendanceRequest = lazy(() =>
  import("../pages/Student2/Attendance_request")
);
const DailyLogs = lazy(() => import("../pages/Student2/DailyLogs"));
const Home = lazy(() => import("../pages/Student2/Home"));
const Profile = lazy(() => import("../pages/Student2/Profile"));
const Timesheet = lazy(() => import("../pages/Student2/TimeSheet"));
const Weekly = lazy(() => import("../pages/Student2/WeeklyReport"));
const ViewWeeklyReport = lazy(() =>
  import("../components/Weekly-Report/WeeklyReport")
);
const Records = lazy(() => import("../pages/Student2/Records"));
const Info = lazy(() => import("../components/Student-profile/Information"));
const Requirements = lazy(() =>
  import("../components/Student-profile/Requirements")
);
const Security = lazy(() => import("../components/Student-profile/Security"));

// SuperAdmin pages
const SuperAdminDashboard = lazy(() => import("../pages/SuperAdmin/Dashboard"));
const SuperAdmin_Trainer_list = lazy(() =>
  import("../pages/SuperAdmin/Trainer")
);
const SuperAdmin_Student_list = lazy(() =>
  import("../pages/SuperAdmin/Student")
);

const SuperAdmin_StudentInfoView = lazy(() =>
  import("../pages/SuperAdmin/StudentViewInfo")
);
const SuperAdmin_Coordinator_list = lazy(() =>
  import("../pages/SuperAdmin/Coordinator")
);
const SuperAdmin_Teacher_list = lazy(() =>
  import("../pages/SuperAdmin/Teacher")
);
const SuperAdmin_Company = lazy(() => import("../pages/SuperAdmin/Companies"));

const SuperAdminMessage = lazy(() => import("../pages/SuperAdmin/Message"));
const SuperAdminAnnouncement = lazy(() =>
  import("../pages/SuperAdmin/Announcement")
);

// Trainer pages
const TrainerDashboard = lazy(() => import("../pages/Trainer/Dashboard"));
const Trainer_Student_list = lazy(() =>
  import("../pages/Trainer/Student_list")
);
const Trainer_StudentTimesheets = lazy(() =>
  import("../pages/Trainer/Timesheet")
);
const Trainer_studentDailylog = lazy(() =>
  import("../pages/Trainer/DailyLogs")
);
const Trainer_StudentTask = lazy(() => import("../pages/Trainer/StudentTask"));
const Trainer_StudentAttendanceRequest = lazy(() =>
  import("../pages/Trainer/AttendanceRequest")
);
const Trainer_StudentLeave = lazy(() =>
  import("../pages/Trainer/LeaveRequest")
);
const TrainerMessage = lazy(() => import("../pages/Trainer/Message"));
const TrainerAnnouncement = lazy(() => import("../pages/Trainer/Announcement"));

// Teacher pages
const TeacherDashboard = lazy(() => import("../pages/Teacher/Dashboard"));
const TeacherrCompanies = lazy(() => import("../pages/Teacher/Companies"));
const TeacherViewCompany = lazy(() => import("../pages/Director/ViewCompany"));
const Teacher_Trainer_list = lazy(() =>
  import("../pages/Teacher/Trainer_list")
);
const Teacher_Student_list = lazy(() =>
  import("../pages/Teacher/Student_list")
);
const Teacher_StudentTimesheets = lazy(() =>
  import("../pages/Teacher/Timesheet")
);
const Teacher_studentDailylog = lazy(() =>
  import("../pages/Teacher/DailyLogs")
);
const Teacher_StudentTask = lazy(() => import("../pages/Teacher/StudentTask"));
const Teacher_StudentAttendanceRequest = lazy(() =>
  import("../pages/Teacher/AttendanceRequest")
);

const Teacher_StudentLeave = lazy(() =>
  import("../pages/Teacher/LeaveRequest")
);
const TeacherMessage = lazy(() => import("../pages/Teacher/Message"));
const TeacherAnnouncement = lazy(() => import("../pages/Teacher/Announcement"));

// Coordinator pages

const CoordinatorDashboard = lazy(() =>
  import("../pages/Coordinator/Dashboard")
);
const CoordinatorCompanies = lazy(() => import("../pages/Teacher/Companies"));
const CoordinatorViewCompany = lazy(() =>
  import("../pages/Director/ViewCompany")
);
const Coordinator_Trainer_list = lazy(() =>
  import("../pages/Coordinator/Trainer_list")
);
const Coordinator_Student_list = lazy(() =>
  import("../pages/Coordinator/Student_list")
);
const Coordinator_Teacher_list = lazy(() =>
  import("../pages/Coordinator/Teacher_list")
);
const Coordinator_StudentTimesheets = lazy(() =>
  import("../pages/Coordinator/Timesheet")
);
const Coordinator_studentDailylog = lazy(() =>
  import("../pages/Coordinator/DailyLogs")
);
const Coordinator_StudentTask = lazy(() =>
  import("../pages/Coordinator/StudentTask")
);
const Coordinator_StudentAttendanceRequest = lazy(() =>
  import("../pages/Coordinator/AttendanceRequest")
);

const Coordinator_StudentLeave = lazy(() =>
  import("../pages/Coordinator/LeaveRequest")
);
const CoordinatorMessage = lazy(() => import("../pages/Coordinator/Message"));
const CoordinatorAnnouncement = lazy(() =>
  import("../pages/Coordinator/Announcement")
);

// Director pages
const DirectorDashboard = lazy(() => import("../pages/Director/Dashboard"));
const DirectorCompanies = lazy(() => import("../pages/Director/Companies"));
const DirectorStudentList = lazy(() =>
  import("../pages/Director/Student_list")
);
const DirectorMoa = lazy(() => import("../pages/Director/MOA"));
const DirectorViewCompany = lazy(() => import("../pages/Director/ViewCompany"));
const DirectorMessage = lazy(() => import("../pages/Director/Message"));
const DirectorAnnouncement = lazy(() =>
  import("../pages/Director/Announcement")
);

const Director_Trainer_Student_list = lazy(() =>
  import("../pages/Director/Trainer_studentList")
);
const Director_Coordinator_list = lazy(() =>
  import("../pages/Director/Coordinator_list")
);

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
    ],

    director: [
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
        path: "/trainer-student-list",
        element: <Director_Trainer_Student_list />,
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

    coordinator: [
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
        path: "/timeSheet",
        element: <Coordinator_StudentTimesheets />,
      },
      {
        path: "/view-timeSheet",
        element: <ViewTimesheets />,
      },
      {
        path: "/StudentTask",
        element: <Coordinator_StudentTask />,
      },
      {
        path: "/StudentTask/view",
        element: <ViewUploadTask />,
      },
      {
        path: "/daily-logs",
        element: <Coordinator_studentDailylog />,
      },
      {
        path: "/Attendance-request",
        element: <Coordinator_StudentAttendanceRequest />,
      },
      {
        path: "/Attendance-request/view",
        element: <ViewAttendanceRequest />,
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
        path: "/company/",
        element: <CoordinatorViewCompany />,
      },
    ],

    teacher: [
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
        path: "/Attendance-request",
        element: <Teacher_StudentAttendanceRequest />,
      },
      {
        path: "/Attendance-request/view/:id",
        element: <ViewAttendanceRequest />,
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
        path: "/company/",
        element: <TeacherViewCompany />,
      },
    ],

    trainer: [
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

    student: [
      {
        path: "/",
        element: <StudentDashboard />,
      },
      {
        path: "/weekly-time-reports",
        element: <StudentTimesheets />,
      },
      {
        path: "/Upload-task",
        element: <StudentUploadTask />,
      },
      {
        path: "/StudentTask/view",
        element: <ViewUploadTask />,
      },

      {
        path: "/daily-log",
        element: <StudentTimeLogs />,
      },
      {
        path: "/Attendance-request",
        element: <StudentAttendanceRequest />,
      },
      {
        path: "/leave-request",
        element: <StudentLeave />,
      },
      {
        path: "/message",
        element: <StudentMessage />,
      },
      {
        path: "/announcement",
        element: <StudentAnnouncement />,
      },
    ],

    student2: [
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
