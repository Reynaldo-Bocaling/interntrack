import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Empty from "../../assets/images/emptyProfile.png";
import { getStudentInfo, attendanceRequest } from "../../api/Api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PulseLloader from "react-spinners/PulseLoader";
import { format } from "date-fns";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import Swal from "sweetalert2";


const ViewAttendanceRequest = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [timesheetDate, setTimesheetDate] = useState(null)
  const queryClient = useQueryClient();

  const currentDate = new Date();

  const { id } = useParams();

  const { data: StudentItem, isLoading } = useQuery({
    queryKey: ["attendanceTimesheet"],
    queryFn: () => getStudentInfo(id),
  });

  // attendance mutation
  const { mutate } = useMutation({
    mutationFn: attendanceRequest,
    onSuccess: () => {
      Swal.fire(
        "Success",
        "Attendance successful accepted for the students",
        "success"
      );
      queryClient.invalidateQueries({ queryKey: ["attendanceTimesheet"] });
    },
    onError: () => {
      Swal.fire("Opps!", "Attendance request failed", "error");
    },
  });

  const timesheet = StudentItem?.timesheet;
  const task = StudentItem?.task;


  const timsheetInfo = timesheet
    ? timesheet.filter(
        (item) =>
          new Date(item.date) <= currentDate &&
          item.totalHours > 0 &&
          item.logStatus === 0
      )
    : [];

  const taskInfo = task
    ? task.find((item) => item.date === timesheetDate)
    : [];

  const handleAttendanceRequest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to accept the attendance request",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id);
      }
    });
  };

  //handle modal
  const openModal = (item) => {
    setTimesheetDate(item);
    onOpen();
  };


  console.log();

  return (
    <div>
      {isLoading ? (
        <h1 className="text-center my-14 py-5 border rounded-lg">
          <PulseLloader
            color="#1892fc"
            margin={5}
            size={13}
            speedMultiplier={1}
            className="mx-auto"
          />
        </h1>
      ) : (
        <>
          <div className="container flex flex-col gap-5  bg-white shadow-lg shadow-slate-200 border border-slate-100 p-5 rounded-lg">
            <span className="text-lg font-medium tracking-wide">
              View Attendance Request
            </span>
            <Link
              to="/Attendance-request"
              className="flex items-center justify-center gap-1 w-20 h-8 rounded-lg"
            >
              <MdOutlineArrowBackIosNew size={20} className="text-blue-500" />
              <p className="text-blue-500 text-base font-semibold tracking-wider">
                Back
              </p>
            </Link>

            <div className="profile flex items-center gap-3">
              <Avatar
                src={StudentItem.profile_url ? StudentItem.profile_url : Empty}
                className="text-large"
              />
              <div className="mt-2 text-lg font-semibold flex items-center gap-3">
                <span className="capitalize">
                  {StudentItem ? StudentItem.firstname : ""}
                </span>
                <span className="capitalize">
                  {StudentItem ? StudentItem.lastname : ""}
                </span>
              </div>
            </div>

            <div className="mt-2 border p-3 rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="h-12 border-b">
                    <th className="text-sm tracking-wide text-left pl-2">
                      Date
                    </th>
                    <th className="text-sm tracking-wide text-left pl-2">
                      Time in
                    </th>
                    <th className="text-sm tracking-wide text-left pl-2">
                      Time out
                    </th>
                    <th className="text-sm text-center tracking-wide">
                      Total hours
                    </th>
                    <th className="text-sm tracking-wide text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timsheetInfo.map((item) => (
                    <tr key={item.id} className="h-14">
                      <td className="text-sm tracking-wide pl-2">
                        {format(new Date(item.date), "MMMM dd")}
                      </td>
                      <td className="text-sm tracking-wide pl-2">
                      {item.timeIn != '0:00' ? format(new Date(item.timeIn), "h:mm a") : '0'}
                      </td>
                      <td className="text-sm tracking-wide pl-2">
                      {item.timeOut != '0:00' ? format(new Date(item.timeOut), "h:mm a") : '0'}
                      </td>
                      <td className="text-sm text-center tracking-wide">
                        {item.totalHours} Hours
                      </td>
                      <td className="text-sm tracking-wide pl-2 w-1/6">
                        <div className="flex item-center gap-2">
                          <button
                            className="text-white text-sm font-medium tracking-wider bg-blue-500 py-[7px] w-24 rounded-full"
                            onClick={() => handleAttendanceRequest(item.id)}
                          >
                            Confirm
                          </button>
                          <button
                            className="text-blue-500 text-sm font-medium tracking-wider bg-white border border-blue-500 py-[7px] w-20 rounded-full"
                            onClick={() => openModal(item.date)}
                          >
                            Task
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* MODAL */}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 font-medium text-sm">
                    {taskInfo?.date && format(new Date(taskInfo?.date), 'MMMM dd, yyyy')}
                   </ModalHeader>
                  <ModalBody>
                  <div className="h-[290px]">
                  {
                    taskInfo?.tasImageUrl? 
                     <img src={ taskInfo?.tasImageUrl} alt="" className="h-[230px] w-full rounded-lg" />
                     :
                     <div className="h-[230px] bg-gray-100 text-xl flex items-center justify-center capitalize rounded-lg">no task</div>
                  }

                  <div className="capitalize text-lg py-5 font-semibold">{taskInfo?.description}</div>
                  </div>
                  </ModalBody>
                  
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
}

export default ViewAttendanceRequest;
