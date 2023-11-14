import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TimeSheet from "./TimeSheet";
import WeeklyReport from "./WeeklyReport";
import Activities from "./Activities";
import Requirement from "./Requirement";

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
          marginBottom: "25px",
        }}
      >
        <Tabs value={value} onChange={handleChange} centered>
          <Tab
            label={
              <small className="font-semibold capitalize tracking-wide text-[0.0.90rem]">
                Report
              </small>
            }
          />
          <Tab
            label={
              <small className="font-semibold capitalize tracking-wide text-[0.0.90rem]">
                Timesheet
              </small>
            }
          />
          <Tab
            label={
              <small className="font-semibold capitalize tracking-wide text-[0.0.90rem]">
                Task
              </small>
            }
          />
          <Tab
            label={
              <small className="font-semibold capitalize tracking-wide text-[0.0.90rem]">
                Requirements
              </small>
            }
          />
        </Tabs>
      </Box>

      {value === 0 && <WeeklyReport />}
      {value === 1 && <TimeSheet />}
      {value === 2 && <Activities />}
      {value === 3 && <Requirement />}
    </div>
  );
};

export default Logs;
