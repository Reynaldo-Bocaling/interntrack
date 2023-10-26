import { Button } from "@nextui-org/react";
import React from "react";
import { PiWarningBold } from "react-icons/pi";

function ResetData() {
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

        <Button color="danger" className="mt-5 font-medium tracking-wide">
          Reset all data
        </Button>
      </div>
    </div>
  );
}

export default ResetData;
