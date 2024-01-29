// import React from 'react'
// import AddAdmin from "./AddSuperAdmin";
// import { BiSolidKey } from "react-icons/bi";
// import {
//     Modal,
//     ModalContent,
//     ModalHeader,
//     ModalBody,
//     Button,
//     Input,
//   } from "@nextui-org/react";
//   import { PinInput } from "@mantine/core";
// import {useQuery} from '@tanstack/react-query'
// import { getAdminList } from '../../api/Api';
// import { LiaTimesSolid } from "react-icons/lia";
// import { IoWarning } from "react-icons/io5";



// export const AddAdminModal = (props) => {
//     const {onOpenChangeEvent,openSuperAdmin,handlePinChange,pinError} = props;

//     const {data, isLoading} = useQuery({
//       queryKey: ['getSuperAdmin'],
//       queryFn: getAdminList
//     });


//     if(isLoading) return <center className='py-10 text-lg '>Getting Data</center>
//   return (
//     <div>
//       <Modal
//         isOpen={openSuperAdmin}
//         onOpenChange={onOpenChangeEvent}
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1 text-base font-medium">
//                  {
//                   data?.length > 1 ? <div className='text-sm flex items-center gap-1'>
//                   Something went wrong
//                   <LiaTimesSolid className='text-red-500' size={23} />
//                   </div> : "Super admin Sign in Form"
//                 }
//               </ModalHeader>
//               <ModalBody>
//                 {data?.length > 1 ? 
//                 (
//                   <center className='mt-3 mb-12 tracking-wide text-red-500'>Super Admin already exists. Please contact the system administrator for further assistance. <IoWarning size={50} className='mt-5' />
//                   </center>
//                 ): (
//                   <div className="w-full pt-2 pb-7 flex items-center justify-center">
//                   {!pinError ? (
//                     <div className="flex flex-col items-center gap-5">
//                       <h1 className="flex items-center gap-2">
//                         Secret Key <BiSolidKey className="text-yellow-500" />
//                       </h1>
//                       <PinInput size="lg" onChange={handlePinChange} />
//                     </div>
//                   ) : (
//                     <AddAdmin />
//                   )}
//                 </div>
//                 )}
                
//               </ModalBody>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   )
// }











// import React, { useState } from "react";
// import { Input, Button } from "@nextui-org/react";
// import { addAdminAccount } from "../../api/Api";
// import { useMutation } from "@tanstack/react-query";
// import Swal from "sweetalert2";

// export const AddAdmin = ()=> {
//   const [formData, setFormatData] = useState({
//     firstname: "",
//     middlename: "",
//     lastname: "",
//     email: "",
//     contact: "",
//   });

//   // State to store validation errors
//   const [errors, setErrors] = useState({
//     firstname: null,
//     middlename: null,
//     lastname: null,
//     email: null,
//     contact: null,
//   });

//   const { mutate, isLoading } = useMutation(addAdminAccount, {
//     onSuccess: () => {
//       Swal.fire("Success", "The Super admin has been added", "success");
//     },
//     onError: () => {
//       Swal.fire(
//         "Error",
//         "There was an issue adding the Super admin. \n Please check the information provided and try again.",
//         "error"
//       );
//     },
//   });

//   const handleChange = (e) => {
//     const { value, name } = e.target;

//     // Real-time validation using regular expressions
//     const validationError =
//       name === "email"
//         ? !/^\S+@\S+\.\S+$/.test(value)
//         : name === "contact"
//         ? !/^\d+$/.test(value)
//         : name === "firstname" || name === "middlename" || name === "lastname"
//         ? !/^[A-Za-z\s]+$/.test(value)
//         : null;

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: validationError ? `${name} is invalid` : null,
//     }));

//     setFormatData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     // Check if there are any validation errors
//     if (Object.values(errors).every((error) => error === null)) {
//       mutate(formData);
//     } else {
//       // Handle validation errors
//       console.log("Validation errors:", errors);
//     }
//   };

//   return (
//     <div className="w-full flex flex-col gap-3 p-2">
//       <Input
//         type="text"
//         label="Firstname"
//         name="firstname"
//         onChange={handleChange}
//         className="w-full"
//         errorMessage={errors.firstname}
//       />
//       <Input
//         type="text"
//         label="Middlename"
//         name="middlename"
//         onChange={handleChange}
//         className="w-full"
//         errorMessage={errors.middlename}
//       />
//       <Input
//         type="text"
//         label="Lastname"
//         name="lastname"
//         onChange={handleChange}
//         className="w-full"
//         errorMessage={errors.lastname}
//       />
//       <Input
//         type="text"
//         label="Email"
//         name="email"
//         onChange={handleChange}
//         className="w-full"
//         errorMessage={errors.email}
//       />
//       <Input
//         type="text"
//         label="Contact"
//         name="contact"
//         onChange={handleChange}
//         className="w-full"
//         errorMessage={errors.contact}
//       />
//       <Button 
//       color="primary"  
//       isDisabled={isLoading}
//       onClick={handleSubmit}
//       >
//         {isLoading ? "Processing..." : "Submit"}
//       </Button>
//     </div>
//   );
// }





