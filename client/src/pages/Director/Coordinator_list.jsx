import React, { useState, useRef } from "react";
import TableFormat from "../../components/ReusableTableFormat/TableFormat";
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine, RiUserSearchLine } from "react-icons/ri";
import { BsPrinter } from "react-icons/bs";
import { createColumnHelper } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";
import picture from "../../assets/images/emptyProfile.png";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AddCoordinatorAccount, getCoordinatorList } from "../../api/Api";
import { AiOutlineUserAdd } from "react-icons/ai";
import AddCoordinator from "../../components/add-coordinator/AddCoordinator";
import {
  Switch,
  useDisclosure as AddCoordinatorDisclosure,
  Avatar,
} from "@nextui-org/react";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import List from "../../components/print-layout/List";

const Trainer_list = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchLength, setSearchLength] = useState(false);
  const [isAddCoordinator, setIsAddCoordinator] = useState(false);


  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const columnHelper = createColumnHelper();
  const [show, setShow] = useState(null);

  const queryClient = useQueryClient();

  const { mutate, isLoading: AddCoordinatorLoading } = useMutation({
    mutationFn: AddCoordinatorAccount,
    onSuccess: (data) => {
      Swal.fire("Success", "The coordinator has been added", "success");
      queryClient.invalidateQueries({ queryKey: ["getCoordinatorList"] });
      setIsAddCoordinator(false)
    },
    onError: () => {
      Swal.fire(
        "Error",
        "There was an issue adding the coordinator. \n Please check the information provided and try again.",
        "error"
      );
    },
  });

  const {
    isOpen: AddIsOpen,
    onOpen: AddOnOpen,
    onClose: AddOnClose,
  } = AddCoordinatorDisclosure();

  const {
    data: coordinatorList,
    isLoading: coordinatorLoading,
    isError: coordinatoryError,
  } = useQuery({
    queryKey: ["getCoordinatorList"],
    queryFn: getCoordinatorList,
  });

  const data = coordinatorList
    ? coordinatorList
        .map(
          ({
            id,
            firstname,
            middlename,
            lastname,
            email,
            campus,
            college,
            contact,
            teacher,
            accountStatus,
            profile_url,
          }) => ({
            id,
            name: `${firstname} ${
              middlename ? middlename[0].toUpperCase() : ""
            }. ${lastname}`,
            email,
            campus,
            college,
            contact,
            picture: picture,
            totalTeacher: teacher ? teacher.length : 0,
            totalStudent: teacher.reduce(
              (total, item) =>
                total +
                item.student.filter((item) => item.deletedStatus === 0).length,
              0
            ),
            studentlist: teacher
              ? teacher.flatMap(({ student }) => student)
              : [],
            accountStatus,
            url: profile_url,
          })
        )
        .filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        )
    : [];

  const handleSubmit = (data) => {
    console.log(data);
    mutate(data);
  };

  //   columns
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
    columnHelper.accessor("contact", {
      id: "contact",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Contact",
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

    columnHelper.accessor("totalStudent", {
      id: "totalStudent",
      cell: (info) => (
        <div className="text-center font-semibold text-xs pr-7">
          {info.getValue()}
        </div>
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
            } absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-gray-800`}
          />
          {show === info.row.original.id && (
            <div
              onClick={() => setShow(!show)}
              className="absolute top-3 right-7  w-[150px] flex flex-col justify-center pl-3 gap-3 z-20 py-5 bg-white shadow-lg border border-gray-200  rounded-br-xl rounded-l-xl "
            >
              <NavLink
                to={`/view-coordinator/${info.row.original.id}`}
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
      header: "Active",
    }),
  ];

  const ShowFunction = (id) => {
    setShow((prev) => (prev === id ? null : id));
  };

  if (coordinatoryError) {
    return (
      <h1 className="text-center my-10">
        Server Failed. Please Try Again Later
      </h1>
    );
  }

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
      <div
        className={`flex flex-col lg:flex-row items-center justify-between gap-5 px-2 mb-5`}
      >
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
          Coordinator list
        </h1>

        <div
          className={`${
            searchLength && "flex-col gap-5"
          } flex sm:flex-row items-center gap-3 w-full sm:w-auto`}
        >
          <div
            className={`${
              searchLength ? "w-full" : "w-[40px]"
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
          <div className="flex items-center justify-end gap-3 w-full">
            <button
              onClick={()=> setIsAddCoordinator(true)}
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

      <TableFormat
        data={data}
        columns={columns}
        isLoading={coordinatorLoading}
      />

      <AddCoordinator
        AddIsOpen={isAddCoordinator}
        AddOnClose={()=>setIsAddCoordinator(false)}
        onSubmit={handleSubmit}
        isLoading={AddCoordinatorLoading}
      />

      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <List title={`Coordinator List`} ListTable={ListTable} />
        </div>
      </div>
    </div>
  );
};

export default Trainer_list;
