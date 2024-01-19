import React from "react";
function WhatWeDo() {
  return (
    <div
      className="max-w-[1000px] mx-auto my-20 flex flex-col md:flex-row items-end justify-between px-7"
    >
      <div>
        <small
          className="font-medium text-blue-500"
        >
          WHAT WE DO
        </small>
        
        <h1
          
          className="text-2xl leading-10 font-bold mt-2"
        >
          InternTrack: Elevate Your Internship Management Experience
        </h1>
      </div>
      <p
        className="max-w-[400px] w-full text-justify tracking-wider mt-5 md:mt-0"
      >
        Transforming internships with InternTrack—simplify, monitor, and elevate
        OJT experiences through innovative management solutions
      </p>
    </div>
  );
}

export default WhatWeDo;
