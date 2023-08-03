import React from "react";
import {LocationIcon, EmailIcons, NumberIcons, GenderIcons, IDIcons, DepartmentIcons, PhoneIcons } from "../../React-Icons";

const StudentIfo = () => {
  const InfoList = {
    Personal_info: [
      { label: "Student #", data: "SUM2020-02837", icon: IDIcons, FirstColumn: true, },
      { label: "Email", data: "Reynaldobocaling@gmail.com", icon: EmailIcons, FirstColumn: true, },
      { label: "Address", data: "Tabuating San Leonardo Nueva Ecija", icon: LocationIcon, FirstColumn: true },
      { label: "Age", data: 21, icon: NumberIcons, FirstColumn: true },
      { label: "Gender", data: "Male", icon: GenderIcons, SecondColumn: true },
      { label: "Phone #", data: "63+9732823723", icon: PhoneIcons, SecondColumn: true },
      { label: "Department", data: "WST Office", icon: DepartmentIcons, SecondColumn: true },
    ],
    Education: [
      { label: "Elementary", data: "Tabuating San Leonardo Nueva Ecija" },
      { label: "High School", data: "Tabuating San Leonardo Nueva Ecija" },
      { label: "Senior High", data: "Tabuating San Leonardo Nueva Ecija" },
    ],
  };

  return (
    <div>
      <div className="flex gap-12 px-5">
        <div className="flex">

          <div className="mt-1 flex flex-col gap-5">
            <small className=" text-gray-400 tracking-wider">Personal</small>
            {InfoList["Personal_info"].map((list, index) => (
              <div key={index} className="flex flex-col gap-1">
                <small className="text-blue-500 font-semibold tracking-wider flex items-center gap-1">
                  <list.icon />
                  {list.label}
                </small>
                <span className="text-[0.9rem] text-gray-700 tracking-wider">
                  {list.data}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-1  flex flex-col gap-5">
          <small className=" text-gray-400 tracking-wider">Education</small>
          {InfoList["Education"].map((list, index) => (
            <div key={index} className="flex flex-col gap-1">
              <small className="text-blue-500 font-semibold tracking-wider">
                {list.label}
              </small>
              <span className="text-gray-500 tracking-wide">{list.data}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default StudentIfo;
