import React, { lazy } from "react";
import { Carousel } from "@mantine/carousel";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMoreTime,
} from "react-icons/md";
const Logs = lazy(() => import("../../components/student-dailyLogs/DailyLogs"));
const LogsHistory = lazy(() =>
  import("../../components/student-dailyLogs/DailyLogsHistory")
);

const DailyLogs = () => {
  return (
    <>
      <Carousel
        className=" max-w-[full] z-0"
        nextControlIcon={<MdKeyboardArrowRight size={16} />}
        previousControlIcon={<MdKeyboardArrowLeft size={16} />}
      >
        <Carousel.Slide>
          <Logs />
        </Carousel.Slide>
        <Carousel.Slide>
            <LogsHistory />
        </Carousel.Slide>
      </Carousel>
    </>
  );
};

export default DailyLogs;
