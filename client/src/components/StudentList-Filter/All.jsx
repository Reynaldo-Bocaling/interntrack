import React, {useState } from "react";
import StudentItem from "../../components/StudentList/StudentItem";
import {BiDotsVerticalRounded } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { createColumnHelper } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";


const Student_list = ({data, isLoading, isError}) => {
  const columnHelper = createColumnHelper();
  const [show, setShow] = useState(null);

  

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
    columnHelper.accessor("teacher", {
      id: "teacher",
      cell: (info) => <span className="text-xs">{info.getValue()}</span>,
      header: "Teacher",
    }),
    columnHelper.accessor("trainer", {
      id: "trainer",
      cell: (info) => <span className={`${info.getValue() == "Not Assigned" && "text-red-500"} text-xs`}>{info.getValue()}</span>,
      header: "Trainer",
    }),
    columnHelper.accessor("company", {
        id: "company",
        cell: (info) => <span className={`${info.getValue() == "Not Assigned" && "text-red-500"} text-xs`}>{info.getValue()}</span>,
        header: "Company",
      }),
  
    columnHelper.accessor("AccountStatus", {
      id: "AccountStatus",
      cell: (info) => (
        <div className="relative">
          {info.getValue() !== 0 ? (
            <span className="text-green-500 font-medium tracking-wide bg-green-100 px-2 py-1 rounded-lg">
              Assigned
            </span>
          ) : (
            <span className="text-red-500 font-medium tracking-wide bg-red-100 px-2 py-1 rounded-lg duration-300 transition-all">
              Unassign
            </span>
          )}
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
      header: "AccountStatus",
    }),
  ];

  const ShowFunction = (id) => {
    setShow((prev) => (prev === id ? null : id));
  };

  return (
    <div className="mt-3">
       {isError ? (
        <h1 className="my-10 text-center py-5 border">
          Server Failed. Please try again later
        </h1>
       ): (
        <StudentItem data={data} isLoading={isLoading}  columns={columns}  />
       )
       }
    </div>
  );
};

export default Student_list;
