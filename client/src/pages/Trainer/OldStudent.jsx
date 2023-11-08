import React, { useState } from "react";
import TableFormat from "../../components/ReusableTableFormat/TableFormat";
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RiDeleteBinLine } from "react-icons/ri";
import { createColumnHelper } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTrainer, getStudentList } from "../../api/Api";
import { format } from "date-fns";
import { Avatar } from "@nextui-org/react";
import picture from '../../assets/images/emptyProfile.png'

const Student_list = () => {
  const [searchLength, setSearchLength] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const columnHelper = createColumnHelper();
  const [show, setShow] = useState(null);

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
            profile,
            accountStatus,
            teacher,
            AreaOfAssignment,
            deletedStatus,
            timesheet,
            createAt,
            profile_url
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
            profile,
            picture: picture,
            company: AreaOfAssignment
              ? AreaOfAssignment.company.companyName
              : [],
            accountStatus,
            totalHours: timesheet
              ?.filter((item) => item.logStatus === 1)
              .reduce((total, item) => total + item.totalHours, 0),
            deletedStatus,
            createAt,
            url: profile_url
          })
        )
        .filter((item) => item.deletedStatus === 1)
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

    columnHelper.accessor("createAt", {
      id: "createAt",
      cell: (info) => (
        <div className="relative">
          
          <div className="pr-10">
          {
             format(new Date(info.row.original.createAt), 'yyyy')
          }
        </div>

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
              className="absolute top-3 right-7 py-4 w-[150px] flex flex-col justify-center pl-3 gap-2 z-20 bg-white shadow-lg border border-gray-200  rounded-br-xl rounded-l-xl "
            >
              <NavLink
                to={`/view-student/${info.row.original.id}`}
                className="flex items-center gap-2 text-gray-700 tracking-wider hover:underline"
              >
                <CgProfile size={17} />
                Profile
              </NavLink>
              {/* <NavLink className="flex items-center gap-2 text-gray-700 tracking-wider hover:underline">
                <FiEdit3 /> Update
              </NavLink>
              <NavLink className="flex items-center gap-2 text-gray-700 tracking-wider hover:underline">
                <RiDeleteBinLine /> Delete
              </NavLink> */}
            </div>
          )}
        </div>
      ),
      header: "Batch",
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
          Old Student
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-[250px] h-10  flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200 duration-300`}
            >
              <BiSearch className={"text-blue-500 cursor-pointer"} />
              <input
                type="text"
                placeholder="Search.."
                onChange={(e) => setSearchInput(e.target.value)}
                className="outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <TableFormat
        isError={isError}
        data={data}
        columns={columns}
        isLoading={studentListLoading}
      />
    </div>
  );
};

export default Student_list;
