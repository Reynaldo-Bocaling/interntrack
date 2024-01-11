import React, { useState } from "react";
import { changeRole, getUser, logout } from "../../api/Api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ChangeRole() {
  const navigate = useNavigate();
  const [roleValue, setRoleVAlue] = useState("");

  const { mutate } = useMutation({
    mutationFn: changeRole,
    onSuccess: () => {
      Swal.fire(
        "Success",
        `Success! You've switched to the ${roleValue} role`,
        "success"
      ).then(() => {
        navigate("/");
        window.location.reload();
      });
    },
    onError: () => {
      Swal.fire(
        "Error",
        "An error occurred while switching roles \nPlease try again",
        "error"
      );
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getRole2"],
    queryFn: getUser,
  });

  const getRole = data ? data : [];

  const userRole = getRole?.role;

  const handleChangeRole = (role) => {
    const id = getRole?.id;
    mutate({ id, role });
    setRoleVAlue(role);
  };

  return (
    <div>
      <p className="text-xl font-semibold mb-5">Change Role</p>

      {isLoading ? (
        <center>Loading..</center>
      ) : (
        <div className="flex flex-col items-start gap-3">
          {getRole?.coordinator.length > 0 && (
            <button
              onClick={() => handleChangeRole("Coordinator")}
              className={`${
                userRole === "Coordinator"
                  ? "text-gray-600 font-medium underline"
                  : "text-blue-500"
              } tracking-wide`}
              disabled={userRole === "Coordinator"}
            >
              {userRole !== "Coordinator" ? (
                "Switch to Coordinator"
              ) : (
                <p>
                  Coordinator (<span className="text-gray-400">used</span>)
                </p>
              )}
            </button>
          )}

          {getRole?.teacher.length > 0 && (
            <button
              onClick={() => handleChangeRole("Teacher")}
              className={`${
                userRole === "Teacher"
                  ? "text-gray-600 font-medium underline"
                  : "text-blue-500"
              } text-blue-500  tracking-wide`}
              disabled={userRole === "Teacher"}
            >
              {userRole !== "Teacher" ? (
                "Switch to Teacher"
              ) : (
                <p>
                  Teacher (<span className="text-gray-400">used</span>)
                </p>
              )}
            </button>
          )}

          {getRole?.trainer.length > 0 && (
            <button
              onClick={() => handleChangeRole("Trainer")}
              className={`${
                userRole === "Trainer"
                  ? "text-gray-600 font-medium underline"
                  : "text-blue-500"
              } text-blue-500  tracking-wide`}
              disabled={userRole === "Trainer"}
            >
              {userRole !== "Trainer" ? (
                "Switch to Trainer"
              ) : (
                <p>
                  Trainer (<span className="text-gray-400">used</span>)
                </p>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ChangeRole;
