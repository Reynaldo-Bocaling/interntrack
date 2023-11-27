import React, { useRef, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ReportList from '../../components/StudentWeeklyReport/WeeklyReport'
import SubmitWeeklyReport from '../../components/StudentWeeklyReport/SubmitWeeklyReport'

const WeeklyReport = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  

  return (
    <div>
        <h2 className="text-xl font-semibold mb-3">Weekly Reports</h2>
      
        <Box
        sx={{
          width: "100%",
          marginBottom: "25px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label={
              <small className="capitalize tracking-wider text-sm">
                Weekly Report
              </small>
            }
          />
          <Tab
            label={
              <small className="capitalize tracking-wider text-sm">
                Submitted  Report
              </small>
            }
          />
         
        </Tabs>
      </Box>
        
      {value === 0 && <ReportList />}
      {value === 1 && <SubmitWeeklyReport />}
    </div>
  );
};

export default WeeklyReport;
