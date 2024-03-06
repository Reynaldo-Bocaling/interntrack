import React, { lazy, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
const ReportList = lazy(() =>
  import("../../components/StudentWeeklyReport/WeeklyReport")
);
// const SubmitWeeklyReport = lazy(() =>
//   import("../../components/StudentWeeklyReport/SubmitWeeklyReport")
// );
const PendingWeeklyReport = lazy(() =>
  import("../../components/StudentWeeklyReport/PendingWeeklyReport")
);
const ApproveWeeklyReport = lazy(() =>
  import("../../components/StudentWeeklyReport/ApproveWeeklyReport")
);

const WeeklyReport = () => {
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between  mb-5 px-2">
      <h2 className="text-sm font-bold">Weekly Reports</h2>
      <button className="text-xs text-white bg-blue-500 rounded-full py-2 px-5" onClick={()=> setIsOpen(true)}>Create</button>
      </div>

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
              <small className="capitalize tracking-wider text-xs">
               Approved
              </small>
            }
          />
          <Tab
            label={
              <small className="capitalize tracking-wider text-xs">
                Pending
              </small>
            }
          />
        </Tabs>
      </Box>

      {value === 0 && <ApproveWeeklyReport />}
      {value === 1 && <PendingWeeklyReport />}

      {
        isOpen && <ReportList onClose={()=> setIsOpen(false)}/>
      }
    </>
  );
};

export default WeeklyReport;
