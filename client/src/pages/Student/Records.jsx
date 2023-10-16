import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TimeSheet from './TimeSheet'
import WeeklyReport from './WeeklyReport'
import Activities from './Activities'

function Logs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' , marginBottom: '20px'}}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Weekly report" />
          <Tab label="Timesheet" />
          <Tab label="Task" />
        </Tabs>
      </Box>

      {value === 0 &&  <WeeklyReport />}
      {value === 1 &&  <TimeSheet />}
      {value === 2 &&  <Activities />}
    </div>
  );
}

export default Logs;
