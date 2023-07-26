import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import profile from "../../assets/images/dp.png";
import {BsDot} from 'react-icons/bs'

function ViewAttendanceRequest() {
  return (
    <div>
       <div className="flex items-center justify-between px-2">
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
            Daily Logs
        </h1>
        <select className="h-10 w-52 px-2 shadow-md shadow-slate-200 rounded-lg border border-slate-200 cursor-pointer">
          <option value="">January 02</option>
          <option value="">January 03</option>
          <option value="">January 04</option>
          <option value="">January 05</option>
          <option value="">January 06</option>
        </select>
       </div>
      <div className="container flex flex-col gap-5 mt-5 bg-white shadow-lg shadow-slate-200 border border-slate-100 rounded-lg">

        <div className=" border p-3 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="h-12 border-b">
                <th className="text-sm tracking-wide text-left pl-2">ID</th>
                <th className="text-sm tracking-wide text-left pl-2">Name</th>
                <th className="text-sm tracking-wide text-left pl-2">
                  Time in
                </th>
                <th className="text-sm tracking-wide text-left pl-2">
                  Time out
                </th>
                <th className="text-sm tracking-wide">Total hours</th>
                <th className="text-sm tracking-wide text-left pl-2">Date</th>
                <th className="text-sm tracking-wide text-left pl-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-14">
                <td className="text-sm tracking-wide pl-2">1234</td>
                <td className="text-sm tracking-wide pl-2">
                  <div className="profile flex items-center gap-3">
                    <div className=" mt-3 rounded-full w-10 flex items-center justify-center bg-white border shadow-lg shadow-slate-200">
                      <img
                        src={profile}
                        alt=""
                        width={30}
                        className="rounded-full mx-[0.35rem]"
                      />
                    </div>
                    <span className="mt-2 text-sm font-semibold">
                      Reynaldo Bocaling
                    </span>
                  </div>
                </td>
                <td className="text-sm tracking-wide pl-2">8:00</td>
                <td className="text-sm tracking-wide pl-2">4:00 out</td>
                <td className="text-sm tracking-wide pl-10">8 hrs</td>
                <td className="text-sm tracking-wide pl-2">January 02</td>
                <td className="text-sm tracking-wide pl-2">
                 <div className=" flex items-center">
                 <span>Online</span>
                  <BsDot size={30} className="text-green-500"/>
                 </div>
                </td>
              </tr>
              <tr className="h-14">
                <td className="text-sm tracking-wide pl-2">1234</td>
                <td className="text-sm tracking-wide pl-2">
                  <div className="profile flex items-center gap-3">
                    <div className=" mt-3 rounded-full w-10 flex items-center justify-center bg-white border shadow-lg shadow-slate-200">
                      <img
                        src={profile}
                        alt=""
                        width={30}
                        className="rounded-full mx-[0.35rem]"
                      />
                    </div>
                    <span className="mt-2 text-sm font-semibold">
                      Reynaldo Bocaling
                    </span>
                  </div>
                </td>
                <td className="text-sm tracking-wide pl-2">8:00</td>
                <td className="text-sm tracking-wide pl-2">4:00 out</td>
                <td className="text-sm tracking-wide pl-10">8 hrs</td>
                <td className="text-sm tracking-wide pl-2">January 02</td>
                <td className="text-sm tracking-wide pl-2">
                 <div className=" flex items-center">
                 <span>Online</span>
                  <BsDot size={30} className="text-green-500"/>
                 </div>
                </td>
              </tr>
              <tr className="h-14">
                <td className="text-sm tracking-wide pl-2">1234</td>
                <td className="text-sm tracking-wide pl-2">
                  <div className="profile flex items-center gap-3">
                    <div className=" mt-3 rounded-full w-10 flex items-center justify-center bg-white border shadow-lg shadow-slate-200">
                      <img
                        src={profile}
                        alt=""
                        width={30}
                        className="rounded-full mx-[0.35rem]"
                      />
                    </div>
                    <span className="mt-2 text-sm font-semibold">
                      Reynaldo Bocaling
                    </span>
                  </div>
                </td>
                <td className="text-sm tracking-wide pl-2">8:00</td>
                <td className="text-sm tracking-wide pl-2">4:00 out</td>
                <td className="text-sm tracking-wide pl-10">8 hrs</td>
                <td className="text-sm tracking-wide pl-2">January 02</td>
                <td className="text-sm tracking-wide pl-2">
                 <div className=" flex items-center">
                 <span>Online</span>
                  <BsDot size={30} className="text-green-500"/>
                 </div>
                </td>
              </tr>
              <tr className="h-14">
                <td className="text-sm tracking-wide pl-2">1234</td>
                <td className="text-sm tracking-wide pl-2">
                  <div className="profile flex items-center gap-3">
                    <div className=" mt-3 rounded-full w-10 flex items-center justify-center bg-white border shadow-lg shadow-slate-200">
                      <img
                        src={profile}
                        alt=""
                        width={30}
                        className="rounded-full mx-[0.35rem]"
                      />
                    </div>
                    <span className="mt-2 text-sm font-semibold">
                      Reynaldo Bocaling
                    </span>
                  </div>
                </td>
                <td className="text-sm tracking-wide pl-2">8:00</td>
                <td className="text-sm tracking-wide pl-2">4:00 out</td>
                <td className="text-sm tracking-wide pl-10">8 hrs</td>
                <td className="text-sm tracking-wide pl-2">January 02</td>
                <td className="text-sm tracking-wide pl-2">
                 <div className=" flex items-center">
                 <span>Online</span>
                  <BsDot size={30} className="text-green-500"/>
                 </div>
                </td>
              </tr>
              <tr className="h-14">
                <td className="text-sm tracking-wide pl-2">1234</td>
                <td className="text-sm tracking-wide pl-2">
                  <div className="profile flex items-center gap-3">
                    <div className=" mt-3 rounded-full w-10 flex items-center justify-center bg-white border shadow-lg shadow-slate-200">
                      <img
                        src={profile}
                        alt=""
                        width={30}
                        className="rounded-full mx-[0.35rem]"
                      />
                    </div>
                    <span className="mt-2 text-sm font-semibold">
                      Reynaldo Bocaling
                    </span>
                  </div>
                </td>
                <td className="text-sm tracking-wide pl-2">8:00</td>
                <td className="text-sm tracking-wide pl-2">4:00 out</td>
                <td className="text-sm tracking-wide pl-10">8 hrs</td>
                <td className="text-sm tracking-wide pl-2">January 02</td>
                <td className="text-sm tracking-wide pl-2">
                 <div className=" flex items-center">
                 <span>Online</span>
                  <BsDot size={30} className="text-green-500"/>
                 </div>
                </td>
              </tr>
              <tr className="h-14">
                <td className="text-sm tracking-wide pl-2">1234</td>
                <td className="text-sm tracking-wide pl-2">
                  <div className="profile flex items-center gap-3">
                    <div className=" mt-3 rounded-full w-10 flex items-center justify-center bg-white border shadow-lg shadow-slate-200">
                      <img
                        src={profile}
                        alt=""
                        width={30}
                        className="rounded-full mx-[0.35rem]"
                      />
                    </div>
                    <span className="mt-2 text-sm font-semibold">
                      Reynaldo Bocaling
                    </span>
                  </div>
                </td>
                <td className="text-sm tracking-wide pl-2">8:00</td>
                <td className="text-sm tracking-wide pl-2">4:00 out</td>
                <td className="text-sm tracking-wide pl-10">8 hrs</td>
                <td className="text-sm tracking-wide pl-2">January 02</td>
                <td className="text-sm tracking-wide pl-2">
                 <div className=" flex items-center">
                 <span>Online</span>
                  <BsDot size={30} className="text-green-500"/>
                 </div>
                </td>
              </tr>
              <tr className="h-14">
                <td className="text-sm tracking-wide pl-2">1234</td>
                <td className="text-sm tracking-wide pl-2">
                  <div className="profile flex items-center gap-3">
                    <div className=" mt-3 rounded-full w-10 flex items-center justify-center bg-white border shadow-lg shadow-slate-200">
                      <img
                        src={profile}
                        alt=""
                        width={30}
                        className="rounded-full mx-[0.35rem]"
                      />
                    </div>
                    <span className="mt-2 text-sm font-semibold">
                      Reynaldo Bocaling
                    </span>
                  </div>
                </td>
                <td className="text-sm tracking-wide pl-2">8:00</td>
                <td className="text-sm tracking-wide pl-2">4:00 out</td>
                <td className="text-sm tracking-wide pl-10">8 hrs</td>
                <td className="text-sm tracking-wide pl-2">January 02</td>
                <td className="text-sm tracking-wide pl-2">
                 <div className=" flex items-center">
                 <span>Online</span>
                  <BsDot size={30} className="text-green-500"/>
                 </div>
                </td>
              </tr>
              <tr className="h-14">
                <td className="text-sm tracking-wide pl-2">1234</td>
                <td className="text-sm tracking-wide pl-2">
                  <div className="profile flex items-center gap-3">
                    <div className=" mt-3 rounded-full w-10 flex items-center justify-center bg-white border shadow-lg shadow-slate-200">
                      <img
                        src={profile}
                        alt=""
                        width={30}
                        className="rounded-full mx-[0.35rem]"
                      />
                    </div>
                    <span className="mt-2 text-sm font-semibold">
                      Reynaldo Bocaling
                    </span>
                  </div>
                </td>
                <td className="text-sm tracking-wide pl-2">8:00</td>
                <td className="text-sm tracking-wide pl-2">4:00 out</td>
                <td className="text-sm tracking-wide pl-10">8 hrs</td>
                <td className="text-sm tracking-wide pl-2">January 02</td>
                <td className="text-sm tracking-wide pl-2">
                 <div className=" flex items-center">
                 <span>Online</span>
                  <BsDot size={30} className="text-green-500"/>
                 </div>
                </td>
              </tr>
             
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewAttendanceRequest;
