import React from "react";
import brgyCert from "../../assets/images/barangay-logo.png";
import nso from "../../assets/images/nso.jpg";
import cv from "../../assets/images/cv.jpg";
import philhealth from "../../assets/images/phil.jpg";

import { CheckIcons } from "../../components/ReactIcon/React-Icons";

const StudentRequirements = ({ data }) => {
  const Requiremens_list = [
    { label: "CV Resume", image: cv },
    { label: "Brgy Certificate", image: brgyCert },
    { label: "NSO", image: nso },
    { label: "Philhealth", image: philhealth },
  ];

  return (
    <div>
      {data.length  >0 ? (
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
                        className="object-cover"
                      />
                    </div>
                    <span className="absolute bottom-12 text-lg uppercase font-semibold">
                      {list.type}
                    </span>
                    <div className="absolute bottom-0 m-3 h-8 w-8 text-white bg-blue-500 rounded-full flex items-center justify-center z-10">
                      <div>
                        <CheckIcons />
                      </div>
                    </div>
                  </div>
                ))}

              {/* underline */}
              <div className="w-full h-1 absolute bottom-7 left-0 bg-blue-500 z-0 rounded-full"></div>
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
