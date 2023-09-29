import React, { useState } from 'react'
import {Select, SelectItem} from "@nextui-org/react";
function Test() {
  const colleges = [
    {
      college_id: 1,
      college_desc: "College of Engineering",
      programs: [
        {
          prog_id: 101,
          prog_desc: "Computer Science",
          majors: [
            {
              major_id: 201,
              major_desc: "Software Engineering"
            },
            {
              major_id: 202,
              major_desc: "Data Science"
            }
          ]
        },
        {
          prog_id: 102,
          prog_desc: "Electrical Engineering",
          majors: [
            {
              major_id: 203,
              major_desc: "Power Systems"
            },
            {
              major_id: 204,
              major_desc: "Electronics"
            }
          ]
        }
      ]
    },
    {
      college_id: 2,
      college_desc: "College of Business",
      programs: [
        {
          prog_id: 103,
          prog_desc: "Marketing",
          majors: [
            {
              major_id: 205,
              major_desc: "Digital Marketing"
            },
            {
              major_id: 206,
              major_desc: "Finance"
            }
          ]
        }
      ]
    }
  ];



  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selecteTry, setSelecteTry] = useState(null);


const handleCollege = (e) => {
  setSelectedCollege(e.target.value);
  setSelectedProgram(null)
  setSelectedMajor(null)
}

const handleProgram = (e) => {
  setSelectedProgram(e.target.value);
  setSelectedMajor(null)
}



const handleMajor = (e) => {
  setSelectedMajor(e.target.value);
  
}



  // const programFilter = colleges.find((colleges) => colleges.college_id === select)

const handleTry = (e) => {
  setSelecteTry(e.target.value)
}





const programs2 = selectedCollege
? colleges.find(college => college.college_id === parseInt(selectedCollege))
: [];
const majors2 = selectedProgram
? programs2.find(program => program.prog_id === parseInt(selectedProgram))
: [];

console.log('program', programs2);
console.log('major', majors2);

  
  return (
    <div className=' flex flex-col gap-5 p-5 h-screen w-screen bg-gray-200'>
      <div className='flex flex-col gap-2'>
        <small>College</small>
        <Select 
        label="Select an item" 
        className="max-w-xs" 
        onChange={handleCollege}
        
      >
          {
            colleges ? 
            colleges.map((college) => (
              <SelectItem key={college.college_id}  value={college.college_id}>{college.college_desc}</SelectItem>
            )) : []
          }
        </Select>
      </div>

      <div className='flex flex-col gap-2'>
        <small>Program</small>
        <select value={selectedProgram || ''} onChange={handleProgram} className='py-3 w-[300px]'>
          <option value="">Select</option>
          {
            selectedCollege &&
            colleges.find((college) => college.college_id === parseInt(selectedCollege)).programs.map(program=> (
              <option key={program.prog_id}  value={program.prog_id}>{program.prog_desc}</option>
            ))
          }
        </select>
      </div>


      <div className='flex flex-col gap-2'>
        <small>Program</small>
        <select value={selectedMajor || ''} onChange={handleMajor} className='py-3 w-[300px]'>
          <option value="">Select</option>
          {
            selectedProgram &&
            colleges.find((college) => college.college_id === parseInt(selectedCollege)).programs.find(program => program.prog_id === parseInt(selectedProgram)).majors.map(major => (
              <option key={major.major_id}  value={major.major_desc}>{major.major_desc}</option>
            ))
          }
        </select>
      </div>






      <Select 
        label="Select an item" 
        className="max-w-xs" 
        onChange={handleTry}
        
      >
        {colleges.map((item) => (
          <SelectItem key={item.college_id} value={item.college_id}>
            {item.college_desc}
          </SelectItem>
        ))}
      </Select>


      <div>
        <small className='mb-3'>Selected</small>
        <h1>{selecteTry}</h1>
        <h1>College : {selectedCollege && colleges.find(item => item.college_id === parseInt(selectedCollege)).college_desc}</h1>
        <h1>Program : {selectedProgram && colleges.find(item => item.college_id === parseInt(selectedCollege)).programs.find(program => program.prog_id === parseInt(selectedProgram)).prog_desc}</h1>
        <h1>Major : {selectedMajor}</h1>
      </div>
    </div>
  )
}

export default Test
