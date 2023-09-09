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


// student list with filter components
const All = lazy(()=> import('../components/StudentList-Filter/All'));
const Assigned = lazy(()=> import('../components/studentList-Filter/Assigned'));
const UnAssigned = lazy(()=> import('../components/StudentList-Filter/UnAssigned'));


// view Student info Reusable
const StudentInfo = lazy(() => import("../components/Student-Info/StudentIfo"));
const StudentRequirements = lazy(() => import("../components/Student-Info/StudentRequirements"));
const StudentTask = lazy(() => import("../components/Student-Info/StudentTask"));
const StudentTimesheet = lazy(() => import("../components/Student-Info/StudentTimeSheet"));

// view componies info Reusable
const CompanyInfo = lazy(() => import("../components/Company-info/CompanyInfo"));
const CompanySlots = lazy(() => import("../components/Company-info/CompanySlots"));
const CompanyMoa = lazy(() => import("../components/Company-info/CompanyMoa"));
const CompanyStudents = lazy(() => import("../components/Company-info/CompanyStudents"));
const CompanyTrainers = lazy(() => import("../components/Company-info/CompanyTrainers"));

// Student pages
const StudentDashboard = lazy(() => import("../pages/Student/Dashboard"));
const StudentTimesheets = lazy(() => import("../pages/Student/Timesheet"));
const StudentDailylog = lazy(() => import("../pages/Student/DailyLogs"));
const StudentUploadTask = lazy(() => import("../pages/Student/StudentTask"));
const StudentAttendanceRequest = lazy(() => import("../pages/Student/AttendanceRequest"));
const StudentLeave = lazy(() => import("../pages/Student/LeaveRequest"));
const StudentMessage = lazy(() => import("../pages/Student/Message"));
const StudentAnnouncement = lazy(() => import("../pages/Student/Announcement"));
const StudentTimeLogs = lazy(() => import("../pages/Student/TimeLogs"));


// Trainer pages
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


// Teacher pages
const TeacherDashboard = lazy(() => import("../pages/Teacher/Dashboard"));
const TeacherrCompanies = lazy(() => import("../pages/Teacher/Companies"));
const TeacherViewCompany = lazy(() => import("../pages/Director/ViewCompany"));
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


// Coordinator pages

const CoordinatorDashboard = lazy(() => import("../pages/Coordinator/Dashboard"));
const CoordinatorCompanies = lazy(() => import("../pages/Teacher/Companies"));
const CoordinatorViewCompany = lazy(() => import("../pages/Director/ViewCompany"));
const Coordinator_Trainer_list = lazy(() => import("../pages/Coordinator/Trainer_list"));
const Coordinator_Trainer_Student_list = lazy(() => import("../pages/Coordinator/Trainer_studentList.jsx"));
const Coordinator_Student_list = lazy(() => import("../pages/Coordinator/Student_list"));
const Coordinator_Teacher_list = lazy(() => import("../pages/Coordinator/Teacher_list"));
const Coordinator_StudentTimesheets = lazy(() => import("../pages/Coordinator/Timesheet"));
const Coordinator_studentDailylog = lazy(() => import("../pages/Coordinator/DailyLogs"));
const Coordinator_StudentTask = lazy(() => import("../pages/Coordinator/StudentTask"));
const Coordinator_StudentAttendanceRequest = lazy(() => import("../pages/Coordinator/AttendanceRequest"));
const Coordinator_StudentInfoView = lazy(() => import("../pages/Coordinator/StudentViewInfo"));
const Coordinator_StudentLeave = lazy(() => import("../pages/Coordinator/LeaveRequest"));
const CoordinatorMessage = lazy(() => import("../pages/Coordinator/Message"));
const CoordinatorAnnouncement = lazy(() => import("../pages/Coordinator/Announcement"));


// Director pages
const DirectorDashboard = lazy(() => import("../pages/Director/Dashboard"));
const DirectorCompanies = lazy(() => import("../pages/Director/Companies"));
const DirectorStudentList = lazy(() => import("../pages/Director/Student_list"));
const DirectorMoa = lazy(() => import("../pages/Director/MOA"));
const DirectorViewCompany = lazy(() => import("../pages/Director/ViewCompany"));
const DirectorMessage = lazy(() => import("../pages/Director/Message"));
const DirectorAnnouncement = lazy(() => import("../pages/Director/Announcement"));
const DirectorStudentInfoView = lazy(() => import("../pages/Director/StudentViewInfo"));
const Director_Trainer_Student_list = lazy(() => import("../pages/Director/Trainer_studentList"));
const Director_Trainer_list = lazy(() => import("../pages/Director/Trainer_list"));


// dummy component
const Dashboard = lazy(() => import("../pages/Teacher/Dashboard"));




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
        path: "/trainer-list",
        element: <Director_Trainer_list />,
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
        path: "/student-list/",
        element: <DirectorStudentList />,
        children: [
          {
            path: "/student-list/",
            element: <All />,
          },
          {
            path: "/student-list/Assigned",
            element: <Assigned />,
          },
          {
            path: "/student-list/UnAssigned",
            element: <UnAssigned />,
          },
        ]
      },
      {
        path: "/student/",
        element: <DirectorStudentInfoView />,
        children: [
          {
            path: "/student/",
            element: <StudentInfo />,
          },
          {
            path: "/student/requirement",
            element: <StudentRequirements />,
          },
          {
            path: "/student/task",
            element: <StudentTask />,
          },
          {
            path: "/student/timesheet",
            element: <StudentTimesheet />,
          },
        ]
      },
      {
        path: "/company/",
        element: <DirectorViewCompany />,
        children: [
          {
            path: "/company/",
            element: <CompanyInfo />,
          },
          {
            path: "/company/slots",
            element: <CompanySlots />,
          },
          {
            path: "/company/moa",
            element: <CompanyMoa />,
          },
          {
            path: "/company/students",
            element: <CompanyStudents />,
          },
          {
            path: "/company/trainers",
            element: <CompanyTrainers />,
          },
        ]
      }
    ]
,


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
        path: "/trainer-student-list",
        element: <Coordinator_Trainer_Student_list />,
      },
      {
        path: "/student-list",
        element: <Coordinator_Student_list />,
      },
      {
        path: "/timeSheet",
        element: <Coordinator_StudentTimesheets />,
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
        path: "/student/",
        element: <Coordinator_StudentInfoView />,
        children: [
          {
            path: "/student/",
            element: <StudentInfo />,
          },
          {
            path: "/student/requirement",
            element: <StudentRequirements />,
          },
          {
            path: "/student/task",
            element: <StudentTask />,
          },
          {
            path: "/student/timesheet",
            element: <StudentTimesheet />,
          },
        ]
      },
      {
        path: "/company/",
        element: <CoordinatorViewCompany />,
        children: [
          {
            path: "/company/",
            element: <CompanyInfo />,
          },
          {
            path: "/company/slots",
            element: <CompanySlots />,
          },
          {
            path: "/company/moa",
            element: <CompanyMoa />,
          },
          {
            path: "/company/students",
            element: <CompanyStudents />,
          },
          {
            path: "/company/trainers",
            element: <CompanyTrainers />,
          },
        ]
      }
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
        path: "/student/",
        element: <Teacher_StudentInfoView />,
        children: [
          {
            path: "/student/",
            element: <StudentInfo />,
          },
          {
            path: "/student/requirement",
            element: <StudentRequirements />,
          },
          {
            path: "/student/task",
            element: <StudentTask />,
          },
          {
            path: "/student/timesheet",
            element: <StudentTimesheet />,
          },
        ]
      },
      {
        path: "/company/",
        element: <TeacherViewCompany />,
        children: [
          {
            path: "/company/",
            element: <CompanyInfo />,
          },
          {
            path: "/company/slots",
            element: <CompanySlots />,
          },
          {
            path: "/company/moa",
            element: <CompanyMoa />,
          },
          {
            path: "/company/students",
            element: <CompanyStudents />,
          },
          {
            path: "/company/trainers",
            element: <CompanyTrainers />,
          },
        ]
      }
    ]
,

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
        path: "/student/",
        element: <Teacher_StudentInfoView />,
        children: [
          {
            path: "/student/",
            element: <StudentInfo />,
          },
          {
            path: "/student/requirement",
            element: <StudentRequirements />,
          },
          {
            path: "/student/task",
            element: <StudentTask />,
          },
          {
            path: "/student/timesheet",
            element: <StudentTimesheet />,
          },
        ]
      }  
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
        path: "/daily-logs",
        element: <StudentDailylog />,
      },
      {
        path: "/time-log",
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
  };

  const userRoutes = roleRoutes[role] || [];

  return (
    <div>
      <Routes>
        <Route path="/" element={isLogged ? <Login /> : <Rootlayout role={role} />}>
          {userRoutes.map((route, index) => (
            <Route 
              key={index} 
              path={route.path} 
              element={route.element} 
            >
              {route.children && route.children.map((childRoute, childIndex) => (
                <Route 
                  key={childIndex}
                  path={childRoute.path} 
                  element={childRoute.element} 
                />
              ))
                } 
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
