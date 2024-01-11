import React, { useRef, useState } from "react";
import TableFormat from "../../components/ReusableTableFormat/TableFormat";
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine, RiUserSearchLine } from "react-icons/ri";
import { createColumnHelper } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import AddTrainer from "../../components/AddTrainer/Addtrainer";
import picture from "../../assets/images/emptyProfile.png";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { AddTrainerAccount, getTrainerList, getCompanyList } from "../../api/Api";
import { Switch, Avatar, useDisclosure as AddCoordinatorDisclosure } from "@nextui-org/react";
import Swal from "sweetalert2";
import { BsPrinter } from "react-icons/bs";
import List from "../print-layout/List";
import { useReactToPrint } from "react-to-print";

const TrainerList = () => {
  const [searchInput, setSearchInput] = useState("");
  const columnHelper = createColumnHelper();
  const [show, setShow] = useState(null);
  const [searchLength, setSearchLength] = useState(false);
  const [isAddTrainer, setIsAddTrainer] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading: addLoading } = useMutation({
    mutationFn: AddTrainerAccount,
    onSuccess: () => {
      Swal.fire(
        "Success",
        "The trainer has been added to the system",
        "success"
      );
      queryClient.invalidateQueries({ queryKey: ["getTrainerList"] });
      setIsAddTrainer(false);
    },
    onError: () => {
      Swal.fire(
        "Error",
        "There was an issue adding the trainer. \n Please check the information provided and try again.",
        "error"
      );
    },
  });

  const { data: trainerList, isLoading: trainerListLoading, isError: companyListError } = useQuery({
    queryKey: ["getTrainerList"],
    queryFn: getTrainerList,
  });

  const { data: company, isLoading: companyLoading, isError: companyError } = useQuery({
    queryKey: ["getCompanyList"],
    queryFn: getCompanyList,
  });

  if (companyListError) {
    return <h1 className="text-center my-10">Server Failed. Please Try Again Later</h1>;
  }

  const data = trainerList
    ? trainerList.map(({ id, firstname, middlename, lastname, email, contact, profile, accountStatus, areaofAssignment, student, deletedStatus, profile_url }, index) => ({
        id: index + 1,
        firstname,
        name: `${firstname} ${lastname}`,
        email,
        companyName: areaofAssignment.company.companyName,
        picture: picture,
        contact,
        profile,
        areaAssign: areaofAssignment.areaName,
        accountStatus,
        student,
        totalStudent: student.filter((item) => item.deletedStatus === 0).length,
        url: profile_url,
      })).filter((item) => item.name.toLowerCase().includes(searchInput))
    : [];

  const handleFormSubmit = async (trainerData) => {
    mutate(trainerData);
  };

  const columns = [
    columnHelper.accessor("id", { id: "id", cell: (info) => <span>{info.getValue()}</span>, header: "ID" }),
    columnHelper.accessor("name", {
      id: "name",
      cell: (info) => (
        <div className="flex items-center gap-3">
          <Avatar src={info.row.original.url ? info.row.original.url : picture} className="text-large" />
          <span className="font-semibold tracking-wider">{info.row.original.name}</span>
        </div>
      ),
      header: "Name",
    }),
    columnHelper.accessor("email", { id: "email", cell: (info) => <span>{info.getValue()}</span>, header: "Email" }),
    columnHelper.accessor("contact", { id: "contact", cell: (info) => <span>{info.getValue()}</span>, header: "Contact" }),
    columnHelper.accessor("companyName", { id: "companyName", cell: (info) => <span>{info.getValue()}</span>, header: "Company" }),
    columnHelper.accessor("areaAssign", { id: "areaAssign", cell: (info) => <span>{info.getValue()}</span>, header: "Area assign" }),
    columnHelper.accessor("totalStudent", { id: "totalStudent", cell: (info) => <div className="text-center">{info.getValue()}</div>, header: "Students" }),
    columnHelper.accessor("accountStatus", {
      id: "accountStatus",
      cell: (info) => (
        <div className="relative text-center">
          <Switch isDisabled className="mr-7" size="sm" defaultSelected={info.row.original.accountStatus === 0 ? true : false} />
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
              className="absolute top-3 right-7 w-[150px] flex flex-col justify-center pl-3 gap-3 z-20 py-5 bg-white shadow-lg border border-gray-200 rounded-br-xl rounded-l-xl "
            >
              <NavLink to={`/view-trainer/${info.row.original.id}`} className="flex items-center gap-2 text-gray-700 tracking-wider hover:underline">
                <CgProfile size={17} />
                Profile
              </NavLink>
              <NavLink to="/trainer-student-list" state={{ List: info.row.original.studentList, trainerName: info.row.original.firstname }} className="flex items-center gap-2 text-gray-700 tracking-wider hover:underline">
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

  const ListTable = () => {
    return (
      <table className="border w-full mt-2">
        <thead>
          <tr className="h-11">
            <th className="w-[10%] border font-semibold text-[13px]">No.</th>
            <th className="w-[20%] border font-semibold text-[13px] text-left pl-4">Name</th>
            <th className="w-[30%] border font-semibold text-[13px] text-left pl-4">Email</th>
            <th className="w-[10%] border font-semibold text-[13px] text-left pl-4">Contact</th>
            <th className="w-[15%] border font-semibold text-[13px] text-left pl-4">Company</th>
            <th className="w-[15%] border font-semibold text-[13px] text-left pl-4">Area Assign</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="h-11">
              <td className="text-center border text-[13px]">{index + 1}</td>
              <td className=" border pl-4 text-[13px]">{item.name}</td>
              <td className=" border pl-4 text-[13px]">{item.email}</td>
              <td className="text-left pl-4 border text-[13px]">{item.contact}</td>
              <td className=" border pl-4 text-[13px]">{item.companyName}</td>
              <td className=" border pl-4 text-[13px]">{item.areaAssign}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-7 px-2 mb-5">
        <h1 className="text-xl font-bold tracking-wider text-gray-700">Trainer list</h1>
        <div className={`${searchLength && "flex-col gap-5"} flex sm:flex-row items-center gap-3 w-full sm:w-auto`}>
          <div className={`${searchLength ? "w-full" : "w-[40px]"} h-10  flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200 duration-300 transition-all`}>
            <BiSearch onClick={() => setSearchLength(!searchLength)} className={`${searchLength ? "text-blue-500" : "text-gray-600"} cursor-pointer`} />
            {searchLength && <input type="text" placeholder="Search.." onChange={(e) => setSearchInput(e.target.value)} className="outline-none text-sm" />}
          </div>
          <div className="flex items-center justify-end gap-3 w-full">
            <button onClick={() => setIsAddTrainer(true)} className="flex items-center gap-1 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full">
              <AiOutlineUserAdd size={16} />
              <span className="font-semibold tracking-wider">Add</span>
            </button>
            <button onClick={handlePrint} className="flex items-center gap-2 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full">
              <BsPrinter size={17} />
              <span className="font-semibold tracking-wider">Print</span>
            </button>
          </div>
        </div>
      </div>
      <TableFormat data={data} columns={columns} isLoading={trainerListLoading} />
      <AddTrainer companies={company} onSubmit={handleFormSubmit} AddIsOpen={isAddTrainer} AddOnClose={() => setIsAddTrainer(false)} isLoading={addLoading} trainerList={data} />
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <List title={`Trainer List`} ListTable={ListTable} />
        </div>
      </div>
    </div>
  );
};

export default TrainerList;
