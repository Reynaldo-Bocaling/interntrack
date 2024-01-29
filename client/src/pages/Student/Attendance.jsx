import React, { lazy, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
const AttendanceRequest = lazy(() => import("./Attendance_request"));
const DailyLogs = lazy(() => import("./DailyLogs"));
import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../../api/Api";

const Logs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getStudentInfo"],
    queryFn: getStudent,
  });

  return (
    <>
      {isLoading ? (
        "loading"
      ) : (
        <div>
          {data?.deleteStatus === 1 ||
          data?.areaAssigned_id == null ||
          data?.trainer_id == null ? (
            <center>
              Not available for time logs. You are not assigned to any company
              yet.
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
                  <Tab label="Daily logs" />
                  <Tab label="Attendance Request" />
                </Tabs>
              </Box>

              {value === 0 ? <DailyLogs /> : <AttendanceRequest />}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Logs;
