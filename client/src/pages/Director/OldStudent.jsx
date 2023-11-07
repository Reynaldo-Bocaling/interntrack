import React, { useState, useRef } from "react";
import TableFormat from "../../components/ReusableTableFormat/TableFormat";
import { TrainerList } from "../../services/TrainerList";
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine, RiUserSearchLine } from "react-icons/ri";
import { BsPrinter } from "react-icons/bs";
import { createColumnHelper } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentList, getTeacherList } from "../../api/Api";
import picture from '../../assets/images/dp.png'
import {Switch ,  useDisclosure as AddTeacherDisclosure} from "@nextui-org/react";
import AddTeacherModal from '../../components/add-teacher/AddTeacher'
import { useReactToPrint } from "react-to-print";
import List from "../../components/print-layout/List";
import { format } from "date-fns";


const TeacherList = () => {
  const [searchInput, setSearchInput] = useState("");
  const columnHelper = createColumnHelper();
  const [show, setShow] = useState(null);
  const [searchLength, setSearchLength] = useState(false);

//   cons


 
  const {
    data: StudentList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getStudent"],
    queryFn: getStudentList,
  });
  const data = StudentList
    ? StudentList.map(
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
          trainer,
          AreaOfAssignment,
          deletedStatus,
          createAt
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
          company: AreaOfAssignment ? AreaOfAssignment.company.companyName : [],
          trainer: trainer ? `${trainer.firstname} ${trainer.lastname}` : "",
          accountStatus,
          studentTrainerStatus: trainer ? "Assigned" : "Unassigned",
          studentAreaOfAssignment: AreaOfAssignment ? "Assigned" : "Unassigned",
          deletedStatus,
          createAt
        })
      )
      .filter((item) => item.deletedStatus === 1)
      .filter((item)=>item.name.toLowerCase().includes(searchInput.toLowerCase()))
    : [];



console.log(data);


  if(isError){
    return <h1 className="text-center my-10">Server Failed. Please Try Again Later</h1>
  }



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
      cell: (info) => <span className={`${info.getValue() == "Not Assigned" && "text-red-500"} text-xs`}>{info.getValue()}</span>,
      header: "Program",
    }),
    columnHelper.accessor("major", {
        id: "major",
        cell: (info) => <span className={`${info.getValue() == "Not Assigned" && "text-red-500"} text-xs`}>{info.getValue()}</span>,
        header: "major",
      }),
    columnHelper.accessor("company", {
        id: "company",
        cell: (info) => 
        <span className={`${info.row.original.studentTrainerStatus === "Unassigned" && 'text-red-500'}`}>
          {
            info.row.original.studentAreaOfAssignment === "Assigned" ?  info.row.original.company : 'Not assigned'
          }
        </span>,
        header: "Company",
      }),
    columnHelper.accessor("trainer", {
        id: "trainer",
        cell: (info) => 
        <span className={`${info.row.original.studentTrainerStatus === "Unassigned" && 'text-red-500'}`}>
          {
            info.row.original.studentTrainerStatus === "Assigned" ?  info.row.original.trainer : 'Not assigned'
          }
        </span>,
        header: "Trainer",
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

  return (
    <div>
      <div className="flex items-center justify-between px-2 mb-5">
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
          Old Student
        </h1>

        <div className="flex items-center gap-3">
        <div
            className={`w-[250px] h-10  flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200 duration-300`}
          >
            <BiSearch
              
              className={ "text-blue-500 cursor-pointer"}
            />
            <input
                type="text"
                placeholder="Search.."
                onChange={(e) => setSearchInput(e.target.value)}
                className="outline-none text-sm"
              />
          </div>
        
          
        </div>
      </div>

      <TableFormat data={data} isLoading={isLoading} columns={columns} />
    
     

    </div>
  );
};

export default TeacherList;
