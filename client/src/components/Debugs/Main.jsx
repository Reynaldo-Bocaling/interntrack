import React, { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiOutlineDotsVertical, HiOutlineEye } from "react-icons/hi";
import { IconTrash } from "@tabler/icons-react";
import { BsPrinter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import AddCompanyComponents from "../../components/Add-companies/AddCompanies"; //
import { getCompanyList, addCompany } from "../../api/Api";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import PulseLoader from "react-spinners/PulseLoader";
import { useDisclosure as AddTeacherDisclosure } from "@nextui-org/react";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import List from "../../components/print-layout/List";

const Companies = () => {
  const [searchInput, setSearchInput] = useState("");
  const [AddCompanyModalIsOpen, setAddCompanyModalIsOpen] = useState(false);
  const [OpenTableMenu, setOpenTableMenu] = useState(null);
  const [searchLength, setSearchLength] = useState(false);

  const navigate = useNavigate();

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const {
    isOpen: AddIsOpen,
    onOpen: AddTeacherOnOpen,
    onClose: AddTeacherOnClose,
  } = AddTeacherDisclosure();

  const queryClient = useQueryClient();

  // add company
  const { mutate, isLoading } = useMutation({
    mutationFn: addCompany,
    onSuccess: () => {
      Swal.fire("Success", "The company has been added", "success");
      queryClient.invalidateQueries("getCompanyList");
      setAddCompanyModalIsOpen(false);
    },
    onError: () => {
      Swal.fire(
        "Error",
        "There was an issue adding the campany. \n Please check the information provided and try again.",
        "error"
      );
    },
  });
  // getCompanies
  const {
    data: company,
    isLoading: companyLoading,
    isError: companyError,
  } = useQuery({
    queryKey: ["getCompanyList"],
    queryFn: getCompanyList,
  });

  const handleAddCompany = async (formData) => {
    mutate(formData);
    console.log(formData);
  };

  const filtered = company
    ? company
        .map(
          ({ id, companyName, address, email, contact, areaOfAssignment }) => ({
            id,
            companyName,
            address,
            email,
            contact,
            slots: areaOfAssignment.reduce(
              (total, item) => total + item.slot,
              0
            ),
            totalStudent: areaOfAssignment
              ?.flatMap(({ trainer }) =>
                trainer?.flatMap(({ student }) => student)
              )
              .filter((item) => item.deletedStatus === 0).length,
          })
        )
        .filter((item) =>
          item.companyName.toLowerCase().includes(searchInput.toLowerCase())
        )
    : [];

  const defaultData = [...filtered];
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
              Company
            </th>
            <th className="w-[30%] border font-semibold text-[13px] text-left pl-4">
              Address
            </th>
            <th className="w-[30%] border font-semibold text-[13px] text-left pl-4">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {defaultData.map((item, index) => (
            <tr key={index} className="h-11">
              <td className="text-center border text-[13px]">{index + 1}</td>
              <td className=" border pl-4 text-[13px]">{item.companyName}</td>
              <td className=" border pl-4 text-[13px]">{item.address}</td>
              <td className="text-left pl-4 border text-[13px]">
                {item.email}
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
          Company list
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
              onClick={AddTeacherOnOpen}
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

      {companyError ? (
        <h1 className="my-10 text-center py-5 border">
          Server Failed. Please try again later
        </h1>
      ) : (
        <div className="min-w-screen p-2 border rounded-lg bg-white overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="h-14 border-b">
                <th className="text-sm font-semibold tracking-wide ">No.</th>
                <th className="text-sm text-left pl-5 font-bold tracking-wide ">
                  Company Name
                </th>
                <th className="text-sm text-left pl-5 font-bold tracking-wide ">
                  Address
                </th>
                <th className="text-sm text-left pl-5 font-bold tracking-wide ">
                  Email
                </th>
                <th className="text-sm text-left pl-5 font-bold tracking-wide ">
                  Total Students
                </th>
                <th className="text-sm text-left pl-5 font-bold tracking-wide ">
                  Available
                </th>
              </tr>
            </thead>
            <tbody>
              {companyLoading ? (
                <tr className="h-16">
                  <td colSpan={8} className="text-center  h-12 w-full">
                    <div className="mt-5">
                      <PulseLoader
                        color="#1892fc"
                        margin={5}
                        size={13}
                        speedMultiplier={1}
                        className="mx-auto"
                      />
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((item, index) => (
                  <tr className="h-12" key={index}>
                    <td className="text-sm text-left pl-5 tracking-wide ">
                      {index + 1}
                    </td>
                    <td className="text-sm text-left pl-5 tracking-wide ">
                      {item.companyName}
                    </td>
                    <td className="text-sm text-left pl-5 tracking-wide ">
                      {item.address}
                    </td>
                    <td className="text-sm text-left pl-5 tracking-wide ">
                      {item.email}
                    </td>
                    <td className="text-sm text-center font-semibold tracking-wide ">
                      {item.totalStudent}
                    </td>
                    <td className="text-sm text-left pl-9 tracking-wide ">
                      <div className="relative">
                        <span className="pr-10">
                          {item.slots - item.totalStudent}
                        </span>
                        <div>
                          <button
                            className=" absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer hover:text-gray-700"
                            onClick={() =>
                              setOpenTableMenu((prev) =>
                                prev === item.id ? null : item.id
                              )
                            }
                          >
                            <HiOutlineDotsVertical size={20} />
                          </button>
                          {OpenTableMenu === item.id && (
                            <div
                              className="absolute flex flex-col justify-center gap-4 top-[30%] right-7 p-5 bg-white z-50 rounded-l-lg rounded-br-lg h-[100px] w-[130px] shadow-lg border"
                              onClick={() => setOpenTableMenu(null)}
                            >
                              <button
                                onClick={() =>
                                  navigate(
                                    `/view-company/${item.id && item.id}`
                                  )
                                }
                                className="flex items-center gap-1 text-gray-700 font-medium tracking-wide hover:underline"
                              >
                                <HiOutlineEye size={17} />
                                View
                              </button>
                              <button className="flex items-center gap-1 text-red-500 font-medium tracking-wide hover:underline">
                                <IconTrash size="1rem" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* modal */}
      <AddCompanyComponents
        AddIsOpen={AddIsOpen}
        AddOnOpen={AddTeacherOnOpen}
        AddOnClose={AddTeacherOnClose}
        isOpen={AddCompanyModalIsOpen}
        closeModal={() => setAddCompanyModalIsOpen(false)}
        onAddCompany={handleAddCompany}
        isLoading={companyLoading}
      />

      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <List title={`Companies`} ListTable={ListTable} />
        </div>
      </div>
    </div>
  );
};

export default Companies;
