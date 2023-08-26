import React from "react";
import {LocationIcon, EmailIcons, NumberIcons, GenderIcons, IDIcons, DepartmentIcons, PhoneIcons } from "../../components/ReactIcon/React-Icons";
import InputText from "../forms/InputText/InputDisable";

const StudentIfo = () => {

  return (
    <div>
      <div className="flex px-5 bg-slate-50 w-full">
        <div className="flex items-start gap-7 w-full">
          <div className="mt-1 flex flex-col gap-5 max-w-full w-[55%] border-r pr-7">
            <small className=" text-gray-400 tracking-wider">Personal Information</small>
            <div className="flex flex-wrap justify-between  gap-y-4">
              <div>
                <InputText
                  label="Student no."
                  value="SUM2020-02837"
                  type="text"
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <InputText 
                label="Firstname" 
                value="Reynaldo" 
                type="text"
                />
                <InputText 
                label="Middle" 
                value="Flores" 
                type="text" 
                />
                <InputText 
                label="Lastname" 
                value="Bocaling" 
                type="text" />
              </div>

              <div className="w-full">
                <InputText
                  label="Email"
                  value="ReynaldoBocaling@gmail.com"
                  type="text"
                />
              </div>
              
              
              <div className="w-full">
                <InputText
                  label="Address"
                  value="San Leonardo, Nueva Ecija"
                  type="text"
                />
              </div>

              <div className="flex justify-center gap-3 w-full">
                <InputText
                  label="Gender"
                  value="Male"
                  type="text"
                />

                <InputText
                  label="Birthday"
                  value="December 31, 2000"
                  type="text"
                />
              </div>

             

              <div className="w-full">
                <InputText
                  label="Contact no."
                  value="09489974746"
                  type="number"
                />
              </div>
              <div className="w-full">
                <InputText
                  label="Department"
                  value="CICT Office"
                  type="text"
                />
              </div>
            </div>
          </div>


          <div className="mt-1  flex flex-col gap-5 w-[45%]">
            <small className=" text-gray-400 tracking-wider">Education</small>

            <div className="flex flex-wrap justify-between  gap-y-4">

            </div>
              <div className="w-full">
                <InputText
                  label="Elementary"
                  value="Tampo North Elementary School"
                  type="text"
                />
              </div>
              <div className="w-full">
                <InputText
                  label="High School"
                  value="Juan R. Liwag Memorial High School"
                  type="text"
                />
              </div>
              <div className="w-full">
                <InputText
                  label="Senior High"
                  value="Juan R. Liwag Memorial High School"
                  type="text"
                />
              </div>
              <div className="w-full">
                <InputText
                  label="College"
                  value="Nueva Ecija University Science and Technology"
                  type="text"
                />
              </div>
          </div>
        </div>
        
        

      </div>
    </div>
  );
};

export default StudentIfo;
