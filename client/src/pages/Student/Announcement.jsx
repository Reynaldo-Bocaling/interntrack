import { format } from "date-fns";
import React from "react";
import { TfiAnnouncement } from "react-icons/tfi";
import {  getStudent } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import { DotLoading } from "../../components/spinners-loading/Spinner";

const Announcement = () => {
  const { data: getStudentInfo, isLoading: studentInfoLoading } =  useQuery({queryKey: ["getStudent22"],queryFn: getStudent, });

    const studentInfo = getStudentInfo ?? [];
    

  const otherPost = studentInfo?.announcement;


  if (studentInfoLoading) return <DotLoading />;

  return (
    <div className="bg-white rounded-lg p-5 w-full">
      <h1 className="text-xl font-semibold tracking-wide text-gray-700">
        Announcement
      </h1>

      <div className="flex flex-col gap-1 w-full mt-2">
        {otherPost.length > 0 ? (
          otherPost.map((item, index) => (
            <div key={index} className="py-7 px-1 flex gap-4 border-b ">
              <TfiAnnouncement size={25} className="text-gray-400" />{" "}
              {index + 1}
              <div className="w-full">
                <div className="flex items-center justify-between gap-2 mb-5 w-full">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold">{item.title}</span>
                    <small className="text-[0.7rem] h-8 px-5 flex items-center justify-center rounded-full bg-[#f28837] text-white">
                      {format(new Date(), "MMMM dd, yyyy")}
                    </small>
                  </div>
                </div>
                <p className="text-sm text-[#828383] text-justify">
                  {item.description}
                </p>

                <div className="mt-7 flex items-center justify-between">
                  <button className="text-sm text-blue-500 font-medium tracking-wide">
                    View
                  </button>

                  <small className="flex items-center gap-3 text-[#828383]">
                    <div className="text-sm text-[#828383] flex flex-col items-end">
                      <div className=" flex items-center gap-2">
                        <small>Posted by</small>
                      </div>
                      <small className="text-blue-500 font-medium pr-4">
                        {item.postedBy}
                      </small>
                    </div>
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <center>No Announcemnet</center>
        )}
      </div>
    </div>
  );
};

export default Announcement;
