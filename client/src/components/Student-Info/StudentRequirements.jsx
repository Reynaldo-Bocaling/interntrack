import React from "react";
import { CheckIcons } from "../../components/ReactIcon/React-Icons";

const StudentRequirements = ({ data }) => {
  return (
    <div>
      {data.length > 0 ? (
        <div className="container flex items-center justify-center flex-col">
          <h1 className="text-2xl font-semibold my-3">Student Requirements</h1>

          <div className="mt-7  w-[70%]  relative ">
            <div className="flex justify-between ">
              {data &&
                data.map((list, index) => (
                  <div
                    key={index}
                    className="relative cols  flex flex-col items-center gap-5 pb-28"
                  >
                    <div className=" w-40">
                      <img
                        src={list.imageUrl}
                        alt=""
                        className="object-cover h-[250px] w-[200px] border  rounded-lg "
                      />
                    </div>
                    <a  href={list.imageUrl} className="absolute bottom-12 text-lg uppercase font-semibold hover:underline">
                      {list.type}
                    </a>
                  
                  </div>
                ))}

              
            </div>
          </div>
        </div>
      ) : (
        <center className="text-xl my-5">No Requirement</center>
      )}
    </div>
  );
};

export default StudentRequirements;
