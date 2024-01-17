import React from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { BiInfoCircle } from "react-icons/bi";
import { BsChatDots, BsFillTrash3Fill } from "react-icons/bs";
import pic from "../../assets/images/dp.png";
import { Tabs } from "@mantine/core";
import TeacherInfo from "./TeacherInfo";
import StudentList from "./StudentList";

import { useQuery } from "@tanstack/react-query";
import PulseLloader from "react-spinners/PulseLoader";
import { getTeacherList } from "../../api/Api";
import { Avatar } from "@nextui-org/react";
import EmptyProfileIcon from "../../assets/images/emptyProfile.png";


const CoordinatorInfo = () => {
  const { id } = useParams();

  const {
    data: teacherList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getTeacherList"],
    queryFn: getTeacherList,
  });

  const teacherInfo = teacherList
    ? teacherList.find((item) => item.id == parseInt(id))
    : [];

  const info = {
    id: teacherInfo ? teacherInfo.id : "",
    firstname: teacherInfo ? teacherInfo.firstname : "",
    middlename: teacherInfo ? teacherInfo.middlename : "",
    lastname: teacherInfo ? teacherInfo.lastname : "",
    email: teacherInfo ? teacherInfo.email : "",
    contact: teacherInfo ? teacherInfo.contact : "",
    campus: teacherInfo ? teacherInfo.campus : "",
    college: teacherInfo ? teacherInfo.college : "",
    program: teacherInfo ? teacherInfo.program : "",
    major: teacherInfo ? teacherInfo.major : "",
    url: teacherInfo ? teacherInfo.profile_url : "",  };

  const studentList = teacherInfo?.student
    ? teacherInfo.student.map(
        ({
          id,
          firstname,
          lastname,
          email,
          contact,
          campus,
          college,
          program,
          major,
          profile,
          teacher,
          deletedStatus
        }) => ({
          id,
          name: `${firstname} ${lastname}`,
          email,
          contact,
          campus,
          college,
          program,
          major,
          profile,
          deletedStatus
        })
      ).filter((item)=>item.deletedStatus === 0)
    : [];

    if(isError){
      return <h1 className="text-center my-10">Server Failed. Please Try Again Later</h1>
    }

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
               {
                info?.url ? (
                  <Avatar src={info?.url && info?.url} className="w-40 h-40 text-large" />
                ) : (
                  <Avatar src={EmptyProfileIcon} className="w-40 h-40 text-large" />
                )
               }
              </div>

              <div className="left p-5 pl-5 w-full pt-5 pb-10">
                <div className=" w-full flex items-center justify-between ">
                  <div className="name ">
                    <h1 className="text-2xl font-semibold tracking-wide">
                      {`${info && info.firstname} ${info && info.lastname}`}
                    </h1>
                    <small className="text-blue-500 font-semibold tracking-wider">
                      Teacher
                    </small>
                  </div>

                  <button className="w-[180px] font-medium flex items-center gap-1 text-red-500 text-sm bg-red-100 py-2 px-4 rounded-md">
                      <BsFillTrash3Fill />
                      Disable Account
                    </button>

                  {/* <div className="flex items-center gap-5 mb-3 font-semibold">
                    <NavLink className="flex items-center gap-1 text-blue-500 text-sm bg-blue-100 py-2 px-4 rounded-md">
                      <BsChatDots />
                      Send message
                    </NavLink>
                    <NavLink className="flex items-center gap-1 text-red-500 text-sm bg-red-100 py-2 px-4 rounded-md">
                      <BsFillTrash3Fill />
                      Drop
                    </NavLink>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-7 -mt-5">
              <Tabs defaultValue="info" className="w-full">
                <div className="flex items-center gap-36 mb-3">
                  <Link
                    to="/Teacher-list"
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
                      value="studentList"
                      icon={<BiInfoCircle />}
                    >
                      <p>Student List</p>
                    </Tabs.Tab>
                  </Tabs.List>
                </div>

                <Tabs.Panel value="info" pt="xs">
                  <TeacherInfo data={info} />
                </Tabs.Panel>
                <Tabs.Panel value="studentList" pt="xs">
                  <StudentList data={studentList} isLoading={isLoading} />
                </Tabs.Panel>
              </Tabs>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoordinatorInfo;
