import React, { useState } from "react";
import StudentItem from "../../components/StudentList/StudentItem";
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine, RiUserSearchLine } from "react-icons/ri";
import { BsPrinter } from "react-icons/bs";
import { createColumnHelper } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";
import picture from "../../assets/images/dp.png";
import { useQuery } from "@tanstack/react-query";
import { getTrainer } from "../../api/Api";
const Trainer_list = () => {
  const [searchInput, setSearchInput] = useState("");
  const columnHelper = createColumnHelper();
  const [show, setShow] = useState(null);

  // getTrainer list
  const {
    data: trainerlist,
    isLoading: trainerListLoading,
    isError: companyListError,
  } = useQuery({
    queryKey: ["getTrainerList"],
    queryFn: getTrainer,
  });

  //   data
  const data = trainerlist
    ? trainerlist
        .map(
          ({
            id,
            firstname,
            middlename,
            lastname,
            email,
            gender,
            companyName,
            contact,
            student,
          }) => ({
            id,
            firstname,
            name: `${firstname} ${middlename[0]}. ${lastname}`,
            email,
            gender,
            companyName,
            picture: picture,
            contact,
            totalStudent: student !== null ? student.length : 0,
            picture,
            student,
          })
        )
        .filter((item) => item.name.toLowerCase().includes(searchInput))
    : [];

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
    columnHelper.accessor("companyName", {
      id: "companyName",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Company",
    }),
    columnHelper.accessor("totalStudent", {
      id: "totalStudent",
      cell: (info) => (
        <div className="relative text-center">
          <span className="font-medium -ml-20">{info.getValue()}</span>
          <BiDotsVerticalRounded
            onClick={() => ShowFunction(info.row.original.id)}
            size={20}
            className={`${
              show === info.row.original.id ? "text-blue-500" : "text-gray-500"
            } absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-gray-800`}
          />
          {show === info.row.original.id && (
            <div
              onClick={() => setShow(!show)}
              className="absolute top-3 right-7  w-[150px] flex flex-col justify-center pl-3 gap-3 z-20 py-5 bg-white shadow-lg border border-gray-200  rounded-br-xl rounded-l-xl "
            >
              <NavLink
                to="/student/"
                className="flex items-center gap-2 text-gray-700 tracking-wider hover:underline"
              >
                <CgProfile size={17} />
                Profile
              </NavLink>

              <NavLink
                to="/trainer-student-list"
                state={{
                  List: info.row.original.studentList,
                  trainerName: info.row.original.firstname,
                }}
                className="flex items-center gap-2 text-gray-700 tracking-wider hover:underline"
              >
                <RiUserSearchLine size={17} />
                Student list
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
      header: "Total student",
    }),
  ];

  const ShowFunction = (id) => {
    setShow((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div className="flex items-center justify-between px-2 mb-5">
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
          Trainer list
        </h1>

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
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full">
              <BsPrinter size={17} />
              <span className="font-semibold tracking-wider">Print</span>
            </button>
          </div>
        </div>
      </div>

      <StudentItem
        data={data}
        columns={columns}
        isLoading={trainerListLoading}
      />
    </div>
  );
};

export default Trainer_list;
