import React, { Suspense, lazy } from "react";
import { Carousel } from "@mantine/carousel";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMoreTime,
} from "react-icons/md";
import { DotLoading } from "../../components/spinners-loading/Spinner";
const Logs = lazy(() => import("../../components/student-dailyLogs/DailyLogs"));
const LogsHistory = lazy(() =>
  import("../../components/student-dailyLogs/DailyLogsHistory")
);

const DailyLogs = () => {
  return (
    <div>
      <Carousel
        className=" max-w-[full] z-0"
        nextControlIcon={<MdKeyboardArrowRight size={16} />}
        previousControlIcon={<MdKeyboardArrowLeft size={16} />}
      >
        <Carousel.Slide>
          <Logs />
        </Carousel.Slide>
        <Carousel.Slide>
          <Suspense fallback={<DotLoading />}>
            <LogsHistory />
          </Suspense>
        </Carousel.Slide>
      </Carousel>

      <div></div>
    </div>
  );
};

export default DailyLogs;
