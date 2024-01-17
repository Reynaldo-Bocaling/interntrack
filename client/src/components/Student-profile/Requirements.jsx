// import React, { useState } from "react";
// import { MdKeyboardArrowRight } from "react-icons/md";
// import BrgyCertificate from "../../components/student-requirement/BrgyCertificate";
// import Philhealth from "../../components/student-requirement/Philhealth";
// import Nso from "../../components/student-requirement/Nso";
// import { getRequirement, uploadRequirement } from "../../api/Api";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import Swal from "sweetalert2";

// function Requirements() {
//   const [OpenBrgyCertificate, setOpenBrgyCertificate] = useState(false);
//   const [OpenPhilhealth, setOpenPhilhealth] = useState(false);
//   const [OpenNso, setOpenNso] = useState(false);

//   const { data } = useQuery({
//     queryKey: ["getRequirement"],
//     queryFn: getRequirement,
//   });

//   const { mutate: BrgyMutate } = useMutation(uploadRequirement, {
//     onSuccess: () => {
//       Swal.fire("Success", "Barangay Certificate successfully added.", "success");
//       setOpenBrgyCertificate(false)
//     },
//     onError: () => {
//       Swal.fire("Error", "Failed to add the  Barangay Certificate. \n Please try again.", "error");  
//     },
//   });

//   const { mutate: PhilhealthMutate } = useMutation(uploadRequirement, {
//     onSuccess: () => {
//       Swal.fire("Success", "Philhealth successfully added.", "success");
//       setOpenPhilhealth(false)
//     },
//     onError: () => {
//       Swal.fire("Error", "Failed to add the  Philhealth \n Please try again.", "error");
//     },
//   });

//   const { mutate: NsoMutate } = useMutation(uploadRequirement, {
//     onSuccess: () => {
//       Swal.fire("Success", "NSO successfully added.", "success");
//       setOpenNso(false)
//     },
//     onError: () => {
//       Swal.fire("Error", "Failed to add the  NSO \n Please try again.", "error");
//     },
//   });

//   const handleBrgyCertificate = (formData) => {
//     BrgyMutate(formData);
//   };

//   const handlePhilhealth = (formData) => {
//     PhilhealthMutate(formData);
//   };

//   const handleNso = (formData) => {
//     NsoMutate(formData);
//   };

//   const viewBrgyCertificate = data
//     ? data.find((item) => item.type === "brgy")
//     : [];
//   const viewPhilhealth = data
//     ? data.find((item) => item.type === "philhealth")
//     : [];
//   const viewNso = data ? data.find((item) => item.type === "nso") : [];

//   //   console.log(viewBrgyCertificate);

//   return (
//     <div className="mt-3 mb-8">
//       <h1 className="pl-1 text-xl font-semibold">Requirements</h1>

//       <div className="mt-7 flex flex-col gap-3">
//         <div
//           onClick={() => setOpenBrgyCertificate(true)}
//           className="p-5 bg-white flex items-center justify-between rounded-lg border shadow-lg shadow-slate-100 hover:border hover:border-blue-300 transition-all"
//         >
//           <span className="text-lged font-medium tracking-wide text-blue-500">
//             BRGY Certificate
//           </span>
//           <MdKeyboardArrowRight size={23} className="text-gray-400" />
//         </div>
//         <div
//           onClick={() => setOpenPhilhealth(true)}
//           className="p-5 bg-white flex items-center justify-between rounded-lg border shadow-lg shadow-slate-100 hover:border hover:border-blue-300 transition-all"
//         >
//           <span className="text-lged font-medium tracking-wide text-blue-500">
//             Philhealth
//           </span>
//           <MdKeyboardArrowRight size={23} className="text-gray-400" />
//         </div>
//         <div
//           onClick={() => setOpenNso(true)}
//           className="p-5 bg-white flex items-center justify-between rounded-lg border shadow-lg shadow-slate-100 hover:border hover:border-blue-300 transition-all"
//         >
//           <span className="text-lged font-medium tracking-wide text-blue-500">
//             NSO
//           </span>
//           <MdKeyboardArrowRight size={23} className="text-gray-400" />
//         </div>
//       </div>

//       <BrgyCertificate
//         data={viewBrgyCertificate}
//         opened={OpenBrgyCertificate}
//         handleSubmit={handleBrgyCertificate}
//         onClose={() => setOpenBrgyCertificate(false)}
//       />

//       <Philhealth
//         data={viewPhilhealth}
//         opened={OpenPhilhealth}
//         handleSubmit={handlePhilhealth}
//         onClose={() => setOpenPhilhealth(false)}
//       />

//       <Nso
//         data={viewNso}
//         opened={OpenNso}
//         handleSubmit={handleNso}
//         onClose={() => setOpenNso(false)}
//       />
//     </div>
//   );
// }

// export default Requirements;


import React from 'react'

function Requirements() {
  return (
    <div>
      requirment
    </div>
  )
}

export default Requirements
