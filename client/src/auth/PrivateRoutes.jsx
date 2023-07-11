import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// main
const Rootlayout = lazy(() => import("../layouts/Rootlayout"));

// Teacher components
const TeacherDashboard = lazy(() => import("../pages/Teacher/Dashboard"));
const TeacherMyprofile = lazy(() => import("../pages/Teacher/Myprofile"));
const TeacherMyStudent = lazy(() => import("../pages/Teacher/MyStudent"));
const TeacherStudent_list = lazy(() =>  import("../pages/Teacher/components/MyStudent/Student_list"));
const TeacherTime_sheets = lazy(() => import("../pages/Teacher/components/MyStudent/Time_sheets"));
const TeacherAttendance = lazy(() => import("../pages/Teacher/Attendance"));
const TeacherRecords = lazy(() => import("../pages/Teacher/Records"));
const TeacherMessage = lazy(() => import("../pages/Teacher/Message"));
const TeacherAnnouncement = lazy(() => import("../pages/Teacher/Announcement"));
const TeacherSettings = lazy(() => import("../pages/Teacher/Settings"));

// Student components
const StudentDashboard = lazy(() => import("../pages/Student/Dashboard"));
const StudentMyProfile = lazy(() => import("../pages/Student/MyProfile"));
const StudentAttendance = lazy(() => import("../pages/Student/Attendance"));
const StudentRecords = lazy(() => import("../pages/Student/Records"));
const StudentMessage = lazy(() => import("../pages/Student/Message"));
const StudentAnnouncement = lazy(() => import("../pages/Student/Announcement"));

// Super admin components
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminRecords = lazy(() => import("../pages/admin/Records"));
const AdminRequest = lazy(() => import("../pages/admin/Request"));
const AdminMessage = lazy(() => import("../pages/admin/Message"));
const AdminAnnouncement = lazy(() => import("../pages/admin/Announcement"));
const AdminReport = lazy(() => import("../pages/admin/Report"));


function PrivateRoutes() {
  const [Role, setRole] = useState("");

  useEffect(() => {
    setRole("Teacher");
  });


  return (
    <div>
      {Role === "Admin" ? (
        <Suspense>
          <Routes>
            <Route path="/" element={<Rootlayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="/records" element={<AdminRecords />} />
              <Route path="/request" element={<AdminRequest />} />
              <Route path="/message" element={<AdminMessage />} />
              <Route path="/announcement" element={<AdminAnnouncement />} />
              <Route path="/report" element={<AdminReport />} />
              </Route>
          </Routes>
        </Suspense>

      ) : Role === "Teacher" ? (
        <Suspense>
          <Routes>
            <Route path="/" element={<Rootlayout />}>
              <Route index element={<TeacherDashboard />} />
              <Route path="/MyProfile" element={<TeacherMyprofile />} />
              <Route path="/MyStudent" element={<TeacherMyStudent />}>
                <Route path="MyStudent/list" element={TeacherStudent_list} />
                <Route path="MyStudent/timeSheet" element={TeacherTime_sheets} />
              </Route>
              <Route path="/attendance" element={<TeacherAttendance />} />
              <Route path="/record" element={<TeacherRecords />} />
              <Route path="/message" element={<TeacherMessage />} />
              <Route path="/announcement" element={<TeacherAnnouncement />} />
              <Route path="/settings" element={<TeacherSettings />} />
            </Route>
          </Routes>
        </Suspense>

      ) : (
        <Suspense>
          <Routes>
            <Route path="/" element={<Rootlayout />}>
              <Route index element={<StudentDashboard />} />
              <Route path="/MyProfile" element={<StudentMyProfile />} />
              <Route path="/attendance" element={<StudentAttendance />} />
              <Route path="/records" element={<StudentRecords />} />
              <Route path="/message" element={<StudentMessage />} />
              <Route path="/announcment" element={<StudentAnnouncement />} />
            </Route>
          </Routes>
        </Suspense>
      )
      }
      <div>
        <Outlet />
      </div>
    </div>

  );
    }
export default PrivateRoutes;
