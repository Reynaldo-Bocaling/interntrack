import React, { lazy, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AttendanceRequest from "./Attendance_request";
import DailyLogs from "./DailyLogs";
import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../../api/Api";
import { DotLoading } from "../../components/spinners-loading/Spinner";

const Logs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getStudentInfo"],
    queryFn: getStudent,
  });

  if(isLoading){
    return <DotLoading/>
  }
  return (
    <>
      {data?.deleteStatus === 1 ||
      data?.areaAssigned_id == null ||
      data?.trainer_id == null ? (
        <center className="text-[5rem]">
          Not available for time logs. You are not assigned to any company yet.
        </center>
      ) : (
        <>
          <Box
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              marginBottom: "20px",
            }}
          >
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Daily logs" sx={{fontSize: '12px'}} />
              <Tab label="Attendance Request" sx={{fontSize: '12px'}} />
            </Tabs>
          </Box>

          <div>{value === 0 ? <DailyLogs /> : <AttendanceRequest />}</div>
        </>
      )}
    </>
  );
};

export default Logs;
