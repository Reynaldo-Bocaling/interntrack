import React, { useState } from "react";
import profile from "../../assets/images/dp.png";
import pic from "../../assets/images/task1.jpg";
import {
  MaximizeIcons,
  MinimizeIcons,
  DotIcons,
  ExitIcons,
} from "../../React-Icons";
import {NavLink} from 'react-router-dom'

function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const [Fullscreen, setFullscreen] = useState(false);
  const [text, setText] = useState("");

  function handleFunc(index) {
    setIsOpen(true);
    setText(index + 1);
    setFullscreen(false);
  }
  return (
    <div className="relative">
      <div className="flex items-center justify-between px-2">
        <h1 className="text-xl font-bold tracking-wider text-gray-700 z-20">
          Student Task
        </h1>
      </div>
      <div
        className={`${
          isOpen ? "pr-[21rem]" : "pr-0"
        } w-full flex flex-col gap-5 mt-5  shadow-lg bg-white shadow-slate-200 border border-slate-100 rounded-lg duration-300`}
      >
        <div className=" border p-3 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="h-12 border-b">
                <th className="text-sm tracking-wide text-left pl-2">ID</th>
                <th className="text-sm tracking-wide text-left pl-2">Name</th>
                <th className="text-sm tracking-wide text-center pl-2">
                  Total tasks
                </th>
                <th className="text-sm tracking-wide">Last upload</th>
                <th className="text-sm tracking-wide text-left pl-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }, (items, index) => (
                <tr
                  key={index}
                  className={` h-14 hover:bg-gray-50 hover:border-b cursor-pointer`}
                  onClick={() => handleFunc(index)}
                >
                  <td className="text-sm tracking-wide pl-2 ">1234</td>
                  <td className="text-sm tracking-wide pl-2">
                    <div className="profile flex items-center gap-3">
                      <div className=" mt-3 rounded-full w-10 h-10 flex items-center justify-center bg-white border shadow-lg shadow-slate-200">
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
                  <td className="text-sm tracking-wide pl-2 text-center">12</td>
                  <td className="text-sm tracking-wide pl-2">
                    August 03, 20023
                  </td>

                  <td className="text-sm tracking-wide pl-2">
                    <div className=" flex items-center">
                      <span>Online</span>
                      {<DotIcons size={30} className="text-green-500" />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* right sidebar */}
      <div
        className={` ${
          isOpen
            ? Fullscreen
              ? "w-full pl-[17rem]"
              : "w-[21rem]"
            : "w-0 hidden"
        } fixed bg-white h-screen   right-0 top-[60px] shadow-lg z-10 p-2 duration-300 overflow-y-auto`}
      >
       






       <div className={`${Fullscreen && 'w-full pr-[17rem]'} bg-white fixed top-[60px] pt-3`}>
       <div className="flex items-start justify-between gap-8 my-5 border-b pb-3 mt-5">
          <div className={`${Fullscreen && "mt-12"} ml-2`}>
            <div className="profile flex items-center gap-3">
              <div className=" mt-3 rounded-full w-10 h-10 flex items-center justify-center bg-white border shadow-lg shadow-slate-200">
                <img
                  src={profile}
                  alt=""
                  width={30}
                  className="rounded-full mx-[0.35rem]"
                />
              </div>
              <div className="name flex flex-col">
                <span
                  className={`${
                    Fullscreen && "text-xl pb-1"
                  } text-base mt-2  font-semibold`}
                >
                  Reynaldo Bocaling
                </span>
                <small className="text-blue-500 font-medium tracking-wide">
                  Trainee
                </small>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 px-2 text-blue-500 mt-2">
            {!Fullscreen ? (
              <button className="" onClick={() => setFullscreen(!Fullscreen)}>
                <MaximizeIcons />
              </button>
            ) : (
              <button className="" onClick={() => setFullscreen(!Fullscreen)}>
                <MinimizeIcons />
              </button>
            )}
            <button onClick={() => setIsOpen(false)} className="text-red-600">
              <ExitIcons />
            </button>
          </div>
        </div>

        <div className="text-lg font-semibold tracking-wide ml-10 pb-3">
          Tasks
        </div>
       </div>











        <section className={`flex flex-wrap ${Fullscreen? 'justify-between px-10 mt-[210px]': 'justify-center mt-[160px]'}  gap-2  overflow-y-auto `}>
          {Array.from({ length: 9 }, (item, index) => (
            <div
              key={index}
              className="bg-white shadow-md shadow-slate-200 border border-slate-100 rounded-lg p-4 flex flex-col justify-end"
            >
              <img
                className="w-full h-40 object-cover object-center mb-2 rounded-lg"
                src={pic}
                alt={"ds"}
              />

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-center w-full pb-1 mb-2 border-b">
                    <h2 className="text-base text-gray-800 font-semibold tracking-wide">
                      Check Student Code
                    </h2>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="">
                      <p className="text-xs text-gray-600">August 3, 2023</p>
                    </div>

                    <NavLink to='/ViewedStudentTask' className="text-base font-semibold text-blue-500 py-2 px-2">
                      View
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Test;
