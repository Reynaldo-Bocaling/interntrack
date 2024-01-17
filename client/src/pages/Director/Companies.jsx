import React, { useRef, useState } from "react";
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";
import { HiOutlineDotsVertical, HiOutlineEye } from "react-icons/hi";
import { IconTrash } from "@tabler/icons-react";
import { BsPrinter } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import AddCompanyComponents from "../../components/Add-companies/AddCompanies"; //
import { getCompanyList, addCompany } from "../../api/Api";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import PulseLoader from "react-spinners/PulseLoader";
import { useDisclosure as AddTeacherDisclosure } from "@nextui-org/react";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import List from "../../components/print-layout/List";
import { createColumnHelper } from "@tanstack/react-table";
import TableFormat from "../../components/ReusableTableFormat/TableFormat";
import { CgProfile } from "react-icons/cg";

const Companies = () => {
  const [searchInput, setSearchInput] = useState("");
  const [AddCompanyModalIsOpen, setAddCompanyModalIsOpen] = useState(false);
  const [OpenTableMenu, setOpenTableMenu] = useState(null);
  const [searchLength, setSearchLength] = useState(false);
  const columnHelper = createColumnHelper();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [isAddCompany, setIsAddCompany] = useState(false);

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
      queryClient.invalidateQueries("director_getCompanyList");
      setAddCompanyModalIsOpen(false);
      setIsAddCompany(false)
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
    queryKey: ["director_getCompanyList"],
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

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "No",
    }),

    columnHelper.accessor("companyName", {
      id: "companyName",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Company Name",
    }),
    columnHelper.accessor("address", {
      id: "address",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Address",
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

    columnHelper.accessor("totalStudent", {
      id: "totalStudent",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Total Students",
    }),

    columnHelper.accessor("slots", {
      id: "slots",
      cell: (info) => (
        <div className="flex items-center relative">
          <p className=" pl-7">{info.getValue()}</p>
          <div className=" text-center">
            <BiDotsVerticalRounded
              onClick={() => ShowFunction(info.row.original.id)}
              size={20}
              className={`${
                show === info.row.original.id
                  ? "text-blue-500"
                  : "text-gray-500"
              } absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-gray-800`}
            />
            {show === info.row.original.id && (
              <div
                onClick={() => setShow(!show)}
                className="absolute top-3 right-7  w-[180px] flex flex-col justify-center pl-3 gap-3 z-20 py-5 bg-white shadow-lg border border-gray-200  rounded-br-xl rounded-l-xl "
              >
                <NavLink
                  to={`/view-company/${info.row.original.id}`}
                  className="flex items-center gap-2 text-gray-700 tracking-wider hover:underline"
                >
                  <CgProfile size={17} />
                  View Company
                </NavLink>
              </div>
            )}
          </div>
        </div>
      ),
      header: "Available",
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
              onClick={()=> setIsAddCompany(true)}
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
        data={filtered}
        isLoading={companyLoading}
        isError={companyError}
        columns={columns}
      />

      {/* modal */}
      <AddCompanyComponents
        AddIsOpen={isAddCompany}
        AddOnOpen={AddTeacherOnOpen}
        AddOnClose={()=>setIsAddCompany(false)}
        isOpen={AddCompanyModalIsOpen}
        closeModal={() => setAddCompanyModalIsOpen(false)}
        onAddCompany={handleAddCompany}
        isLoading={companyLoading}
        addLoading={isLoading}
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
