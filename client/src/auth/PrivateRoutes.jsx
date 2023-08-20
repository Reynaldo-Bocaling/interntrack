import React, { Suspense, lazy, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// auth
const Rootlayout = lazy(() => import("../layouts/Rootlayout"));
const Login = lazy(() => import("./Login"));

// test
const ViewUploadTask = lazy(() =>
  import("../components/Student-Task/ViewUploadTask")
);

// view Attendance REquesr Reuasable
const ViewAttendanceRequest = lazy(() =>
  import("../components/attendance-request/ViewAttendance")
);




// view Student info Reusable
const StudentInfo = lazy(() => import("../components/Student-Info/StudentIfo"));
const StudentRequirements = lazy(() => import("../components/Student-Info/StudentRequirements"));
const StudentTask = lazy(() => import("../components/Student-Info/StudentTask"));
const StudentTimesheet = lazy(() => import("../components/Student-Info/StudentTimeSheet"));

// Trainer components
const TrainerDashboard = lazy(() => import("../pages/Trainer/Dashboard"));
const Trainer_Student_list = lazy(() => import("../pages/Trainer/Student_list"));
const Trainer_StudentTimesheets = lazy(() => import("../pages/Trainer/Timesheet"));
const Trainer_studentDailylog = lazy(() => import("../pages/Trainer/DailyLogs"));
const Trainer_StudentTask = lazy(() => import("../pages/Trainer/StudentTask"));
const Trainer_StudentAttendanceRequest = lazy(() => import("../pages/Trainer/AttendanceRequest"));
const Trainer_StudentInfoView = lazy(() => import("../pages/Trainer/StudentViewInfo"));
const Trainer_StudentLeave = lazy(() => import("../pages/Trainer/LeaveRequest"));
const TrainerMessage = lazy(() => import("../pages/Trainer/Message"));
const TrainerAnnouncement = lazy(() => import("../pages/Trainer/Announcement"));


// Teacher components
const TeacherDashboard = lazy(() => import("../pages/Teacher/Dashboard"));
const Teacher_Trainer_list = lazy(() => import("../pages/Teacher/Trainer_list"));
const Teacher_Trainer_Student_list = lazy(() => import("../pages/Teacher/Trainer_studentList.jsx"));
const Teacher_Student_list = lazy(() => import("../pages/Teacher/Student_list"));
const Teacher_StudentTimesheets = lazy(() => import("../pages/Teacher/Timesheet"));
const Teacher_studentDailylog = lazy(() => import("../pages/Teacher/DailyLogs"));
const Teacher_StudentTask = lazy(() => import("../pages/Teacher/StudentTask"));
const Teacher_StudentAttendanceRequest = lazy(() => import("../pages/Teacher/AttendanceRequest"));
const Teacher_StudentInfoView = lazy(() => import("../pages/Teacher/StudentViewInfo"));
const Teacher_StudentLeave = lazy(() => import("../pages/Teacher/LeaveRequest"));
const TeacherMessage = lazy(() => import("../pages/Teacher/Message"));
const TeacherAnnouncement = lazy(() => import("../pages/Teacher/Announcement"));










// dummy component
const Dashboard = lazy(() => import("../pages/coordinator/Dashboard"));







const PrivateRoutes = () => {
  const [isLogged, setIsLogged] = useState(false);

  // react query
  // const { data: getRole, isError, isLoading} = useQuery({
  //   queryKey: 'Role',
  //   queryFn: 'getRole'
  // });

  // if(isLoading) {
  //   return <h1>Loading..</h1>
  // }

  // if(isError) {
  //   // setIsLogged(true)
  //    return <h1>error..</h1>
  // }

  const role = "teacher";

  const roleRoutes = {
    admin: [
      {
        path: "/MyProfile",
        element: <Dashboard />,
      },
      {
        path: "/Dashboard",
        element: <Dashboard />,
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
        path: "/trainer-student-list",
        element: <Teacher_Trainer_Student_list />,
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
        path: "/StudentTask",
        element: <Teacher_StudentTask />,
      },
      {
        path: "/StudentTask/view",
        element: <ViewUploadTask />,
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
        path: "/Attendance-request/view",
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
        path: "/student",
        element: (
          <Trainer_StudentInfoView>
            <Route index element={<StudentInfo />} />
            <Route
              path="/student/requirement"
              element={<StudentRequirements />}
            />
            <Route path="/student/task" element={<StudentTask />} />
            <Route path="/student/timesheet" element={<StudentTimesheet />} />
          </Trainer_StudentInfoView>
        ),
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
        path: "/Attendance-request/view",
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
        path: "/student",
        element: (
          <Trainer_StudentInfoView>
            <Route index element={<StudentInfo />} />
            <Route
              path="/student/requirement"
              element={<StudentRequirements />}
            />
            <Route path="/student/task" element={<StudentTask />} />
            <Route path="/student/timesheet" element={<StudentTimesheet />} />
          </Trainer_StudentInfoView>
        ),
      },
    ],
  };

  const userRoutes = roleRoutes[role] || [];

  return (
    <div>
      <Routes>
        <Route path="/" element={isLogged ? <Login /> : <Rootlayout role={role} />}>
          {userRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
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
