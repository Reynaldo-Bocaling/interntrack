import React from 'react'
import AddAdmin from "./AddSuperAdmin";
import { BiSolidKey } from "react-icons/bi";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    Input,
  } from "@nextui-org/react";
  import { PinInput } from "@mantine/core";
import {useQuery} from '@tanstack/react-query'
import { getAdminList } from '../../api/Api';
import { LiaTimesSolid } from "react-icons/lia";
import { IoWarning } from "react-icons/io5";



const AddAdminModal = (props) => {
    const {onOpenChangeEvent,openSuperAdmin,handlePinChange,pinError} = props;

    const {data, isLoading} = useQuery({
      queryKey: ['getSuperAdmin'],
      queryFn: getAdminList
    });


    if(isLoading) return <center className='py-10 text-lg '>Getting Data</center>
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      
                <div className='max-w-[450px] w-full border rounded-lg py-10 px-3 flex flex-col'>
                    <p className='text-2xl font-semibold px-4 pb-5'>Admin Registration</p>
                    {/* {data?.length > 1 ? 
                (
                  <center className='mt-3 mb-12 tracking-wide text-red-500'>Super Admin already exists. Please contact the system administrator for further assistance. <IoWarning size={50} className='mt-5' />
                  </center>
                ): (
                  <div className="w-full pt-2 pb-7 flex items-center justify-center">
                  {!pinError ? (
                    <div className="flex flex-col items-center gap-5">
                      <h1 className="flex items-center gap-2">
                        Secret Key <BiSolidKey className="text-yellow-500" />
                      </h1>
                      <PinInput size="lg" onChange={handlePinChange} />
                    </div>
                  ) : ( */}
                    <AddAdmin />
                  {/* )}
                </div>
                )}
                 */}
             
                </div>
    </div>
  )
}

export default AddAdminModal
