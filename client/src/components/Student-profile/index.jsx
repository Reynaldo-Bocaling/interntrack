import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Information from './Information'
import Requirements from './Requirements'
import Security from './Security'


function index() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='my-5'>
       <Box sx={{ width: '100%', bgcolor: 'background.paper' , marginBottom: '20px'}}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Info" />
          <Tab label="Security" />
          <Tab label="Requirements" />
        </Tabs>
      </Box>

      {value === 0 &&  <Information />}
      {value === 1 &&  <Security />}
      {value === 2 &&  <Requirements />}
    </div>
  );
}

export default index;
