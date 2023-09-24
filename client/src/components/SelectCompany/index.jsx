// import React, { useState } from 'react';
// import CustomAutocomplete from './SelectCompany';

// const data = {
//   companies: [
//     {
//       id: 1,
//       name: "7-Eleven",
//       trainers: [
//         { id: 1, name: "Alex" },
//         { id: 2, name: "Roan" }
//       ],
//       areasOfAssignment: [
//         { id: 1, name: "Cashier", slots: 5 },
//         { id: 2, name: "OAR", slots: 3 },
//       ],
//     },
//     {
//       id: 2,
//       name: "SM",
//       trainers: [
//         { id: 3, name: "Drew" },
//         { id: 4, name: "Gel" }
//       ],
//       areasOfAssignment: [
//         { id: 3, name: "Guard", slots: 5 },
//         { id: 4, name: "Office", slots: 3 },
//         { id: 5, name: "Stores", slots: 3 },
//       ],
//     },
//     // ...Iba pang mga kumpanya
//   ],
// };

// function Main() {
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [selectedTrainer, setSelectedTrainer] = useState(null);
//   const [selectedAreaOfAssignment, setSelectedAreaOfAssignment] = useState(null);


//   const filteredTrainers =
//     selectedCompany ? selectedCompany.trainers : [];
//   const filteredAreasOfAssignment =
//     selectedCompany ? selectedCompany.areasOfAssignment : [];

//   const handleCompanyChange = (event, newValue) => {
//     setSelectedCompany(newValue);
//     setSelectedAreaOfAssignment(null); // Reset selected area
//     setSelectedTrainer(null); // Reset selected trainer
//   };

//   const handleTrainerChange = (event, newValue) => {
//     setSelectedTrainer(newValue);
//   };

//   const handleAreaChange = (event, newValue) => {
//     setSelectedAreaOfAssignment(newValue);
//   };

//   const handleAddStudent = () => {
//     // if (selectedCompany && selectedAreaOfAssignment && selectedTrainer) {
//       // Mag-collect ng impormasyon ng student
//       const newStudentData = {
//         company: selectedCompany.name,
//         trainer: selectedTrainer.name,
//         area: selectedAreaOfAssignment.name,
//         name: 'studentName',
//         contact: 'studentContact',
//         email: 'studentEmail',
//       };

//       // I-output ang collected na data sa console log
//       console.log('New Student Data:', newStudentData);

//     //   // Dapat dito ay isasave mo ito sa iyong backend o database
//     // } else {
//     //   console.error('Please fill in all fields.');
//     // }
//   };

//   return (
//     <div className='p-5 flex flex-col gap-3'>
//       <div className='flex gap-3'>
//       <CustomAutocomplete
//         size={'w-[50%]'}
//         options={data.companies}
//         label="Choose a Company"
//         value={selectedCompany}
//         onChange={handleCompanyChange}
//       />
     
//         <CustomAutocomplete
//             size={'w-[50%]'}
//           options={filteredTrainers}
//           label="Choose a Trainer"
//           value={selectedTrainer}
//           onChange={handleTrainerChange}
//           disabled={!selectedCompany}
//         />
//       </div>
        
//         <div className='flex items-center gap-5'>
//         <CustomAutocomplete
//         size={'w-[85%]'}
//           options={filteredAreasOfAssignment}
//           label="Choose an Area of Assignment"
//           value={selectedAreaOfAssignment}
//           onChange={handleAreaChange}
//           disabled={!selectedCompany}
//         />

//         <button onClick={handleAddStudent} className='w-[15%] bg-blue-500 py-3 px-5 rounded-lg text-white'>Assign</button>

//         </div>

      
//       {/* <button onClick={handleAddStudent}>Add Student</button> */}
//     </div>
//   );
// }

// export default Main;
