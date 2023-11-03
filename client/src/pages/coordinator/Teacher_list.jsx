import React, { useState } from "react";
import TableFormat from "../../components/ReusableTableFormat/TableFormat";
import { TrainerList } from "../../services/TrainerList";
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine, RiUserSearchLine } from "react-icons/ri";
import { BsPrinter } from "react-icons/bs";
import { createColumnHelper } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";
import AddStudentModal from "../../components/AddSingleStudent/AddStudentModal";
import { ImAttachment } from "react-icons/im";
import { AiOutlineUserAdd } from "react-icons/ai";
import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoordinator, getTeacherList, addTeacher } from "../../api/Api";
import picture from '../../assets/images/dp.png'
import {Switch ,  useDisclosure as AddTeacherDisclosure} from "@nextui-org/react";
import AddTeacherModal from '../../components/add-teacher/AddTeacher'
import Swal from "sweetalert2";


const TeacherList = () => {
  const [searchInput, setSearchInput] = useState("");
  const columnHelper = createColumnHelper();
  const [show, setShow] = useState(null);
  const [searchLength, setSearchLength] = useState(false);


  //modal add teacher
  const {
    isOpen: AddIsOpen,
    onOpen: AddTeacherOnOpen,
    onClose: AddTeacherOnClose,
  } = AddTeacherDisclosure();

  const queryClient = useQueryClient();

  const {mutate, isLoading: AddTeacherLoading, isError: AddTeacherError} = useMutation({
    mutationFn: addTeacher,
    onSuccess: (data)=> {
      Swal.fire("Success", "The teacher has been added to the system", "success");
      queryClient.invalidateQueries({ queryKey: ["getCoordinator"] });
      console.log('teacher',{username: data.username, password: data.password} );
    },
    onError: ()=> {
      Swal.fire("Error", "There was an issue adding the teacher. \n Please check the information provided and try again.", "error");
    }
  })



  //find coordinator id


  const  {
    data: coordinatorId,
    isLoading: coordinator_idLoading,
  } = useQuery({
    queryKey: ["getCoordinatorId"],
    queryFn: getCoordinator
  });


  const  {
    data: teacherList,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getCoordinator"],
    queryFn: getTeacherList
  });

  const data = teacherList 
  ? teacherList.map(({
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
    coordinator_id
  })=> ({
    id,
    name: `${firstname} ${middlename ? middlename[0].toUpperCase() : ''} ${lastname}`,
    email,
    contact,
    campus,
    college,
    program,
    major,
    picture: picture,
    accountStatus,
    totalStudent: student.filter((item)=>item.deletedStatus ===0).length,
    coordinator_id
  }))
  .filter((item)=> item?.coordinator_id == coordinatorId?.id)
  .filter((item)=>item.name.toLowerCase().includes(searchInput.toLowerCase()))
  : []


  const handleSubmit = (formData) => {
      mutate(formData)
  }

  if(isError){
    return <h1 className="text-center my-10">Server Failed. Please Try Again Later</h1>
  }




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
      cell: (info) => <div className="text-center font-semibold">{info.getValue()}</div>,
      header: "Students",
    }),

    columnHelper.accessor("accountStatus", {
      id: "accountStatus",
      cell: (info) => (
        <div className="relative text-center">
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
              className="absolute top-3 right-7  w-[150px] flex flex-col justify-center pl-3 gap-3 z-20 py-5 bg-white shadow-lg border border-gray-200  rounded-br-xl rounded-l-xl "
            >
              <NavLink
                to={`/view-teacher/${info.row.original.id}`}
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

  return (
    <div>
      <div className="flex items-center justify-between px-2 mb-5">
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
          Teacher list
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
            onClick={AddTeacherOnOpen}
            className="flex items-center gap-1 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full"
          >
            <AiOutlineUserAdd size={16} />
            <span className="font-semibold tracking-wider">Add</span>
          </button>
          <button className="flex items-center gap-2 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full">
            <BsPrinter size={17} />
            <span className="font-semibold tracking-wider">Print</span>
          </button>
        </div>
      </div>

      <TableFormat data={data} isLoading={isLoading} columns={columns} />
     

      <AddTeacherModal
        AddIsOpen={AddIsOpen}
        AddOnOpen={AddTeacherOnOpen}
        AddOnClose={AddTeacherOnClose}
        onSubmit={handleSubmit}
        isLoading={AddTeacherLoading}
      />

    </div>
  );
};

export default TeacherList;
