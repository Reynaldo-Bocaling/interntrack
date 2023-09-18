import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function Attendance() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="">
      <h1 className="text-xl font-bold tracking-wider text-gray-700 mb-5 ml-3 mt-2">
        Attendance
      </h1>
      <div className="flex items-center justify-between mb-5 w-full border-b pb-2">
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab
              label={<p className="font-semibold">Daily Logs</p>}
              onClick={() => navigate("/Attendance")}
            />
            <Tab
              label={<p className="font-semibold">Attendance Request</p>}
              onClick={() => navigate("/Attendance/Attendance-request")}
            />
          </Tabs>
        </Box>
      </div>

      <Outlet />
    </div>
  );
}

export default Attendance;
