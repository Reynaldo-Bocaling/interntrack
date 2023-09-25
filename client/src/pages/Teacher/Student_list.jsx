import React, { useEffect, useState } from "react";
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineUsergroupAdd, AiOutlineUserAdd } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { ImAttachment } from "react-icons/im";
import { BsPrinter } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { createColumnHelper } from "@tanstack/react-table";
import { NavLink, Outlet } from "react-router-dom";
import AssignStudentModal from "../../components/AssignStudentToTrainer/AssignStudentModal";
import AddStudentModal from "../../components/AddSingleStudent/AddStudentModal";
import excel1 from "../../assets/icons/excelImg1.png";
import excel2 from "../../assets/icons/excelImg4.png";
import excel3 from "../../assets/icons/excelImg5.png";
import excel4 from "../../assets/icons/excelImg6.png";
import logo from "../../assets/icons/logo.png";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";
import * as XLSX from "xlsx";
import {useMutation, useQuery} from '@tanstack/react-query';
import {Modal,ModalContent,ModalHeader,ModalBody,useDisclosure, Select, SelectItem} from "@nextui-org/react";
import { getCompany, importStudent } from "../../api/Api";

const Student_list = () => {
  const [searchInput, setSearchInput] = useState("");
  const [show, setShow] = useState(null);
  const [AddStudentModalIsOpen, setAddStudentModalIsOpen] = useState(false);
  const [AssignStudentModalIsOpen, setAssignStudentModalIsOpen] = useState(false);
  const [searchLength, setSearchLength] = useState(false);
  const [ImportData, setImportData] = useState(null);
  const [error, setError] = useState(null);
  // import toggle
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //getCompany
  const {data:companyList, isLoading:GetCompanyLoading, isError} = useQuery({
    queryKey: ["getCompany"],
    queryFn: getCompany
  })

  // mutate
  const { mutate, isLoading: importLoading } = useMutation({
    mutationFn: importStudent,
    onSuccess: () => {
      alert('success');
      setImportData(null);
      setError(null);
    },
    onError: () => {
      alert("failed");
    },
  });


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
    mutate(ImportData)
  }


  // 3dots function
  const ShowFunction = (id) => {
    setShow((prev) => (prev === id ? null : id));
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
            onClick={onOpen}
            className="flex items-center gap-1 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full"
          >
            <ImAttachment size={15} />
            <span className="font-semibold tracking-wider">Import</span>
          </button>
          <button
            onClick={() => setAddStudentModalIsOpen(true)}
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

      {/* modal asign student */}
      <AssignStudentModal
        closeModal={() => setAssignStudentModalIsOpen(false)}
        isOpen={AssignStudentModalIsOpen}
        companies={companyList}
      />
      <AddStudentModal
        isOpen={AddStudentModalIsOpen}
        closeModal={() => setAddStudentModalIsOpen(false)}
      />

     











<div className="flex items-center justify-between">
        <div className="mb-5 flex items-center gap-3">
          <NavLink className="StudentListFilterLink" to="/student-list/">
            All
          </NavLink>
          <NavLink className="StudentListFilterLink" to="/student-list/Assigned">
            Assigned
          </NavLink>
          <NavLink
            className="StudentListFilterLink"
            to="/student-list/UnAssigned"
          >
            Unassigned
          </NavLink>
        </div>

        {/* <Select
          placeholder="Select Course"
          className="w-[250px]"
          data={[
            { value: 'cict', label: 'CICT' },
            { value: 'crim', label: 'CRIM' },
            { value: 'nurse', label: 'NURSE' },
            { value: 'educ', label: 'EDUC' },
          ]}
        /> */}
      </div>

      {/* ouput of all studnet table */}
      <Outlet />


      {/* import toggle modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="h-[370px] max-w-[500px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex  gap-1">
                <img src={logo} alt="" className="w-[28px]" />
                <span className="text-sm">Import Student</span>
              </ModalHeader>

              <ModalBody>
                <div className="relative h-full flex flex-col items-center justify-center gap-5 overflow-hidden">
                  <button
                    className={`circleImport relative h-[90px] w-[90px] text-blue-500 rounded-full mb-4  border flex items-center justify-center`}
                  >
                    {ImportData ? (
                      <FiCheck size={30} className="check text-green-500" />
                    ) : (
                      <AiOutlineCloudDownload size={30} />
                    )}
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute scale-[3] opacity-0 cursor-pointer "
                    />
                  </button>
                  <span
                    className={`${
                      ImportData ? "text-green-500" : "text-red-500"
                    } font-medium tracking-wide`}
                  >
                    {ImportData ? (
                      <div className="flex flex-col items-center gap-3">
                        Success! All data is valid{" "}
                        <small className="font-normal text-gray-500">
                          Total of Student : {ImportData.length}
                        </small>
                      </div>
                    ) : error == null ? (
                      <small className="clicktoUploadTextBlink text-gray-400">
                        Click to upload
                      </small>
                    ) : (
                      error
                    )}
                  </span>
                  <button
                    disabled={!ImportData}
                    onClick={handleImportExcel}
                    className={` ${!ImportData
                        ? "cursor-not-allowed bg-blue-300"
                        : "bg-blue-500"
                    } text-white font-medium tracking-wide  shadow-2xl shadow-blue-50 py-2 px-10 rounded-full overflow-hidden`}
                  >
                    <span>
                      {importLoading ? 'Processing...':'Import Now' }
                      
                    </span>
                  </button>
                  {!ImportData && (
                    <small className=" -mt-3 text-red-300">Not Available</small>
                  )}

                  <img
                    src={excel1}
                    alt=""
                    className="imageImport rotate absolute top-2 left-1 w-[80px] opacity-[0.05]"
                  />
                  <img
                    src={excel2}
                    alt=""
                    className="imageImport absolute top-0 -right-4 w-[100px] opacity-[0.08]"
                  />
                  <img
                    src={excel3}
                    alt=""
                    className="imageImport  absolute bottom-[10%] right-5 w-[50px] opacity-[0.08]"
                  />
                  <img
                    src={excel4}
                    alt=""
                    className="imageImport  absolute bottom-[40%] left-12 w-[50px] opacity-[0.08]"
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Student_list;
