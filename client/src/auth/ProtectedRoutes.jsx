import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// auth
const Rootlayout = lazy(() => import("../layouts/Rootlayout"));
const Login = lazy(()=> import("./Login"))


// test
const ViewUploadTask = lazy(() => import("../components/Student-Task/ViewUploadTask"));

// view Attendance REquesr Reuasable
const ViewAttendanceRequest = lazy(() => import("../components/attendance-request/ViewAttendance"));

// view Student info Reusable
const StudentInfo = lazy(() =>  import("../components/Student-Info/StudentIfo"));
const StudentRequirements = lazy(() =>  import("../components/Student-Info/StudentRequirements"));
const StudentTask = lazy(() =>  import("../components/Student-Info/StudentTask"));
const StudentTimesheet = lazy(() =>  import("../components/Student-Info/StudentTimeSheet"));


// Trainer components
const TrainerDashboard = lazy(() => import("../pages/Trainer/Dashboard"));
const TrainerStudent_list = lazy(() =>  import("../pages/Trainer/Student_list"));
const Trainer_StudentTimesheets = lazy(() => import("../pages/Trainer/Timesheet"));
const TrainerAttendance = lazy(() => import("../pages/Trainer/DailyLogs"));
const Trainer_StudentTask = lazy(() => import("../pages/Trainer/StudentTask"));
const TrainerAttendanceRequest = lazy(() => import("../pages/Trainer/AttendanceRequest"));
const Trainer_StudentInfoView = lazy(() =>  import("../pages/Trainer/StudentViewInfo"));
const TrainerLeave = lazy(() => import("../pages/Trainer/LeaveRequest"));
const TrainerMessage = lazy(() => import("../pages/Trainer/Message"));
const TrainerAnnouncement = lazy(() => import("../pages/Trainer/Announcement"));


// Student components
const StudentDashboard = lazy(() => import("../pages/Student/Dashboard"));
const StudentMyProfile = lazy(() => import("../pages/Student/MyProfile"));
const StudentDailyLog = lazy(() => import("../pages/Student/DailyLog"));
const StudentAttendanceRequest = lazy(() => import("../pages/Student/AttendanceRequest"));
const StudentAttendanceSummary = lazy(() => import("../pages/Student/Summary"));
const StudentTaskUpload = lazy(() => import("../pages/Student/TaskUpload"));
const StudentWeeklyReport = lazy(() => import("../pages/Student/WeeklyReport"));
const StudentLeaveRequest = lazy(() => import("../pages/Student/LeaveRequest"));
const StudentMessage = lazy(() => import("../pages/Student/Message"));
const StudentAnnouncement = lazy(() => import("../pages/Student/Announcement"));

// Super admin components
const AdminDashboard = lazy(() => import("../pages/coordinator/Dashboard"));
const AdminRecords = lazy(() => import("../pages/coordinator/Records"));
const AdminRequest = lazy(() => import("../pages/coordinator/Request"));
const AdminMessage = lazy(() => import("../pages/coordinator/Message"));
const AdminAnnouncement = lazy(() => import("../pages/coordinator/Announcement"));
const AdminReport = lazy(() => import("../pages/coordinator/Report"));

function PrivateRoutes() {
  const [Role, setRole] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setRole("Teacher");
    // setIsLogged(true)
  });

  return (
    <div>
      {
      isLogged? (
        <Suspense fallback={<h1>Login Loading</h1>}>
          <Routes>
            <Route path="/" element={<Login/>} />
          </Routes>
        </Suspense>
      )
      : (

        Role === "Admin" ? (
            <Routes>
              <Route path="/" element={<Rootlayout  />}>
                <Route index element={<AdminDashboard />} />
                <Route path="/records" element={<AdminRecords />} />
                <Route path="/request" element={<AdminRequest />} />
                <Route path="/message" element={<AdminMessage />} />
                <Route path="/announcement" element={<AdminAnnouncement />} />
                <Route path="/report" element={<AdminReport />} />
                </Route>
            </Routes>
  
        ) : Role === "Teacher" ? (
            <Routes>
              <Route path="/" element={<Rootlayout role={Role} />}>
                <Route index element={<TrainerDashboard />} />
                <Route path="/student-list" element={<TrainerStudent_list />} />
                <Route path="/timeSheet" element={<Trainer_StudentTimesheets />} />
                <Route path="/StudentTask" element={<Trainer_StudentTask />} />
                <Route path="/ViewedStudentTask" element={<ViewUploadTask />} />
                <Route path="/student/" element={<Trainer_StudentInfoView />}>
                  <Route index element={<StudentInfo/>} />
                  <Route path="/student/requirement" element={<StudentRequirements/>} />
                  <Route path="/student/task" element={<StudentTask/>} />
                  <Route path="/student/timesheet" element={<StudentTimesheet/>} />
                </Route>
                <Route path="/daily-logs" element={<TrainerAttendance />} />
                <Route path="/Attendance-request" element={<TrainerAttendanceRequest />} />
                <Route path="/Attendance-request/view/:id" element={<ViewAttendanceRequest />} />
                <Route path="/leave-request" element={<TrainerLeave/>} />
                <Route path="/message" element={<TrainerMessage />} />
                <Route path="/announcement" element={<TrainerAnnouncement />} />
              </Route>
            </Routes>
  
        ) : (
            <Routes>
              <Route path="/" element={<Rootlayout />}>
                <Route index element={<StudentDashboard />} />
                <Route path="/MyProfile" element={<StudentMyProfile />} />
                <Route path="/daily-logs" element={<StudentDailyLog />} />
                <Route path="/attendance-request" element={<StudentAttendanceRequest />} />
                <Route path="/attendance-summary" element={<StudentAttendanceSummary />} />
                <Route path="/task-upload" element={<StudentTaskUpload />} />
                <Route path="/timesheet" element={<StudentTimesheet />} />
                <Route path="/weekly-report" element={<StudentWeeklyReport />} />
                <Route path="/leave-request" element={<StudentLeaveRequest />} />
                <Route path="/message" element={<StudentMessage />} />
                <Route path="/announcement" element={<StudentAnnouncement />} />
              </Route>
            </Routes>
        )
      )
     

     
      }
      <div>
        <Outlet />
      </div>
    </div>

  );
    }
export default PrivateRoutes;
