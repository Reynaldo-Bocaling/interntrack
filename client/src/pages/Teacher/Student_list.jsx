import React, { useState, useRef, lazy } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUsergroupAdd, AiOutlineUserAdd } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import { BsPrinter } from "react-icons/bs";
const AssignStudentModal = lazy(()=> import("../../components/AssignStudentToTrainer/AssignStudentModal"));
const AddStudentModal = lazy(()=> import("../../components/AddSingleStudent/AddStudentModal"));
import * as XLSX from "xlsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useDisclosure as ImportStudentDisclosure,
  useDisclosure as AddStudentDisclosure,
} from "@nextui-org/react";
import {
  addStudentAccount,
  getCompanyList,
  getDateRange,
  getTeacher,
  importStudent,
} from "../../api/Api";
const ImportStudentModalUI = lazy(()=> import("../../components/Import-Student/ImportForm"));
import { Tabs } from "@mantine/core";
const AllStudent = lazy(()=> import("../../components/StudentList-Filter/All"));
const AssignedStudent = lazy(()=> import("../../components/StudentList-Filter/Assigned"));
const UnassignedStudent = lazy(()=> import("../../components/StudentList-Filter/UnAssigned"));
import picture from "../../assets/images/dp.png";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
const List = lazy(()=> import("../../components/print-layout/List"));

const Student_list = () => {
  const [searchInput, setSearchInput] = useState("");
  const [AssignStudentModalIsOpen, setAssignStudentModalIsOpen] =
    useState(false);
  const [searchLength, setSearchLength] = useState(false);
  const [ImportData, setImportData] = useState(null);
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // modal Import/add student
  const {
    isOpen: ImportIsOpen,
    onOpen: ImportStudentOnOpen,
    onClose: ImportStudentOnClose,
  } = ImportStudentDisclosure();

 

  const [isAddStudent, setIsAddStudent] = useState(false);

  //getCompany
  const {
    data: companyList,
    isLoading: companyLoading,
    isError,
  } = useQuery({
    queryKey: ["teacher_getCompany"],
    queryFn: getCompanyList,
  });

  // getStudent list
  const {
    data: StudentList,
    isLoading: StudentListLoading,
    isError: StudentListError,
  } = useQuery({
    queryKey: ["teacher_getTeacher2"],
    queryFn: getTeacher,
  });

  const data = StudentList
    ? StudentList.student
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
            trainer,
            AreaOfAssignment,
            deletedStatus,
            section
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
            section,
            major,
            url: profile_url,
            picture: picture,
            company: AreaOfAssignment
              ? AreaOfAssignment.company.companyName
              : [],
            trainer: trainer ? `${trainer.firstname} ${trainer.lastname}` : "",
            accountStatus,
            studentTrainerStatus: trainer ? "Assigned" : "Unassigned",
            studentAreaOfAssignment: AreaOfAssignment
              ? "Assigned"
              : "Unassigned",
            deletedStatus,
          })
        )
        .filter((item) => item.deletedStatus === 0)
        .filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLocaleLowerCase())
        )
    : [];

  const limitCompany = companyList
    ?.map(
      ({
        id,
        companyName,
        address,
        email,
        contact,
        areaOfAssignment,
        director_id,
        profile,
        moaUpload,
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
        totalStudent: areaOfAssignment?.flatMap(({ student }) => student)
          .length,
        totalSlot: areaOfAssignment
          ?.flatMap(({ slot }) => slot)
          .reduce((sum, item) => sum + item, 0),
      })
    )
    .filter((item) => item.totalSlot > item.totalStudent);

  const { data: getDateRangeData } = useQuery({
    queryKey: ["getDateRange"],
    queryFn: getDateRange,
  });

  const DateRangeData = getDateRangeData ? getDateRangeData[0] : [];

  // mutate
  const { mutate, isLoading: importLoading } = useMutation({
    mutationFn: importStudent,
    onSuccess: () => {
      Swal.fire(
        "Success",
        "Students has been successfully imported.",
        "success"
      );
      setImportData(null);
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["teacher_getTeacher2"] });
    },
    onError: () => {
      Swal.fire(
        "Error",
        "There was an error during the student import process. \n Please review the data..",
        "error"
      );
    },
  });


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

        try {
          validateData(excelData);
          setError(null);
          setImportData(excelData);
        } catch (error) {
          setError(error.message);
          setImportData(null);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  
  const handleImportExcel = () => {
    if (ImportData) {
      mutate(ImportData);
    }
  };


  const lowerCaseDataEmails = data.map(({ email }) => email.toLowerCase());


  const validateData = (data) => {
    const emailSet = new Set();

    const firstnameRegex = /^[A-Za-z\s]+$/;
    const lastnameRegex = /^[A-Za-z\s]+$/;
    const sectionRegex = /^[A-Z]{1}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const mobileRegex =/^[0-9]/;
    const addressRegex =/^[A-Za-z\s]+$/;
    const genderRegex = /^(male|female)$/i;
    const majorRegex = /^[A-Za-z\s]+$/;


    const duplicateEmails = new Set();


    for (const row of data) {
      if (!row.firstname) {
        throw new Error("Firstname is empty");
      } else if (!row.lastname) {
        throw new Error("Lastname is empty");
      } else if (!row.email) {
        throw new Error("Email is empty");
      } else if (!row.contact) {
        throw new Error("Contact is empty");
      } else if (!row.address) {
        throw new Error("Address is empty");
      } else if (!row.gender) {
        throw new Error("Gender is empty");
      } else if (!row.major) {
        throw new Error("Major is empty");
      } else if (!row.section) {
        throw new Error("Section is empty");
      }

      //invalid type
      else if (!firstnameRegex.test(row.firstname)) {
        throw new Error(
          `"${row.firstname}" is invalid for a firstname. \nPlease enter a valid firstname`
        );
      } else if (!lastnameRegex.test(row.lastname)) {
        throw new Error(
          `"${row.lastname}" is invalid for a lastname. \nPlease enter a valid lastname`
        );
      } else if (!sectionRegex.test(row.section)) {
        throw new Error(
          `"${row.section}" is invalid for a section. \nPlease enter a valid section`
        );
      } else if (!emailRegex.test(row.email)) {
        throw new Error(
          `"${row.email}" is invalid for a email. \nPlease enter a valid email`
        );
      } else if (!genderRegex.test(row.gender)) {
        throw new Error(
          `"${row.gender}" is invalid for a Gender. \nPlease enter a valid Gender (Male | Female)`
        );
      } else if (!mobileRegex.test(row.contact)) {
        throw new Error(
          `"${row.contact}" is invalid for a Contact. \nPlease enter a valid Contact (Ex. 09489946337)`
        );
      } else if (!addressRegex.test(row.address)) {
        throw new Error(
          `"${row.address}" is invalid for a Address. \nPlease enter a valid Address, Ex. 45, San Juan, Metro Manila, 9876 Philippines (Brgy, City, Province)`
        );
      } else if (!majorRegex.test(row.major)) {
        throw new Error(
          `"${row.major}" is invalid for a Major. \nPlease enter a valid Major`
        );
      }
      


      else if (duplicateEmails.has(row.email.toLowerCase())) {
        throw new Error(`Duplicate record for email "${row.email}". Please ensure all records are unique.`);
      }


      
     else if (lowerCaseDataEmails.includes(row.email.toLowerCase())) {
      throw new Error(`Email "${row.email}" is already in use. Please enter a unique email.`);

    }

    }
  };

  // Student data


  
  const { mutate: addMutate, isLoading: addStudentLoading } = useMutation(
    addStudentAccount,
    {
      onSuccess: () => {
        Swal.fire("Success", "The Student has been added", "success");
        queryClient.invalidateQueries({ queryKey: ["teacher_getTeacher2"] });
        setIsAddStudent(false)
      },
      onError: () => {
        Swal.fire(
          "Error",
          "There was an issue adding the student. \n Please check the information provided and try again.",
          "error"
        );
      },
    }
  );

  // add sing student
  const handleAddStudent = (item) => {
    addMutate(item);
    // console.log('d',item);
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

  if (StudentListLoading || companyLoading) return <center>Loading</center>;

  return (
    <div>
        <div className="flex flex-col sm:flex-row  items-center justify-between gap-7 px-2 mb-5">
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
          Student list
        </h1>

        <div
          className={`flex-col
           flex sm:flex-row items-center gap-3 w-full sm:w-auto`}
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
          <div className="flex flex-wrap items-center justify-center lg:flex-nowrap lg:justify-end gap-3 w-full">
          <button
            onClick={ImportStudentOnOpen}
            className="flex items-center justify-center gap-1 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full  w-[45%] lg:w-auto"
          >
            <ImAttachment size={15} />
            <span className="font-semibold tracking-wider">Import</span>
          </button>
          <button
            onClick={()=> setIsAddStudent(true)}
            className="flex items-center justify-center gap-1 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full  w-[45%] lg:w-auto"
          >
            <AiOutlineUserAdd size={16} />
            <span className="font-semibold tracking-wider">Add</span>
          </button>
          <button
            onClick={() => setAssignStudentModalIsOpen(true)}
            className="flex items-center justify-center gap-1 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full  w-[160px]"
          >
            <AiOutlineUsergroupAdd size={17} />
            <span className="font-semibold tracking-wider">Assign Student</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full  w-[45%] lg:w-auto"
          >
            <BsPrinter size={17} />
            <span className="font-semibold tracking-wider">Print</span>
          </button>
          </div>
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
            <AllStudent
              data={data}
              isLoading={StudentListLoading}
              isError={StudentListError}
            />
          </Tabs.Panel>
          <Tabs.Panel value="second" pt="xs">
            <AssignedStudent
              data={data}
              isLoading={StudentListLoading}
              isError={StudentListError}
            />
          </Tabs.Panel>
          <Tabs.Panel value="third" pt="xs">
            <UnassignedStudent
              data={data}
              isLoading={StudentListLoading}
              isError={StudentListError}
            />
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
        AddIsOpen={isAddStudent}
        AddOnOpen={isAddStudent}
        AddOnClose={()=>setIsAddStudent(false)}
        handleAddStudent={handleAddStudent}
        isLoading={addStudentLoading}
      />

      {/*  asign students modal */}
      <AssignStudentModal
        closeModal={() => setAssignStudentModalIsOpen(false)}
        isOpen={AssignStudentModalIsOpen}
        companies={limitCompany}
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
