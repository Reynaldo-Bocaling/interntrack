import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiOutlineDotsVertical, HiOutlineEye } from "react-icons/hi";
import { IconTrash } from "@tabler/icons-react";
import { BsPrinter } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {AiOutlineUserAdd } from "react-icons/ai";
import AddCompany from "../../components/Add-companies/AddcCompanies";
import sm from '../../assets/images/SM Logo.png'
import sevenEleven from '../../assets/images/7eleven.jpg'
import neust from '../../assets/images/neustLogo.png'
import axios from "axios";

const Companies = () => {

  const [AddCompanyModalIsOpen, setAddCompanyModalIsOpen] = useState(false);
  const [OpenTableMenu, setOpenTableMenu] = useState(null);
  const navigate = useNavigate();
    
    const [tryData, setTryData] = useState([])

    useEffect(()=> {
      const fetch = async(e) => {
        try {
          const response = await axios.get('http://localhost:3001/getCompanyList');
          setTryData(response.data)
        } catch (error) {
          console.log(error);
        }
      }
      fetch()
    }, [])


    const filtered =  tryData.map(({
      id,
      companyName,
      address,
      email,
      contact,
      areaOfAssignment,
      
        })=> ({
          id,
          companyName,
          address,
          email,
          contact,
          slots: areaOfAssignment.reduce((total, item) => total + item.slot, 0)
        }))



  return (
    <div>
       <div className="flex items-center justify-between px-2 mb-5" >
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
          Company list
        </h1>

        <div className="flex items-center gap-3">
          <div className="h-10 w-[230px] flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200">
            <BiSearch />
            <input
              type="text"
              placeholder="Search.."
             
              className="outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <button 
            onClick={()=> setAddCompanyModalIsOpen(true)}
            className="flex items-center gap-1 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full">
                <AiOutlineUserAdd size={16} />
                <span className='font-semibold tracking-wider'>Add</span>
            </button>
            <button className="flex items-center gap-2 text-xs text-white  bg-blue-500 px-4 py-2 rounded-full">
                <BsPrinter size={17} />
                <span className='font-semibold tracking-wider'>Print</span>
            </button>
          </div>
        </div>
      </div>


      {/* table */}
      <div className="max-w-full p-2 border rounded-lg bg-white">
        <table className="w-full">
          <thead>
            <tr className="h-14 border-b">
              <th className="text-sm font-semibold tracking-wide ">No.</th>
              <th className="text-sm text-left pl-5 font-bold tracking-wide ">Company Name</th>
              <th className="text-sm text-left pl-5 font-bold tracking-wide ">Address</th>
              <th className="text-sm text-left pl-5 font-bold tracking-wide ">Email</th>
              <th className="text-sm text-left pl-5 font-bold tracking-wide ">Contact</th>
              <th className="text-sm text-left pl-5 font-bold tracking-wide ">Company status</th>
              <th className="text-sm text-left pl-5 font-bold tracking-wide ">Total Students</th>
              <th className="text-sm text-left pl-5 font-bold tracking-wide ">Available</th>
            </tr>
          </thead>
          <tbody>
            {
              filtered.map((item, index)=> (
                  <tr 
                  className="h-12"
                  key={item.id}>
                   <td  className="text-sm text-left pl-5 tracking-wide ">{index + 1}</td>
                    <td  className="text-sm text-left pl-5 tracking-wide ">{item.companyName}</td>
                    <td  className="text-sm text-left pl-5 tracking-wide ">{item.address}</td>
                    <td  className="text-sm text-left pl-5 tracking-wide ">{item.email}</td>
                    <td  className="text-sm text-left pl-5 tracking-wide ">{item.contact}</td>
                    <td  className="text-sm text-left pl-5 tracking-wide ">Moa Approve</td>
                    <td  className="text-sm text-center font-semibold tracking-wide ">{40}</td>
                    <td  className="text-sm text-left pl-9 tracking-wide " >
                      <div className="relative">
                        <span className="pr-10">{item.slots}</span>
                        <div>
                          <button 
                          className=" absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer hover:text-gray-700"
                          onClick={()=> setOpenTableMenu((prev) => prev === item.id? null: item.id)}
                          >
                            <HiOutlineDotsVertical size={20}  />
                          </button>
                         {
                          OpenTableMenu === item.id && (
                            <div 
                            className="absolute flex flex-col justify-center gap-4 top-[30%] right-7 p-5 bg-white z-50 rounded-l-lg rounded-br-lg h-[100px] w-[130px] shadow-lg border"
                            onClick={()=> setOpenTableMenu(null)}
                            >
                            <button 
                            onClick={()=> navigate('/company', {state:item})}
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
                          )
                         }
                        </div>
                      </div>
                    </td>
                  </tr>
              ))
            }
           
          </tbody>
        </table>
      </div>







     {/* modal */}
      <AddCompany isOpen={AddCompanyModalIsOpen} closeModal={()=> setAddCompanyModalIsOpen(false)} />
    </div>
  );
};

export default Companies;
