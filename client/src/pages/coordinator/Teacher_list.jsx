import React, {lazy, useState, useRef } from "react";
const TableFormat = lazy(()=> import("../../components/ReusableTableFormat/TableFormat"));
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { BsPrinter } from "react-icons/bs";
import { createColumnHelper } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoordinator, getTeacherList, addTeacher } from "../../api/Api";
import picture from "../../assets/images/emptyProfile.png";
import {
  Switch,
  Avatar,
  useDisclosure as AddTeacherDisclosure,
} from "@nextui-org/react";
const AddTeacherModal = lazy(()=> import("../../components/add-teacher/AddTeacher"));
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
const List = lazy(()=> import("../../components/print-layout/List"));

const TeacherList = () => {
  const [searchInput, setSearchInput] = useState("");
  const columnHelper = createColumnHelper();
  const [show, setShow] = useState(null);
  const [searchLength, setSearchLength] = useState(false);
  const [isAddTeacher, setIsAddTeacher] = useState(false);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //modal add teacher
  const {
    isOpen: AddIsOpen,
    onOpen: AddTeacherOnOpen,
    onClose: AddTeacherOnClose,
  } = AddTeacherDisclosure();

  const queryClient = useQueryClient();

  const { mutate, isLoading: AddTeacherLoading } = useMutation({
    mutationFn: addTeacher,
    onSuccess: () => {
      Swal.fire(
        "Success",
        "The teacher has been added to the system",
        "success"
      );
      queryClient.invalidateQueries({ queryKey: ["coordinator_getTeacher"] });
      setIsAddTeacher(false);
    },
    onError: () => {
      Swal.fire(
        "Error",
        "There was an issue adding the teacher. \n Please check the information provided and try again.",
        "error"
      );
    },
  });

  //find coordinator id
  const { data: coordinatorId, isLoading: coordinator_loading } = useQuery({
    queryKey: ["getCoordinatorId"],
    queryFn: getCoordinator,
  });

  const {
    data: teacherList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coordinator_getTeacher"],
    queryFn: getTeacherList,
  });

  const data = teacherList
    ? teacherList
        .map(
          ({
            id,
            firstname,
            middlename,
            lastname,
            email,
            contact,
            campus,
            college,
            program,
            major,
            accountStatus,
            student,
            coordinator_id,
            profile_url,
          }) => ({
            id,
            name: `${firstname} ${
              middlename ? middlename[0].toUpperCase() : ""
            } ${lastname}`,
            email,
            contact,
            campus,
            college,
            program,
            major,
            picture: picture,
            accountStatus,
            totalStudent: student.filter((item) => item.deletedStatus === 0)
              .length,
            coordinator_id,
            url: profile_url,
          })
        )
        .filter((item) => item?.coordinator_id == coordinatorId?.id)
        .filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        )
    : [];

  const handleSubmit = (formData) => {
    mutate(formData);
  };



  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => <span>{info.row.index + 1}</span>,
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
    columnHelper.accessor("campus", {
      id: "campus",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Campus",
    }),
    columnHelper.accessor("college", {
      id: "college",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "College",
    }),
    columnHelper.accessor("program", {
      id: "program",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Program",
    }),
    columnHelper.accessor("major", {
      id: "major",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Major",
    }),
    columnHelper.accessor("totalStudent", {
      id: "totalStudent",
      cell: (info) => (
        <div className="text-center font-semibold">{info.getValue()}</div>
      ),
      header: "Students",
    }),

    columnHelper.accessor("accountStatus", {
      id: "accountStatus",
      cell: (info) => (
        <div className="relative text-center">
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
              className="absolute top-3 right-7  w-[150px] flex flex-col justify-center pl-3 gap-3 z-20 py-5 bg-white shadow-lg border border-gray-200  rounded-br-xl rounded-l-xl "
            >
              <NavLink
                to={`/view-teacher/${info.row.original.id}`}
                className="flex items-center gap-2 text-gray-700 tracking-wider hover:underline"
              >
                <CgProfile size={17} />
                Visit profile
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
            <th className="w-[20%] border font-semibold text-[13px]">
              Total Students
            </th>
          </tr>
        </thead>
        <tbody>
          {defaultData.map((item, index) => (
            <tr key={index} className="h-11">
              <td className="text-center border text-[13px]">{index + 1}</td>
              <td className=" border pl-4 text-[13px]">{item.name}</td>
              <td className=" border pl-4 text-[13px]">{item.email}</td>
              <td className="text-center border text-[13px]">
                {item.totalStudent}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row  items-center justify-between gap-7 px-2 mb-5">
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
          Teacher list
        </h1>

        <div
          className={`${
            searchLength && "flex-col gap-5"
          } flex sm:flex-row items-center gap-3 w-full sm:w-auto`}
        >
          <div
            className={`${
              searchLength ? "w-full" : "w-[40px]"
            } h-10  flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200 duration-300 transition-all`}
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
          <div className="flex items-center justify-end gap-3 w-full">
            <button
              onClick={() => setIsAddTeacher(true)}
              className="flex items-center gap-1 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full"
            >
              <AiOutlineUserAdd size={16} />
              <span className="font-semibold tracking-wider">Add</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full"
            >
              <BsPrinter size={17} />
              <span className="font-semibold tracking-wider">Print</span>
            </button>
          </div>
        </div>
      </div>

      <TableFormat data={data} isLoading={isLoading} isError={isError} columns={columns} />

      <AddTeacherModal
        AddIsOpen={isAddTeacher}
        AddOnOpen={AddTeacherOnOpen}
        AddOnClose={() => setIsAddTeacher(false)}
        onSubmit={handleSubmit}
        isLoading={AddTeacherLoading}
        info={coordinatorId}
        teacherList={data}
      />

      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <List title={`Teacher's List`} ListTable={ListTable} />
        </div>
      </div>
    </div>
  );
};

export default TeacherList;