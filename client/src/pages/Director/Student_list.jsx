import React, { useState,useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { BsPrinter } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { getStudentList } from "../../api/Api";
import picture from "../../assets/images/dp.png";
import { Tabs } from "@mantine/core";
import AllStudent from "../../components/StudentList-Filter/All";
import AssignedStudent from "../../components/StudentList-Filter/Assigned";
import UnassignedStudent from "../../components/StudentList-Filter/UnAssigned";
import { useReactToPrint } from "react-to-print";
import List from "../../components/print-layout/List";


const Student_list = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchLength, setSearchLength] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const {
    data: StudentList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getStudent"],
    queryFn: getStudentList,
  });

  const data = StudentList
    ? StudentList.map(
        ({
          id,
          firstname,
          middlename,
          lastname,
          email,
          contact,
          address,
          gender,
          campus,
          college,
          program,
          major,
          profile_url,
          accountStatus,
          teacher,
          trainer,
          AreaOfAssignment,
          deletedStatus,
        }) => ({
          id,
          middlename,
          name: `${firstname} ${lastname}`,
          email,
          contact,
          address,
          gender,
          campus,
          college,
          program,
          major,
          url: profile_url,
          picture: picture,
          company: AreaOfAssignment ? AreaOfAssignment.company.companyName : [],
          trainer: trainer ? `${trainer.firstname} ${trainer.lastname}` : "",
          accountStatus,
          studentTrainerStatus: trainer ? "Assigned" : "Unassigned",
          studentAreaOfAssignment: AreaOfAssignment ? "Assigned" : "Unassigned",
          deletedStatus,
        })
      )
      .filter((item) => item.deletedStatus === 0)
      .filter((item)=>item.name.toLowerCase().includes(searchInput.toLowerCase()))
    : [];


    const defaultData = [...data];
  while (defaultData.length < 15) {
    defaultData.push({ name: "", email: "", totalStudent: "" });
  }



  const ListTable = () => {
    return (
      <table className="border w-full mt-2">
        <thead>
          <tr className="h-11">
            <th className="w-[10%] border font-semibold text-[13px]">No.</th>
            <th className="w-[30%] border font-semibold text-[13px] text-left pl-4">
              Name
            </th>
            <th className="w-[30%] border font-semibold text-[13px] text-left pl-4">
              Email
            </th>
            <th className="w-[10%] border font-semibold text-[13px]">
              Sex
            </th>
            <th className="w-[10%] border font-semibold text-[13px]">
              Program
            </th>
            <th className="w-[10%] border font-semibold text-[13px]">
              Major
            </th>
          </tr>
        </thead>
        <tbody>
          {defaultData.map((item, index) => (
            <tr key={index} className="h-11">
              <td className="text-center border text-[13px]">{index + 1}</td>
              <td className=" border pl-4 text-[13px]">{item.name}</td>
              <td className=" border pl-4 text-[13px]">{item.email}</td>
              <td className="text-center border text-[13px] capitalize">{item.gender}</td>
              <td className="text-center border text-[13px] uppercase">{item.program}</td>
              <td className="text-center border text-[13px] uppercase">{item.major}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


  return (
    <div>
      <div className="flex items-center justify-between px-2 mb-5">
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
          Student list
        </h1>

        <div className="flex items-center gap-3">
          <div
            className={`${
              searchLength ? "w-[250px]" : "w-[40px]"
            } h-10  flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200 duration-300`}
          >
            <BiSearch
              onClick={() => setSearchLength(!searchLength)}
              className={`${
                searchLength ? "text-blue-500" : "text-gray-600"
              } cursor-pointer`}
            />
            {searchLength && (
              <input
                type="text"
                placeholder="Search.."
                onChange={(e) => setSearchInput(e.target.value)}
                className="outline-none text-sm"
              />
            )}
          </div>

          <button  onClick={handlePrint} className="flex items-center gap-2 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full">
            <BsPrinter size={17} />
            <span className="font-semibold tracking-wider">Print</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="first" className="w-full">
          <Tabs.List sx={{ borderColor: "#ecf0f1" }}>
            <Tabs.Tab
              className="text-base text-gray-500 tracking-wide"
              value="first"
            >
              All
            </Tabs.Tab>
            <Tabs.Tab
              className="text-base text-gray-500 tracking-wide"
              value="second"
            >
              Assigned
            </Tabs.Tab>
            <Tabs.Tab
              className="text-base text-gray-500 tracking-wide"
              value="third"
            >
              Unassigned
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first" pt="xs">
            <AllStudent data={data} isLoading={isLoading} isError={isError} />
          </Tabs.Panel>
          <Tabs.Panel value="second" pt="xs">
            <AssignedStudent
              data={data}
              isLoading={isLoading}
              isError={isError}
            />
          </Tabs.Panel>
          <Tabs.Panel value="third" pt="xs">
            <UnassignedStudent
              data={data}
              isLoading={isLoading}
              isError={isError}
            />
          </Tabs.Panel>
        </Tabs>
      </div>

      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <List title={`Student List`} ListTable={ListTable} />
        </div>
      </div>
    </div>
  );
};

export default Student_list;
