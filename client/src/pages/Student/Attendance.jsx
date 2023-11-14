import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AttendanceRequest from "./Attendance_request";
import DailyLogs from "./DailyLogs";

const Logs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          marginBottom: "20px",
        }}
      >
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Daily logs" />
          <Tab label="Attendance Request" />
        </Tabs>
      </Box>

      {value === 0 ? <DailyLogs /> : <AttendanceRequest />}
    </div>
  );
};

export default Logs;
