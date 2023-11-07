import React, { useState } from "react";
import { PiWarningBold } from "react-icons/pi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoordinator, resetData } from "../../api/Api";
import Swal from "sweetalert2";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";



function ResetData() {
  const queryClient = useQueryClient();
  const [userPassword, setuserPassword] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    data: StudentList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getStudentList2"],
    queryFn: getCoordinator,
  });
  const students = StudentList
    ? StudentList.teacher?.flatMap(({ student }) =>
        student ? student.map(({ id }) => id) : []
      )
    : [];

  const { mutate } = useMutation(resetData, {
    onSuccess: (id) => {
      Swal.fire(
        "Success",
        "All data has been reset, and student information is now hidden.",
        "success"
      );

      console.log(id);
      queryClient.invalidateQueries("getStudentList");
    },
    onError: () => {
      Swal.fire(
        "Error",
        "There was an issue reset all data. \n Please try again.",
        "error"
      );
    },
  });

 


  const handleSubmit = () => {
    Swal.fire({
      title: "Are you sure you want to reset all data?",
      text: "This action willl reset all data and hide all student information",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#49A6F3",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate({ id: students, password: userPassword });
      }
    });
  };

  if(isLoading) return <center className="my-5 ">Computing...</center>


  return (
    <div>
      <div className="max-w-[550px]">
        <p className="text-lg font-semibold mb-4">Reset all data</p>
        <div className=" grid gap-2 text-sm text-red-500 tracking-wider">
          <span className="flex items-center font-semibold">
            {" "}
            <PiWarningBold size={23} /> Warning:
          </span>{" "}
          Resetting all data will hide all records and student lists for
          coordinators, teachers, and trainers.
        </div>

        <Button
         onClick={onOpen}
          color="danger"
          className="mt-5 font-medium tracking-wide"
        >
          Reset all data
        </Button>
      </div>



      {/* drop modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-base">
                    Drop Student
                  </ModalHeader>
                  <ModalBody>
                    <Input
                    type="password"
                      label="Enter password"
                      onChange={(e) => setuserPassword(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      onClick={handleSubmit}
                      className="font-medium"
                      isDisabled={!userPassword}
                    >
                      Reset
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>



    </div>
  );
}

export default ResetData;
