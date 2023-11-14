import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import StudentItem from "../../components/ReusableTableFormat/TableFormat";
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";
import { BsPrinter } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { HiOutlineDownload } from "react-icons/hi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { createColumnHelper } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";

const Trainer_studentList = () => {
  const location = useLocation();
  const studentList = location.state.List;
  const TrainerName = location.state.trainerName;
  const columnHelper = createColumnHelper();
  const [show, setShow] = useState(null);

  const data = studentList.map(
    ({
      id,
      firstname,
      middleName,
      lastname,
      email,
      gender,
      department,
      status,
      picture,
      timesheet,
    }) => ({
      id,
      name: `${firstname} ${middleName[0]}. ${lastname}`,
      email,
      gender,
      department,
      status,
      picture,
      totalHours: timesheet.reduce((acc, item) => acc + item.totalHours, 0),
    })
  );

  //   columns
  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "ID",
    }),
    columnHelper.accessor("name", {
      id: "name",
      cell: (info) => (
        <div className="flex items-center gap-3">
          <div className="max-w-[40px] w-full h-[40px] bg-white shadow-md p-2 rounded-full overflow-hidden">
            <img src={info.row.original.picture} alt="error" />
          </div>
          <span className="font-semibold tracking-wider">
            {info.row.original.name}
          </span>
        </div>
      ),
      header: "Name",
    }),
    columnHelper.accessor("email", {
      id: "email",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Email",
    }),
    columnHelper.accessor("gender", {
      id: "gender",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Gender",
    }),
    columnHelper.accessor("department", {
      id: "department",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Department",
    }),
    columnHelper.accessor("totalHours", {
      id: "totalHours",
      cell: (info) => (
        <div className="relative text-center">
          <span className="-ml-10 font-medium tracking-wide">
            {" "}
            {info.getValue()} hrs
          </span>

          <BiDotsVerticalRounded
            onClick={() => ShowFunction(info.row.original.id)}
            size={20}
            className={`${
              show === info.row.original.id ? "text-blue-500" : "text-gray-500"
            } absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hover:text-gray-800`}
          />
          {show === info.row.original.id && (
            <div
              onClick={() => setShow(!show)}
              className="absolute top-3 right-7 h-[120px] w-[150px] flex flex-col justify-center pl-3 gap-2 z-20 bg-white shadow-lg border border-gray-200  rounded-br-xl rounded-l-xl "
            >
              <NavLink
                to="/student/"
                className="flex items-center gap-2 text-gray-700 tracking-wider hover:underline"
              >
                <CgProfile size={17} />
                Profile
              </NavLink>
              <NavLink className="flex items-center gap-2 text-gray-700 tracking-wider hover:underline">
                <FiEdit3 /> Update
              </NavLink>
              <NavLink className="flex items-center gap-2 text-gray-700 tracking-wider hover:underline">
                <RiDeleteBinLine /> Delete
              </NavLink>
            </div>
          )}
        </div>
      ),
      header: "Total hours",
    }),
  ];

  const ShowFunction = (id) => {
    setShow((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div className="flex items-center justify-between px-2 mb-5">
        <div className="flex flex-col gap-3 items-start">
          <NavLink
            to="/Trainer-list"
            className="text-blue-500 text-sm font-medium mb-2 rounded-full flex items-center "
          >
            <MdKeyboardArrowLeft size={23} />
            <span className="text-base font-semibold tracking-wider">Back</span>
          </NavLink>
          <h1 className="text-xl font-semibold tracking-wider text-gray-700 flex items-center gap-5">
            {TrainerName}'s
            <span>Students</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-[230px] flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200">
            <BiSearch />
            <input
              type="text"
              placeholder="Search.."
              onChange={(e) => setSearchInput(e.target.value)}
              className="outline-none text-sm"
            />
          </div>
          <button className="flex items-center gap-2 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full">
            <BsPrinter size={17} />
            <span className="font-semibold tracking-wider">Print</span>
          </button>
        </div>
      </div>

      <StudentItem data={data} columns={columns} />
    </div>
  );
};

export default Trainer_studentList;
