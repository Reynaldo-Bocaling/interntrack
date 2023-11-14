import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import { ImAttachment } from "react-icons/im";
import { BiCheck, BiError } from "react-icons/bi";

const TimeOut = () => {
  const [taskFile, setTaskFile] = useState(null);
  const [timeIn, setTimeIn] = useState("");
  const [totalHours, setTotalHours] = useState(0);

  const canTimeOut = timeIn !== null; // Check if a Time In has been recorded

  useEffect(() => {
    setTimeIn(localStorage.getItem("timeIn"));
  }, []);
  const handleFileChange = (e) => {
    setTaskFile(e.target.files[0]);
  };

  const handleTimeOut = () => {
    if (taskFile && canTimeOut) {
      const now = new Date();
      const timeInDate = new Date(timeIn);
      const diffInSeconds = (now - timeInDate) / 1000;
      const hoursWorked = diffInSeconds / 3600;
      setTotalHours(totalHours + hoursWorked);
      localStorage.removeItem("timeIn");
      setTimeIn(null);
      setTaskFile(null);
      alert(`Success!`);
    } else if (!canTimeOut) {
      alert("You need to record a Time In first.");
    } else {
      alert("Please attach a task file before proceeding to Time Out.");
    }
  };

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 border-t pt-5">Time Out</h2>
      <p className="mb-2">Total Hours Today: N/A</p>
      <div>
        {taskFile == null ? (
          <div
            className={` ${
              !canTimeOut && "cursor-not-allowed opacity-50"
            } relative px-4 py-3 rounded bg-blue-500 mb-5 w-[180px]  flex items-center justify-center gap-2`}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className={`${
                !canTimeOut && "cursor-not-allowed"
              } mb-2 absolute w-full h-full cursor-pointer opacity-0`}
              disabled={!canTimeOut}
            />
            <ImAttachment className="text-white" />
            <span className="text-white font-medium text-sm tracking-wide">
              Upload task
            </span>
          </div>
        ) : (
          <div className="flex items-center text-green-500 my-5">
            <span className="font-medium tracking-wide">Task Uploaded</span>
            <BiCheck size={25} />
          </div>
        )}

        <TextField
          label="Your Message"
          variant="outlined"
          multiline
          rows={4}
          value={value}
          onChange={handleChange}
          fullWidth
        />

        <button
          className={`bg-blue-500 text-white w-[180px]  px-4 py-2 rounded  mt-5 ${
            canTimeOut && taskFile != null
              ? ""
              : "cursor-not-allowed opacity-50"
          }`}
          onClick={handleTimeOut}
          disabled={!canTimeOut && taskFile != null}
        >
          Time Out
        </button>
        <div className="flex flex-col gap-3 mt-5 text-sm text-red-500 tracking-wide">
          {!canTimeOut && (
            <div className="flex items-center gap-2">
              <BiError /> <span className="font-semibold">Error:</span> Time Out
              not allowed. Please record a Time In before proceeding.
            </div>
          )}
          {taskFile == null && (
            <span className="flex items-center gap-2">
              <BiError /> <span className="font-semibold">Error:</span> Please
              attach a task before proceeding to Time Out{" "}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeOut;
