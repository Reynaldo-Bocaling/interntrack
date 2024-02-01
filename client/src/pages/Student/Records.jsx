import React, { lazy, useState , Suspense} from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { DotLoading } from "../../components/spinners-loading/Spinner";
const TimeSheet = lazy(() => import("./TimeSheet"));
const WeeklyReport = lazy(() => import("./WeeklyReport"));
const Activities = lazy(() => import("./Activities"));
const Requirement = lazy(() => import("./Requirement"));

const Logs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
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

      {value === 0 && (
        // <Suspense fallback={<center>Load Weekly Report</center>}>
          <WeeklyReport />
        // </Suspense>
      )}
      {value === 1 && (
        <Suspense fallback={<DotLoading/>}>
          <TimeSheet />
         </Suspense>
      )}
      {value === 2 && (
        <Suspense fallback={<DotLoading/>}>
          <Activities />
         </Suspense>
      )}
      {value === 3 && (
        <Suspense fallback={<DotLoading/>}>
          <Requirement />
         </Suspense>
      )}
    </>
  );
};

export default Logs;
