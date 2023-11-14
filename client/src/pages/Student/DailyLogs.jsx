import React from "react";
import { Carousel } from "@mantine/carousel";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMoreTime,
} from "react-icons/md";
import Logs from "../../components/student-dailyLogs/DailyLogs";
import LogsHistory from "../../components/student-dailyLogs/DailyLogsHistory";

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
          <LogsHistory />
        </Carousel.Slide>
      </Carousel>

      <div></div>
    </div>
  );
};

export default DailyLogs;
