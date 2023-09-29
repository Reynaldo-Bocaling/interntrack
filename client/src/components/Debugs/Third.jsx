import React, { useState } from 'react';

const collegesData = [
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

function App() {
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);

  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
    setSelectedProgram(null);
    setSelectedMajor(null);
  };

  const handleProgramChange = (e) => {
    setSelectedProgram(e.target.value);
    setSelectedMajor(null);
  };

  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
  };

  

  // Extract colleges, programs, and majors from the data
  const colleges = collegesData;
  const programs = selectedCollege
    ? colleges.find(college => college.college_id === parseInt(selectedCollege))
    : [];
  const majors = selectedProgram
    ? programs.programs.find(program => program.prog_id === parseInt(selectedProgram))
    : [];

  return (
    <div>
      <label>Select College: </label>
      <select value={selectedCollege || ''} onChange={handleCollegeChange}>
        <option value="">Select</option>
        {colleges.map(college => (
          <option key={college.college_id} value={college.college_id}>{college.college_desc}</option>
        ))}
      </select>

      {selectedCollege && (
        <div>
          <label>Select Program: </label>
          <select value={selectedProgram || ''} onChange={handleProgramChange}>
            <option value="">Select</option>
            {programs.programs.map(program => (
              <option key={program.prog_id} value={program.prog_id}>{program.prog_desc}</option>
            ))}
          </select>
        </div>
      )}

      {selectedProgram && (
        <div>
          <label>Select Major: </label>
          <select value={selectedMajor || ''} onChange={handleMajorChange}>
            <option value="">Select</option>
            {majors.majors.map(major => (
              <option key={major.major_id} value={major.major_id}>{major.major_desc}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <h3>Selected College: {programs.college_desc}</h3>
        <h3>Selected Program: {majors.prog_desc}</h3>
        <h3>Selected Major: {selectedMajor}</h3>
      </div>
    </div>
  );
}

export default App;
