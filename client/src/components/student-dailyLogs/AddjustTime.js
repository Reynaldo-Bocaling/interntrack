import {
    format,
    parse,
    setMinutes,
    getMinutes,
    getHours,
    setHours,
  } from "date-fns";

export const adjustTime = (time) => {
    const minutes = getMinutes(time);
    const hours = getHours(time);
    if (minutes >= 0 && minutes < 15) {
      return setMinutes(setMinutes(time, 0), 0);
    } else if (minutes >= 15 && minutes < 30) {
      return setMinutes(setMinutes(time, 0), 15);
    } else if (minutes >= 30 && minutes < 45) {
      return setMinutes(setMinutes(time, 0), 30);
    } else {
      return setMinutes(setMinutes(time, 0), 45);
    }
  };