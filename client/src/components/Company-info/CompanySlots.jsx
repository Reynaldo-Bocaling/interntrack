import React, { useState, useRef, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { MdAdd, MdCheck } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import { FiEdit2 } from "react-icons/fi";
import { Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSlot } from "../../api/Api";
import Swal from "sweetalert2";

const CompanySlots = ({ data }) => {
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const slots = data ? data : [];
  const inputRef = useRef(null);
  const [isEditSlot, setIsEditSlot] = useState(false);
  const [slotValue, setSlotValue] = useState("");

  const totalSlots = slots.reduce((total, item) => total + item.slot, 0);
  const studentFilter = slots?.map(
    ({ id, areaName, slot, company_id, trainer, student }) => ({
      id,
      areaName,
      slot,
      company_id,
      totalStudent: student?.filter((item) => item.deletedStatus === 0).length,
    })
  );

  const totalStudent = studentFilter?.reduce(
    (total, item) => total + item.totalStudent,
    0
  );

  const percentage = totalSlots === 0 ? 0 : (totalStudent / totalSlots) * 100;

  const focusInput = () => {
    inputRef.current.focus();
  };

  const handleEditSlotToggle = () => {
    setIsEditSlot(!isEditSlot);
    setSlotValue(""); // Reset the slotValue when toggling edit mode.
  };

  useEffect(() => {
    if (isEditSlot) {
      focusInput();
    }
  }, [isEditSlot]);

  const { mutate } = useMutation(updateSlot, {
    onSuccess: () => {
      Swal.fire("Success", "Area slot has been successfully updated.", "success");
      queryClient.invalidateQueries("companyInfo");
      setIsEditSlot(false);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update area slot.", "error");
    },
  });

  const handleUpdateSlot = (id, item) => {
    if (!slotValue || Number(slotValue) < 0 || Number(slotValue) < item.totalStudent) {
      Swal.fire("Error", "Invalid slot value.", "error");
      return;
    }

    const updateDataValue = {
      id,
      slot: Number(slotValue),
    };

    mutate(updateDataValue);
  };

  const handleInputChange = (event, item) => {
    const inputValue = event.target.value;
    // Check if inputValue is null or less than 0 or less than totalStudent.
    if (!inputValue || Number(inputValue) < 0 || Number(inputValue) < item.totalStudent) {
      Swal.fire("Error", "Invalid slot value.", "error");
      return;
    }
    setSlotValue(inputValue);
  };

  return (
    <div className="py-2 px-5">
      <header className="flex items-center justify-between mb-5 px-2">
        <span className="text-xl text-gray-700 font-semibold tracking-wide">
          Students
        </span>

        <div className="bg-white p-1 px-3 py-1 flex items-center gap-2 rounded-full shadow-md shadow-slate-200 border border-gray-100">
          <input type="text" placeholder="Search" />
        </div>
      </header>

      <div className="flex gap-5">
        <div className="w-[60%]">
          <div className="w-full flex justify-end">
            <button
              onClick={onOpen}
              className="pl-5 text-blue-500 ml-auto flex items-center font-medium tracking-wide"
            >
              <MdAdd size={18} />
              Add area
            </button>
          </div>

          <div className="mt-2 border p-3 rounded-lg  h-auto bg-white">
            <table className="w-full">
              <thead>
                <tr className="h-12 border-b">
                  <th className="text-sm tracking-wide text-center w-[15%] border-r">
                    No.
                  </th>
                  <th className="text-sm tracking-wide text-left pl-5  w-[45%] border-r">
                    Area of Assigned
                  </th>
                  <th className="text-sm tracking-wide text-center  w-[16%] border-r">
                    Deploy
                  </th>
                  <th className="text-sm tracking-wide text-center  w-[24%]">
                    Available Slots
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentFilter.map((item, index) => (
                  <tr className="h-14" key={item.id}>
                    <td className="text-sm tracking-wide text-center border-r">
                      {index + 1}
                    </td>
                    <td className="text-sm tracking-wide pl-5 border-r">
                      {item.areaName}
                    </td>
                    <td className="text-sm text-center font-semibold tracking-wider border-r">
                      {item.totalStudent}
                    </td>
                    <td className="text-sm text-center font-semibold tracking-wider">
                      <div className="flex items-center justify-center ml-3">
                        <p className="pr-2">{item.slot - item.totalStudent}</p>
                        {"  / "}
                        <input
                          type="text"
                          onChange={(e) => handleInputChange(e, item)}
                          value={isEditSlot ? slotValue : item.slot || ""}
                          className={`${
                            isEditSlot
                              ? "border-[2px] border-blue-500 outline-[1px] outline-blue-500 text-[0.7rem] w-10"
                              : "w-5"
                          }  text-center text-gray-400 ml-1 rounded-md`}
                          disabled={!isEditSlot}
                          ref={inputRef}
                        />
                        {isEditSlot ? (
                          <div className="flex items-center gap-2 pl-3">
                            <Tooltip
                              content="Click to update total slot"
                              placement="bottom"
                              closeDelay={0}
                              delay={800}
                            >
                              <button>
                                <MdCheck
                                  onClick={() => handleUpdateSlot(item.id, item)}
                                  size={20}
                                  className="text-green-500 cursor-pointer"
                                />
                              </button>
                            </Tooltip>

                            <Tooltip
                              content="cancel"
                              placement="bottom"
                              closeDelay={0}
                              delay={800}
                            >
                              <button>
                                <LiaTimesSolid
                                  onClick={() => setIsEditSlot(false)}
                                  size={18}
                                  className="text-red-500 cursor-pointer"
                                />
                              </button>
                            </Tooltip>
                          </div>
                        ) : (
                          <Tooltip
                            content="Click to edit slot"
                            placement="bottom"
                            closeDelay={0}
                            delay={800}
                          >
                            <button>
                              <FiEdit2
                                onClick={handleEditSlotToggle}
                                size={17}
                                className="text-green-500 ml-3 cursor-pointer"
                              />
                            </button>
                          </Tooltip>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-[40%] bg-green-50 p-5 flex items-center flex-col justify-center gap-5">
          <p className="mt-4 text-center text-2xl font-semibold tracking-wide">
            Available Slots
          </p>
          <div className="w-48">
            <CircularProgressbar
              value={percentage}
              text={`${totalStudent} / ${totalSlots}`}
              styles={{
                path: { stroke: `#20D117` },
                text: { fill: `#333`, fontSize: `0.8rem`, fontWeight: 600 },
              }}
            />
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Area</ModalHeader>
              <ModalBody>
                <button>f</button>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CompanySlots;
