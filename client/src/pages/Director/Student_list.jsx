import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsPrinter } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../../api/Api";
import picture from "../../assets/images/dp.png";
import { Tabs } from "@mantine/core";
import AllStudent from "../../components/StudentList-Filter/All";
import AssignedStudent from "../../components/StudentList-Filter/Assigned";
import UnassignedStudent from "../../components/StudentList-Filter/UnAssigned";

const Student_list = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchLength, setSearchLength] = useState(false);

  const {
    data: StudentList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getStudent"],
    queryFn: getStudent,
  });

  const data = StudentList
    ? StudentList
        .map(
          ({
            id,
            firstname,
            middlename,
            lastname,
            email,
            teacher,
            trainer,
            AreaOfAssignment,
          }) => ({
            id,
            name: `${firstname} ${middlename[0]}. ${lastname}`,
            gender: "Male",
            email,
            teacher: teacher || teacher !== null? `${teacher.firstname} ${teacher.lastname}` : "Not Assigned",
            trainer:trainer || trainer !== null ? `${trainer.firstname} ${trainer.lastname}` : "Not Assigned",
            company: AreaOfAssignment || AreaOfAssignment !== null  ? AreaOfAssignment.company.companyName : "Not Assigned",
            picture: picture,
            AreaOfAssigned: AreaOfAssignment || AreaOfAssignment !== null ? AreaOfAssignment.areaName : "Not Assigned",
            AccountStatus: !trainer || !AreaOfAssignment ? 0 : 1,
          })
        )
        .filter((item) =>
          item.name.toLocaleLowerCase().includes(searchInput.toLowerCase())
        )
    : [];

  // console.log("student list", StudentList);
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

          <button className="flex items-center gap-2 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full">
            <BsPrinter size={17} />
            <span className="font-semibold tracking-wider">Print</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="first" className="w-full">
          <Tabs.List sx={{borderColor: '#ecf0f1'}}>
            <Tabs.Tab className="text-base text-gray-500 tracking-wide" value="first">All</Tabs.Tab>
            <Tabs.Tab className="text-base text-gray-500 tracking-wide" value="second">Assigned</Tabs.Tab>
            <Tabs.Tab className="text-base text-gray-500 tracking-wide" value="third">Unassigned</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first" pt="xs">
            <AllStudent data={data} />
          </Tabs.Panel>
          <Tabs.Panel value="second" pt="xs">
            <AssignedStudent data={data} />
          </Tabs.Panel>
          <Tabs.Panel value="third" pt="xs">
            <UnassignedStudent data={data} />
          </Tabs.Panel>
        </Tabs>
      </div>

      <div></div>
    </div>
  );
};

export default Student_list;
