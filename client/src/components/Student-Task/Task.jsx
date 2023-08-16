import { NavLink } from "react-router-dom";
import {
  MaximizeIcons,
  MinimizeIcons,
  ExitIcons,
} from "../ReactIcon/React-Icons";

const Task = ({ taskRecords, Fullscreen, close, isFullScreen }) => {
  return (
    <div>
      {taskRecords.map((item, index) => (
        <section
          key={index}
          className="relative transition-all w-full mt-5 "
        >
          <div className="absolute left-0 w-full px-3 bg-white">
            <div className=" h-12 flex items-center justify-between">
              <div className={`${isFullScreen ? "w-[230px]" : ""} `}>
                <div className="profile flex items-center gap-3">
                  <div className=" mt-3 rounded-full w-10 h-10 flex items-center justify-center bg-white border shadow-lg shadow-slate-200">
                    <img
                      src={item.image}
                      alt=""
                      width={30}
                      className="rounded-full mx-[0.35rem]"
                    />
                  </div>
                 <div>
                 <div className={` ${isFullScreen? 'text-[1rem]':'text-[1.2rem]'} mt-3  font-semibold`}>
                    {item.name}
                  </div>
                  <span className="text-sm text-blue-500 font-medium tracking-wide">Trainee</span>
                 </div>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="text-blue-600"
                  onClick={() => Fullscreen(!Fullscreen)}
                >
                  {isFullScreen ? <MaximizeIcons /> : <MinimizeIcons />}
                </button>
                <button className="text-red-500" onClick={close}>
                  <ExitIcons />
                </button>
              </div>
            </div>

            <h1 className="text-xl font-semibold tracking-wider py-4 px-2 mt-3">
              Task
            </h1>
          </div>

          {/* all task */}
          <div
            className={`flex flex-wrap 
        ${
          isFullScreen ? "justify-center" : "justify-between"
        } gap-4  pt-32 bg-white h-screen overflow-y-auto p-2 
        `}
          >
            {item.Task.map((task) => (
              <div
                key={task.id}
                className={`${
                  isFullScreen ? "max-w-[270px] " : "max-w-[230px] h-[270px] "
                }   bg-white shadow-md shadow-slate-200 border border-slate-100 rounded-lg p-4 flex flex-col justify-end`}
              >
                <img
                  className="w-full h-40 object-cover object-center mb-2 rounded-lg"
                  src={task.image}
                  alt={"ds"}
                />

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-center w-full pb-1 mb-2 border-b">
                      <h2 className="text-base text-gray-800 font-semibold tracking-wide">
                        {task.taskName}
                      </h2>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="">
                        <p className="text-xs text-gray-600">August 3, 2023</p>
                      </div>

                      <NavLink
                        to="/ViewedStudentTask"
                        className="text-base font-semibold text-blue-500 py-2 px-2"
                      >
                        View
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Task;
