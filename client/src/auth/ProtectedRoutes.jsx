import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// auth
const Rootlayout = lazy(() => import("../layouts/Rootlayout"));
const Login = lazy(()=> import("./Login"))


// test
const Task = lazy(() => import("../pages/Teacher/StudentTask"));
const ViewUploadTask = lazy(() => import("../components/Student-Task/ViewUploadTask"));

// view
const ViewAttendanceRequest = lazy(() => import("../components/attendance-request/ViewAttendance"));



// view Student info components
const StudentInfoView = lazy(() =>  import("../components/Student-Info/index"));
const StudentInfo = lazy(() =>  import("../components/Student-Info/StudentIfo"));
const StudentRequirements = lazy(() =>  import("../components/Student-Info/StudentRequirements"));
const StudentTask = lazy(() =>  import("../components/Student-Info/StudentTask"));
const StudentTimesheet = lazy(() =>  import("../components/Student-Info/StudentTimeSheet"));




// Teacher components
const TeacherDashboard = lazy(() => import("../pages/Teacher/Dashboard"));
const TeacherMyprofile = lazy(() => import("../pages/Teacher/Myprofile"));
const TeacherProfileInfo = lazy(() => import("../pages/Teacher/ProfileInfo"));
const TeacherProfileSecurity = lazy(() => import("../pages/Teacher/ProfileSecurity"));
const TeacherStudent_list = lazy(() =>  import("../pages/Teacher/Student_list"));
const Timesheets = lazy(() => import("../pages/Teacher/Timesheet"));
const TeacherAttendance = lazy(() => import("../pages/Teacher/DailyLogs"));
const TeacherAttendanceRequest = lazy(() => import("../pages/Teacher/AttendanceRequest"));
const TeacherLeave = lazy(() => import("../pages/Teacher/LeaveRequest"));
const TeacherApproveLeave = lazy(() => import("../pages/Teacher/ApproveLeave"));
const TeacherFailedLeave = lazy(() => import("../pages/Teacher/FailedLeave"));
const TeacherMessage = lazy(() => import("../pages/Teacher/Message"));
const TeacherAnnouncement = lazy(() => import("../pages/Teacher/Announcement"));
const TeacherSettings = lazy(() => import("../pages/Teacher/Settings"));

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
                <Route index element={<TeacherDashboard />} />
                <Route path="/profile/" element={<TeacherMyprofile />} >
                  <Route index element={<TeacherProfileInfo />} />
                  <Route path="/profile/security" element={<TeacherProfileSecurity />} />
                </Route>
                <Route path="/student-list" element={<TeacherStudent_list />} />
                <Route path="/timeSheet" element={<Timesheets />} />

                <Route path="/StudentTask" element={<Task />} />
                <Route path="/ViewedStudentTask" element={<ViewUploadTask />} />
                <Route path="/student/" element={<StudentInfoView />}>
                  <Route index element={<StudentInfo/>} />
                  <Route path="/student/requirement" element={<StudentRequirements/>} />
                  <Route path="/student/task" element={<StudentTask/>} />
                  <Route path="/student/timesheet" element={<StudentTimesheet/>} />
                </Route>
                <Route path="/daily-logs" element={<TeacherAttendance />} />
                <Route path="/Attendance-request" element={<TeacherAttendanceRequest />} />
                <Route path="/Attendance-request/view/:id" element={<ViewAttendanceRequest />} />
                
                <Route path="/leave-request" element={<TeacherLeave/>}>
                  <Route index element={<TeacherApproveLeave />} />
                  <Route path="/leave-request/failed" element={<TeacherFailedLeave />} />
                </Route>
                <Route path="/message" element={<TeacherMessage />} />
                <Route path="/announcement" element={<TeacherAnnouncement />} />
                <Route path="/settings" element={<TeacherSettings />} />
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
