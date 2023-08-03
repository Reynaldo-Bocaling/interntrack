import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiSearchAlt2 } from "react-icons/bi";
import { ImFileExcel } from "react-icons/im";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
const Time_sheets = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/students");
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  const renderWeeks = (timeRecords) => {
    const weeks = [];
    let currentWeek = [];
    let totalHoursWeek = 0;

    for (let i = 0; i < timeRecords.length; i++) {
      const record = timeRecords[i];
      currentWeek.push(record);
      totalHoursWeek += record.totalHours;

      if (currentWeek.length === 5 || i === timeRecords.length - 1) {
        weeks.push({ week: currentWeek, totalHours: totalHoursWeek });
        currentWeek = [];
        totalHoursWeek = 0;
      }
    }

    return weeks;
  };

  const getWeekLabel = (week) => {
    if (week.length > 0) {
      const startDate = week[0].date;
      const endDate = week[week.length - 1].date;
      return `(${startDate} - ${endDate})`;
    }
    return "";
  };

  return (
    <div className="h-full rounded-lg  max-w-[1020px]">
      <div className="flex items-center justify-between w-full">
        <sypan className="text-2xl font-semibold tracking-wider">
          Timesheet
        </sypan>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border rounded-full pl-3 py-2 w-[270px]">
            <span className="text-blue-500 border-r border-gray-500 pr-2">
              {" "}
              <BiSearchAlt2 />
            </span>
            <input
              type="text"
              className="text-sm outline-none"
              placeholder="Search.."
            />
          </div>

          {/* export timesheet */}

          <button className="flex items-center gap-2 bg-green-600 text-white font-semibold tracking-wider text-sm py-2 px-3 rounded-lg hover:bg-green-500">
            <PiMicrosoftExcelLogoFill size={20} />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto h-[500px] mt-3 border rounded-lg">
        <table className="h-auto min-w-max">
          <colgroup>
            <col style={{ width: "100px" }} />
            <col style={{ width: "120px" }} />
            {students.length > 0 &&
              renderWeeks(students[0].time).map((week, index) => (
                <col key={index} style={{ width: "120px" }} />
              ))}
            <col style={{ width: "120px" }} />
          </colgroup>
          <thead>
            <tr className="h-10 sticky top-0 bg-white z-30 text-sm tracking-wider ">
              <th rowSpan="2" className="sticky left-0 bg-gray-100 z-30">
                ID
              </th>
              <th
                rowSpan="2"
                className="2-[120px] sticky left-[100px] bg-gray-100 z-30"
              >
                Name
              </th>
              {students.length > 0 &&
                renderWeeks(students[0].time).map((week, index) => (
                  <th className="border-r bg-gray-100" key={index} colSpan={5}>
                    {getWeekLabel(week.week)}
                  </th>
                ))}
              <th rowSpan="2">Total All Hours</th>
            </tr>
            <tr className="h-10 sticky top-10 bg-white z-20 text-sm tracking-wider border-b border-gray-300">
              {students.length > 0 &&
                students[0].time.map((record) => (
                  <th className="border-l bg-gray-100 z-20" key={record.date}>
                    {record.date}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr className="h-12 border-b border-gray-200" key={student.id}>
                <td className="w-[100] sticky left-0 bg-gray-100 z-10 pl-10 ">
                  {student.id}
                </td>
                <td className="w-[130px] sticky left-[100px] bg-gray-100 z-10 pl-4 border-r-2">
                  {student.name}
                </td>
                {renderWeeks(student.time).map((week, index) => (
                  <td className="border" key={index} colSpan={5}>
                    {week.week.map((record) => (
                      <span
                        className="px-8 text-sm tracking-wider"
                        key={record.id}
                      >
                        {record.totalHours}hrs{" "}
                      </span>
                    ))}
                    <span className="pr-4">{week.totalHours}hrs</span>
                  </td>
                ))}
                <td>
                  {student.time.reduce(
                    (total, record) => total + record.totalHours,
                    0
                  )}
                  hrs
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Time_sheets;
