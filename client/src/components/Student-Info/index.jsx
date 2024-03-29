import React, { useState } from "react";
import { NavLink, Link, useParams, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { BiInfoCircle } from "react-icons/bi";
import { BsChatDots, BsFillTrash3Fill } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { AiOutlineFieldTime } from "react-icons/ai";
import pic from "../../assets/images/emptyProfile.png";
import { Tabs } from "@mantine/core";
import StudentIfo from "./StudentIfo";
import StudentRequirements from "./StudentRequirements";
import StudentTask from "./StudentTask";
import StudentTimesheet from "./StudentTimeSheet";
import { getCampus, getStudentInfo, resetData } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import PulseLloader from "react-spinners/PulseLoader";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";

const StudentViewInfo = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const currentDate = new Date();
  const { id } = useParams();

  const [userPassword, setuserPassword] = useState("");

  const {
    data: studentlist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["studentinfo"],
    queryFn: () => getStudentInfo(id),
  });

  const { data: getProgram } = useQuery({
    queryKey: ["getProgram"],
    queryFn: getCampus,
  });

  const programList = getProgram
    ? getProgram
        .flatMap(({ college }) => college?.flatMap(({ program }) => program))
        .map(({ trainingHours, program_description }) => ({
          trainingHours,
          program_description,
        }))
    : [];

  const info = {
    id: studentlist?.id,
    firstname: studentlist?.firstname,
    middlename: studentlist?.middlename ? studentlist?.middlename : "",
    lastname: studentlist?.lastname,
    contact: studentlist?.contact,
    email: studentlist?.email,
    address: studentlist?.address,
    gender: studentlist?.gender,
    campus: studentlist?.campus,
    college: studentlist?.college,
    program: studentlist?.program,
    major: studentlist?.major,
    profile: studentlist?.profile,
    company: studentlist?.AreaOfAssignment
      ? studentlist?.AreaOfAssignment.company.companyName
      : "",
    teacher:
      studentlist?.teacher.firstname + " " + studentlist?.teacher.lastname,
    trainer: studentlist?.trainer
      ? studentlist?.trainer.firstname + " " + studentlist.trainer.lastname
      : "",
    areaAssignment: studentlist?.AreaOfAssignment
      ? studentlist.AreaOfAssignment.areaName
      : "",
  };

  const timesheet =
    studentlist &&
    studentlist.timesheet
      .filter((item) => new Date(item.date) <= currentDate)
      .map(
        ({
          id,
          timeIn,
          timeOut,
          totalHours,
          date,
          logStatus,
          student_id,
          week,
          teacherMark,
          trainerMark,
          studentMark
        }) => ({
          id,
          timeIn: logStatus !== 0  && teacherMark!==0 && trainerMark!==0 ? timeIn : "0:00",
          timeOut: logStatus !== 0  && teacherMark!==0 && trainerMark!==0 ? timeOut : "0:00",
          totalHours: logStatus !== 0  && teacherMark!==0 && trainerMark!==0 ? totalHours : 0,
          date,
          logStatus,
          student_id,
          week,
          teacherMark,
          trainerMark,
          studentMark,
          hours: totalHours
        })
      );
  const pieChartData = {
    totalHours: programList.find(
      (item) => item.program_description === studentlist?.program
    )?.trainingHours,
    hoursTaken: Math.round(
      timesheet?.reduce((total, item) => total + item.totalHours, 0)
    ),
  };


  console.log(timesheet,'ddd');
  const requirementData = studentlist ? studentlist.requirement : null;

  const taskData = studentlist ? studentlist.task : null;

  if (isError) {
    return (
      <h1 className="text-center my-10">Something wrong!! Please try again</h1>
    );
  }

  const { mutate } = useMutation(resetData, {
    onSuccess: () => {
      Swal.fire(
        "Success",
        "The Student has been dropped from ojt  \n The student information is now hidden.",
        "success"
      );
      navigate("/student-list");
    },
    onError: (data) => {
      Swal.fire(
        "Error",
        "Incorrect password. Please ensure you've entered the correct password \n Please try again.",
        "error"
      );
    },
  });

  const handleSubmit = () => {
    const StudentId = Number(id);

    // const isValid
    Swal.fire({
      title: "Are you sure you want to proceed with dropping this student?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#49A6F3",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate({ id: [StudentId], password: userPassword });
      }
    });
  };

  return (
    <div className="rounded-xl overflow-hidden -mt-3 -ml-2">
      {isLoading ? (
        <h1 className="text-center my-14 py-5 border rounded-lg">
          <PulseLloader
            color="#1892fc"
            margin={5}
            size={13}
            speedMultiplier={1}
            className="mx-auto"
          />
        </h1>
      ) : (
        <>
          <div className="cover"></div>

          <div className="flex flex-col gap-3 border-b bg-white">
            <div className="flex items-center gap-3">
              <div className=" ml-7 -mt-52 bg-white w-56 h-44 border-white right rounded-full shadow-md overflow-hidden flex items-center justify-center">
                {studentlist?.profile_url ? (
                  <Avatar
                    src={studentlist?.profile_url && studentlist?.profile_url}
                    className="w-40 h-40 text-large"
                  />
                ) : (
                  <Avatar src={pic} className="w-40 h-40 text-large" />
                )}
              </div>

              <div className="left p-5 pl-5 w-full py-5">
                <div className="flex flex-col gap-5">
                  <div className="name ">
                    <h1 className="text-2xl font-semibold tracking-wide">
                      {`${studentlist && studentlist.firstname} ${
                        studentlist && studentlist.lastname
                      }`}
                    </h1>
                    <small className="text-blue-500 font-semibold tracking-wider">
                      Student
                    </small>
                  </div>

                  <div className="flex items-center gap-5 mb-3 font-semibold">
                    <NavLink className="flex items-center gap-1 text-blue-500 text-sm bg-blue-100 py-2 px-4 rounded-md">
                      <BsChatDots />
                      Send message
                    </NavLink>
                    <button
                      onClick={onOpen}
                      className="flex items-center gap-1 text-red-500 text-sm bg-red-100 py-2 px-4 rounded-md"
                    >
                      <BsFillTrash3Fill />
                      Drop
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-7 -mt-5">
              <Tabs defaultValue="info" className="w-full">
                <div className="flex items-center gap-36 mb-3">
                  <Link
                    to="/student-list/"
                    className="font-semibold tracking-wide text-blue-500 rounded-full  px-3 flex items-center"
                  >
                    <MdKeyboardArrowLeft size={20} />
                    Back
                  </Link>
                  <Tabs.List className="flex gap-4">
                    <Tabs.Tab
                      className="text-base text-gray-500 tracking-wide"
                      value="info"
                      icon={<BiInfoCircle />}
                    >
                      <p>Info</p>
                    </Tabs.Tab>
                    <Tabs.Tab
                      className="text-base text-gray-500 tracking-wide"
                      value="requirement"
                      icon={<HiOutlineDocumentDuplicate />}
                    >
                      Requirements
                    </Tabs.Tab>
                    <Tabs.Tab
                      className="text-base text-gray-500 tracking-wide"
                      value="task"
                      icon={<GoTasklist />}
                    >
                      Task
                    </Tabs.Tab>
                    <Tabs.Tab
                      className="text-base text-gray-500 tracking-wide"
                      value="timesheet"
                      icon={<AiOutlineFieldTime />}
                    >
                      Timesheet
                    </Tabs.Tab>
                  </Tabs.List>
                </div>

                <Tabs.Panel value="info" pt="xs">
                  <StudentIfo data={info} isLoading={isLoading} />
                </Tabs.Panel>
                <Tabs.Panel value="requirement" pt="xs">
                  <StudentRequirements
                    data={requirementData}
                    isLoading={isLoading}
                  />
                </Tabs.Panel>
                <Tabs.Panel value="task" pt="xs">
                  <StudentTask data={taskData} />
                </Tabs.Panel>
                <Tabs.Panel value="timesheet" pt="xs">
                  <StudentTimesheet
                    data={timesheet}
                    pieChartData={pieChartData}
                  />
                </Tabs.Panel>
              </Tabs>
            </div>
          </div>

          {/* drop modal */}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-base">
                    Drop Student
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      type="password"
                      label="Enter password"
                      onChange={(e) => setuserPassword(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      onClick={handleSubmit}
                      className="font-medium"
                      isDisabled={!userPassword}
                    >
                      Reset
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
};

export default StudentViewInfo;
