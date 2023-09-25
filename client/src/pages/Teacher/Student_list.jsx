import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUsergroupAdd, AiOutlineUserAdd } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import { BsPrinter } from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
import AssignStudentModal from "../../components/AssignStudentToTrainer/AssignStudentModal";
import AddStudentModal from "../../components/AddSingleStudent/AddStudentModal";
import * as XLSX from "xlsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  useDisclosure as ImportStudentDisclosure,
  useDisclosure as AddStudentDisclosure,
} from "@nextui-org/react";
import { getCompany, importStudent } from "../../api/Api";
import ImportStudentModalUI from "../../components/Import-Student/ImportForm";


const Student_list = () => {
  const [searchInput, setSearchInput] = useState("");
  const [AssignStudentModalIsOpen, setAssignStudentModalIsOpen] =
    useState(false);
  const [searchLength, setSearchLength] = useState(false);
  const [ImportData, setImportData] = useState(null);
  const [error, setError] = useState(null);

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
    queryFn: getCompany,
  });

  // mutate
  const { mutate, isLoading: importLoading } = useMutation({
    mutationFn: importStudent,
    onSuccess: () => {
      alert("success");
      setImportData(null);
      setError(null);
    },
    onError: () => {
      alert("failed");
    },
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
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      for (const row of data) {
        if (!nameRegex.test(row.firstname) || !emailRegex.test(row.email)) {
          return false;
        }
      }
      return true;
    };

  return (
    <div>
      <div className="flex items-center justify-between px-2 mb-5">
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
          Student list
        </h1>

        
      </div>

      <div className="flex items-center justify-between px-2 mb-5">
        <div className=" flex items-center gap-3">
          <NavLink className="StudentListFilterLink" to="/student-list/">
            All
          </NavLink>
          <NavLink
            className="StudentListFilterLink"
            to="/student-list/Assigned"
          >
            Assigned
          </NavLink>
          <NavLink
            className="StudentListFilterLink"
            to="/student-list/UnAssigned"
          >
            Unassigned
          </NavLink>
        </div>

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

      
      {/* import toggle modal */}
      <ImportStudentModalUI
        isOpen={ImportIsOpen}
        onClose={ImportStudentOnClose}
        error={error}
        ImportData={ImportData}
        importLoading={importLoading}
        handleFileChange={handleFileChange}
        handleImportExcel={handleImportExcel}
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
        companies={companyList}
      />





      {/* ouput of all studnet table */}
      <Outlet />

    </div>
  );
};

export default Student_list;
