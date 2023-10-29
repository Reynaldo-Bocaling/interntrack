import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUsergroupAdd, AiOutlineUserAdd } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import { BsPrinter } from "react-icons/bs";
import AssignStudentModal from "../../components/AssignStudentToTrainer/AssignStudentModal";
import AddStudentModal from "../../components/AddSingleStudent/AddStudentModal";
import * as XLSX from "xlsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useDisclosure as ImportStudentDisclosure,
  useDisclosure as AddStudentDisclosure,
} from "@nextui-org/react";
import { getCompanyList, getDateRange, getTeacher, importStudent } from "../../api/Api";
import ImportStudentModalUI from "../../components/Import-Student/ImportForm";
import { Tabs } from "@mantine/core";
import AllStudent from "../../components/StudentList-Filter/All";
import AssignedStudent from "../../components/StudentList-Filter/Assigned";
import UnassignedStudent from "../../components/StudentList-Filter/UnAssigned";
import picture from "../../assets/images/dp.png";
import Swal from "sweetalert2";


const Student_list = () => {
  const [searchInput, setSearchInput] = useState("");
  const [AssignStudentModalIsOpen, setAssignStudentModalIsOpen] =
    useState(false);
  const [searchLength, setSearchLength] = useState(false);
  const [ImportData, setImportData] = useState(null);
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  // modal Import/add student
  const {
    isOpen: ImportIsOpen,
    onOpen: ImportStudentOnOpen,
    onClose: ImportStudentOnClose,
  } = ImportStudentDisclosure();
  
  const {
    isOpen: AddIsOpen,
    onOpen: AddOnOpen,
    onClose: AddOnClose,
  } = AddStudentDisclosure();

  //getCompany
  const {
    data: companyList,
    isLoading: GetCompanyLoading,
    isError,
  } = useQuery({
    queryKey: ["getCompany"],
    queryFn: getCompanyList,
  });

  
  // getStudent list
  const {
    data: StudentList,
    isLoading: StudentListLoading,
    isError: StudentListError,
  } = useQuery({
    queryKey: ["getStudent"],
    queryFn: getTeacher,
  });

  const data = StudentList
  ? StudentList.student.map(({
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
    deletedStatus
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
    trainer: trainer? `${trainer.firstname} ${trainer.lastname}` : '',
    accountStatus,
    studentTrainerStatus: trainer ? 'Assigned': 'Unassigned' ,
    studentAreaOfAssignment: AreaOfAssignment ? 'Assigned': 'Unassigned',
    deletedStatus
  })).filter((item)=>item.deletedStatus === 0)
   : []


   const limitCompany = companyList?.map(({
    id,
    companyName,
    address,
    email,
    contact,
    areaOfAssignment,
    director_id,
    profile,
    moaUpload
  }) => ({
    id,
    companyName,
    address,
    email,
    contact,
    director_id,
    profile,
    moaUpload,
    areaOfAssignment,
    totalStudent: areaOfAssignment?.flatMap(({student})=> student).length,
    totalSlot: areaOfAssignment?.flatMap(({slot})=> slot).reduce((sum, item)=> sum+item,0),
  })).filter((item)=> item.totalSlot > item.totalStudent);


  const {data:getDateRangeData} = useQuery({
    queryKey: ['getDateRange'],
    queryFn: getDateRange
});

 const DateRangeData = getDateRangeData ? getDateRangeData[0] : []


  // mutate
  const { mutate, isLoading: importLoading } = useMutation({
    mutationFn: importStudent,
    onSuccess: () => {
      Swal.fire("Success", "Students has been successfully imported.", "success");
      setImportData(null);
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["getStudent"] });
    },
    onError: () => {
      Swal.fire("Error", "There was an error during the student import process. \n Please review the data..", "error");    },
  });

  // import handle change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet);

        const isValid = validateData(excelData);

        if (!isValid) {
          setError("Invalid data in the excel file.");
          setImportData(null);
        } else {
          setError(null);
          setImportData(excelData);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleImportExcel = () => {

    mutate(ImportData);
  };

  // sanitation
  const validateData = (data) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[A-Za-z\s]+$/;

    for (const row of data) {
      if (!nameRegex.test(row.firstname)) {
        return false;
      }
    }
    return true;
  };

  // Student data



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
            onClick={ImportStudentOnOpen}
            className="flex items-center gap-1 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full"
          >
            <ImAttachment size={15} />
            <span className="font-semibold tracking-wider">Import</span>
          </button>
          <button
            onClick={AddOnOpen}
            className="flex items-center gap-1 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full"
          >
            <AiOutlineUserAdd size={16} />
            <span className="font-semibold tracking-wider">Add</span>
          </button>
          <button
            onClick={() => setAssignStudentModalIsOpen(true)}
            className="flex items-center gap-1 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full"
          >
            <AiOutlineUsergroupAdd size={17} />
            <span className="font-semibold tracking-wider">Assign Student</span>
          </button>
          <button className="flex items-center gap-2 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full">
            <BsPrinter size={17} />
            <span className="font-semibold tracking-wider">Print</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="first" className="w-full">
          <Tabs.List sx={{ borderColor: "#ecf0f1" }}>
            <Tabs.Tab
              className="text-base text-gray-500 tracking-wide"
              value="first"
            >
              All
            </Tabs.Tab>
            <Tabs.Tab
              className="text-base text-gray-500 tracking-wide"
              value="second"
            >
              Assigned
            </Tabs.Tab>
            <Tabs.Tab
              className="text-base text-gray-500 tracking-wide"
              value="third"
            >
              Unassigned
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first" pt="xs">
            <AllStudent data={data} isLoading={StudentListLoading} isError={StudentListError} />
          </Tabs.Panel>
          <Tabs.Panel value="second" pt="xs">
            <AssignedStudent data={data} isLoading={StudentListLoading} isError={StudentListError} />
          </Tabs.Panel>
          <Tabs.Panel value="third" pt="xs">
            <UnassignedStudent data={data} isLoading={StudentListLoading} isError={StudentListError} />
          </Tabs.Panel>
        </Tabs>
      </div>

      {/* import toggle modal */}
      <ImportStudentModalUI
        isOpen={ImportIsOpen}
        onClose={ImportStudentOnClose}
        error={error}
        ImportData={ImportData}
        importLoading={importLoading}
        handleFileChange={handleFileChange}
        handleImportExcel={handleImportExcel}
        DateRangeData={DateRangeData}
      />

      {/* Add Student modal */}
      <AddStudentModal
        AddIsOpen={AddIsOpen}
        AddOnOpen={AddOnOpen}
        AddOnClose={AddOnClose}
      />

      {/*  asign students modal */}
      <AssignStudentModal
        closeModal={() => setAssignStudentModalIsOpen(false)}
        isOpen={AssignStudentModalIsOpen}
        companies={limitCompany}
      />
    </div>
  );
};

export default Student_list;
