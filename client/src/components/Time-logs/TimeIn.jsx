import React, { useState, useEffect } from "react";

const TimeIn = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const monthsOfYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const dayOfWeek = daysOfWeek[now.getDay()];
      const monthOfYear = monthsOfYear[now.getMonth()];

      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";

      const formattedTime = `${hours % 12}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")} ${ampm}`;
      const formattedDate = `${monthOfYear} ${now.getDate()}, ${now.getFullYear()}`;

      setTime(formattedTime);
      setDate(`${dayOfWeek}, ${formattedDate}`);
    };

    const interval = setInterval(updateTime, 1000);
    updateTime();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const progress = 50;

  return (
    <div className="TimeIn">
      <h1 className="text-3xl">{time}</h1>

      <h3>{date}</h3>
    </div>
  );
};

export default TimeIn;
