import React, { useState } from "react";
import TableFormat from "../../components/ReusableTableFormat/TableFormat";
import picture from "../../assets/images/dp.png";
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { createColumnHelper } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";
import {useQuery} from '@tanstack/react-query'
import { getTrainer, getStudentList } from "../../api/Api";
import {Switch} from "@nextui-org/react";


const Student_list = () => {
  const [searchInput, setSearchInput] = useState("");
  const columnHelper = createColumnHelper();
  const [show, setShow] = useState(null);


  const {data:StudentTimesheet,isLoading: studentListLoading, isError} = useQuery({
    queryKey: ["getTimesheet"],
    queryFn: getStudentList
  });

  // const {data: StudentList, isLoading: studentListLoading, isError} = useQuery({
  //   queryKey: ["studentList"],
  //   queryFn: getTrainer
  // })



  //   data
  const data = StudentTimesheet ?  StudentTimesheet.map(({
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
    profile,
    accountStatus,
    teacher,
    AreaOfAssignment
  })=> ({
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
    profile,
    picture:picture,
    company: AreaOfAssignment ? AreaOfAssignment.company.companyName: [],
    accountStatus,
    totalHours: 170
  })): []

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
    columnHelper.accessor("program", {
      id: "program",
      cell: (info) =>  <span>{info.getValue()}</span>,
      header: "Program",
    }),
    columnHelper.accessor("major", {
        id: "major",
        cell: (info) =>  <span>{info.getValue()}</span>,
        header: "major",
      }),
    columnHelper.accessor("company", {
        id: "company",
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Company",
      }),
    columnHelper.accessor("totalHours", {
        id: "totalHours",
        cell: (info) => <span>{info.getValue()} hrs</span>,
        header: "Total Hours",
      }),
  
    columnHelper.accessor("accountStatus", {
      id: "accountStatus",
      cell: (info) => (
        <div className="relative">
          
          <Switch  isDisabled className="mr-7" size="sm" defaultSelected={info.row.original.accountStatus === 0 ? true : false} />

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
                to={`/view-student/${info.row.original.id}`}
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
      header: "Active",
    }),
  ];

  const ShowFunction = (id) => {
    setShow((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div className="flex items-center justify-between px-2 mb-5">
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
          Student list
        </h1>
        <div className="h-10 w-[230px] flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200">
          <BiSearch />
          <input
            type="text"
            placeholder="Search.."
            onChange={(e) => setSearchInput(e.target.value)}
            className="outline-none text-sm"
          />
        </div>
      </div>

      <TableFormat isError={isError} data={data} columns={columns} isLoading={studentListLoading} />
    </div>
  );
};

export default Student_list;
