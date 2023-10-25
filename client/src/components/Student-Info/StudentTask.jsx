import React, { useState } from "react";
import { TimeIcon } from "../../components/ReactIcon/React-Icons";
import { NavLink } from "react-router-dom";

import pic from "../../assets/images/task1.jpg";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
const StudentTask = ({ data }) => {
  const [taskData, setTaskData] = useState({});

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const test = (tastDt) => {
    setTaskData(tastDt);
    onOpen();
  };

  
  return (
    <div>
      {data.length  >0 ?(
        <>
          <div className="container py-2 px-5">
            <header className="flex items-center justify-between mb-5">
              <span className="text-xl text-gray-700 font-semibold tracking-wide">
                Task
              </span>

              <div className="bg-white p-1 px-3 py-2 flex items-center gap-2 rounded-full shadow-md shadow-slate-200 border border-gray-100">
                <select className="w-[220px] outline-none">
                  <option value="">Select Date</option>
                  <option value="">January 1</option>
                  <option value="">January 2</option>
                  <option value="">January 3</option>
                  <option value="">January 4</option>
                  <option value="">January 5</option>
                </select>
              </div>
            </header>
            <section className={`flex flex-wrap justify-between gap-5`}>
              {data.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md shadow-slate-200 border border-slate-100 rounded-lg p-3 flex flex-col justify-end w-[230px]"
                >
                  <img
                    className="w-full h-40 object-cover object-center mb-2 rounded-lg"
                    src={item?.tasImageUrl}
                    alt={"ds"}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex justify-center w-full pb-1 mb-2 border-b">
                        <h2 className="text-base text-gray-800 font-semibold tracking-wide">
                          {item.description}
                        </h2>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="">
                          <p className="text-xs text-gray-600">{item.date}</p>
                        </div>

                        <button
                          onClick={() => test(item)}
                          className="text-base font-semibold text-blue-500 py-2 px-2"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* modal */}
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="max-w-[650px] w-full"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    View Task
                  </ModalHeader>
                  <ModalBody>
                    {taskData && (
                      <div className="grid gap-5 p-5">
                        <div>
                          <img
                            src={taskData?.tasImageUrl}
                            alt=""
                            className="w-full max-h-[370px] rounded-lg"
                          />
                        </div>
                        <div className="w-full flex items-center justify-between">
                          <h1 className="w-1/2">{taskData?.description}</h1>
                          <span>{taskData?.date}</span>
                        </div>
                      </div>
                    )}
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      ) : (
        <center className="text-xl my-5">No Task</center>
      )}
    </div>
  );
};

export default StudentTask;
