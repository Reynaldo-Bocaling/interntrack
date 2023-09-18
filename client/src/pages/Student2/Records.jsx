import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";


function Record() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
        <h1 className="text-xl font-bold tracking-wider text-gray-700 mb-5 ml-3 mt-2">
          Records
        </h1>
      <div className='flex items-center justify-between mb-5 w-full border-b pb-2'>
        {/* <NavLink to="/record/" className="filterLinkStudent  text-gray-500 text-center">Weekly reports</NavLink>
        <NavLink to="/record/timesheet" className="filterLinkStudent text-center text-gray-500">Timesheet</NavLink>
        <NavLink to="/record/activites" className="filterLinkStudent text-center text-gray-500">Activity</NavLink> */}

        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab
              label={<p className="text-xs font-semibold">Weekly reports</p>}
              onClick={() => navigate("/record")}
            />
            <Tab
              label={<p className="text-xs font-semibold">Timesheet</p>}
              onClick={() => navigate("/record/timesheet")}
            />
            <Tab
              label={<p className="text-xs font-semibold">Activity</p>}
              onClick={() => navigate("/record/activites")}
            />
          </Tabs>
        </Box>
      </div>

      <Outlet />
    </div>
  )
}

export default Record
