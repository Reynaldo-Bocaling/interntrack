import { Button } from "@nextui-org/react";
import React from "react";
import { PiWarningBold } from "react-icons/pi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoordinator, resetData } from "../../api/Api";
import Swal from "sweetalert2";

function ResetData() {
  const queryClient = useQueryClient();

  const {
    data: StudentList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getStudentList"],
    queryFn: getCoordinator,
  });
  const students = StudentList
    ? StudentList.teacher.flatMap(({ student }) =>
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

  const handleUpdate = () => {
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
        mutate(students);
      }
    });
  };

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
          onClick={handleUpdate}
          color="danger"
          className="mt-5 font-medium tracking-wide"
        >
          Reset all data
        </Button>
      </div>
    </div>
  );
}

export default ResetData;
