import React, { useState, useRef } from "react";
import TableFormat from "../../components/ReusableTableFormat/TableFormat";
import picture from "../../assets/images/dp.png";
import { BsPrinter } from "react-icons/bs";
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { createColumnHelper } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTrainer, getStudentList } from "../../api/Api";
import { Avatar, Switch } from "@nextui-org/react";
import { useReactToPrint } from "react-to-print";
import List from "../../components/print-layout/List";

const Student_list = () => {
  const [searchLength, setSearchLength] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const columnHelper = createColumnHelper();
  const [show, setShow] = useState(null);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const {
    data: StudentTimesheet,
    isLoading: studentListLoading,
    isError,
  } = useQuery({
    queryKey: ["getStudentTimesheet"],
    queryFn: getStudentList,
  });

  const { data: getTrainer_id } = useQuery({
    queryKey: ["getTrainer_id"],
    queryFn: getTrainer,
  });

  //   data
  const data = StudentTimesheet
    ? StudentTimesheet.filter((item) => item.trainer_id === getTrainer_id?.id)
        .map(
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
            AreaOfAssignment,
            deletedStatus,
            timesheet,
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
            company: AreaOfAssignment
              ? AreaOfAssignment.company.companyName
              : [],
            accountStatus,
            totalHours: timesheet
              ?.filter((item) => item.logStatus === 1)
              .reduce((total, item) => total + item.totalHours, 0),
            deletedStatus,
          })
        )
        .filter((item) => item.deletedStatus === 0)
        .filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        )
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
          <Avatar
            src={info.row.original.url ? info.row.original.url : picture}
            className="text-large"
          />
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
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Program",
    }),
    columnHelper.accessor("major", {
      id: "major",
      cell: (info) => <span>{info.getValue()}</span>,
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
          <Switch
            isDisabled
            className="mr-7"
            size="sm"
            defaultSelected={
              info.row.original.accountStatus === 0 ? true : false
            }
          />

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
            <th className="w-[10%] border font-semibold text-[13px]">Sex</th>
            <th className="w-[10%] border font-semibold text-[13px]">
              Program
            </th>
            <th className="w-[10%] border font-semibold text-[13px]">Major</th>
          </tr>
        </thead>
        <tbody>
          {defaultData.map((item, index) => (
            <tr key={index} className="h-11">
              <td className="text-center border text-[13px]">{index + 1}</td>
              <td className=" border pl-4 text-[13px]">{item.name}</td>
              <td className=" border pl-4 text-[13px]">{item.email}</td>
              <td className="text-center border text-[13px] capitalize">
                {item.gender}
              </td>
              <td className="text-center border text-[13px] uppercase">
                {item.program}
              </td>
              <td className="text-center border text-[13px] uppercase">
                {item.major}
              </td>
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

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full"
          >
            <BsPrinter size={17} />
            <span className="font-semibold tracking-wider">Print</span>
          </button>
        </div>
      </div>

      <TableFormat
        isError={isError}
        data={data}
        columns={columns}
        isLoading={studentListLoading}
      />

      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <List title={`Student List`} ListTable={ListTable} />
        </div>
      </div>
    </div>
  );
};

export default Student_list;
