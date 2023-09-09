import React, { useState } from "react";
import { userData } from "../../services/AttendanceRequestData";
import { BiSearch } from "react-icons/bi";
import { BsPrinter } from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
import { Select } from '@mantine/core';

const Student_list = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchLength, setSearchLength] = useState(false);

  //   data
  const data = userData
    .map(({ id, firstname, middleName, lastname, email, picture }) => ({
      id,
      name: `${firstname} ${middleName[0]}. ${lastname}`,
      gender: "Male",
      email,
      picture,
      department: "CICT Building",
      AccountStatus: 1,
    }))
    .filter((item) =>
      item.name.toLocaleLowerCase().includes(searchInput.toLowerCase())
    );

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
        <div className="mb-5 flex items-center gap-3">
          <NavLink className="StudentListFilterLink" to="/student-list/">
            All
          </NavLink>
          <NavLink className="StudentListFilterLink" to="/student-list/Assigned">
            Assigned
          </NavLink>
          <NavLink
            className="StudentListFilterLink"
            to="/student-list/UnAssigned"
          >
            Unassigned
          </NavLink>
        </div>

        <Select
          placeholder="Select Course"
          className="w-[250px]"
          data={[
            { value: 'cict', label: 'CICT' },
            { value: 'crim', label: 'CRIM' },
            { value: 'nurse', label: 'NURSE' },
            { value: 'educ', label: 'EDUC' },
          ]}
        />
      </div>

      <Outlet />
    </div>
  );
};

export default Student_list;
