import React from "react";
import logo from "../../assets/images/neust_logo-1.png";
import isologo from "../../assets/images/isoLogo.png";
import { format } from "date-fns";

const List = ({ title, ListTable }) => {
  return (
    <div className="mx-auto">
      <div className=" mt-5 px-4">
        <header className="relative pb-2">
          <div className="mx-20 flex gap-2">
            <img src={logo} alt="" className="w-28 h-28 z-10" />
            <div>
              <p className="text-[11px] font-medium">
                Republic of the Philippines
              </p>
              <p className="text-[17px] font-medium">
                NUEVA ECIJA UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </p>
              <p className="text-[11px] font-medium">
                Cabanatuan City, Nueva Ecija, Philippines
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full z-[0] text-[14px] font-semibold  pl-48 bg-[#fb9f3c] py-1 border-b-[2px] border-[#17274e]">
              College of Information and Communications Technology
            </div>
          </div>
        </header>

        <div className="mt-7 mx-7">
          <center className="text-[17px] font-semibold mb-5">{title}</center>

          <div>
            <span className="w-full flex items-center gap-2 text-[11px]">
              <p>Date: </p>
              <span className="capitalize font-medium ">
                {format(new Date(), "MMMM  dd, yyyy (EEEE)")}
              </span>
            </span>

            <ListTable />

            <footer className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={isologo} alt="" className="h-[0.63in] w-[0.71in]" />
                <p className="text-[11px]">
                  Transforming Communities through Science and Technology
                </p>
              </div>
              <div className="flex flex-col font-semibold text-[10px]">
                <span>Telefax No. (044) 463-0226</span>
                <span>neustmain@yahoo.com</span>
                <span>www.neust.edu.ph</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
