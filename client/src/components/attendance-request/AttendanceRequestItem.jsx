import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import dp from "../../assets/images/dp.png";
import { FcCalendar } from "react-icons/fc";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import PulseLloader from "react-spinners/PulseLoader";

const AttendanceRequestItem = ({ data, isLoading }) => {
  const [show, setShow] = useState(null);

  const handleFunc = (index) => {
    setShow((prev) => (prev === index ? null : index));
  };

  const studentAttendance = data
    ? data
        .filter((student) => student.timesheet.length > 0)
        .sort((a, b) => a.lastname.localeCompare(b.lastname))
        .map(({ id, firstname, lastname, accountStatus, timesheet }) => ({
          id,
          firstname,
          lastname,
          accountStatus,
          totalDays: timesheet.length,
          totalHours: timesheet.reduce(
            (total, day) => total + day.totalHours,
            0
          ),
          startDate: timesheet[0].date,
          endDate: timesheet[timesheet.length - 1].date,
        }))
    : [];

  console.log("attendace", studentAttendance);

  return (
    <div>
      {isLoading ? (
        <h1 className="text-center my-14 py-5 border rounded-lg">
          <PulseLloader
            color="#1892fc"
            margin={5}
            size={13}
            speedMultiplier={1}
            className="mx-auto"
          />
        </h1>
      ) : (
        <>
          {studentAttendance.length > 0 ? (
            studentAttendance.map((item, index) => (
              <div
                key={index}
                className="border rounded-xl bg-white mb-3 px-5 py-2 cursor-pointer"
              >
                <div
                  className="flex items-center justify-between w-full mt-2"
                  onClick={() => handleFunc(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="max-w-[45px] p-2 rounded-full overflow-hidden shadow-md shadow-gray-100">
                      <img src={dp} alt="" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-semibold text-base tracking-wider capitalize flex items-center gap-2">
                        <span className="capitalize">{item.lastname},</span>
                        <span className="capitalize">{item.firstname}</span>
                      </h1>

                      <small className="text-[0.7rem] font-medium text-blue-500 tracking-wider flex items-center capitalize">
                        SUM-{item.id}
                      </small>
                    </div>
                  </div>

                  <small className="text-yellow-500 tracking-wide font-medium">
                    Pending request
                  </small>

                  <div className="flex gap-5 items-center">
                    <div className="flex flex-col gap-1">
                      <div className="text-base font-medium tracking-wider">
                        {item.totalDays} Days
                      </div>
                      <p className="text-sm tracking-wider">
                        {item.totalHours} Hours
                      </p>
                    </div>
                    <div>
                      <FiChevronDown
                        className={`text-2xl duration-100 text-blue-500 ${
                          show === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`mt-3 max-h-0 overflow-hidden duration-200 ${
                    show === index ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <div className="py-4 border-t flex flex-col gap-4">
                    <span className="text-lg text-blue-500 font-medium tracking-wider">
                      Attendance Request
                    </span>
                    <div className="flex items-center gap-2">
                      <FcCalendar size={25} />
                      <div className="flex items-center gap-2">
                        <span>{item.startDate}</span> -
                        <span>{item.endDate}</span>
                      </div>
                    </div>
                    <div className="item-buttons flex items-center gap-3 mt-3">
                      <button className="py-2 px-10 text-sm text-white bg-sky-500 rounded-full border-[2px] border-sky-500 hover:opacity-[0.9]">
                        Confirm All
                      </button>
                      <Link
                        to={`/Attendance-request/view/${item.id}`}
                        className="py-2 px-10 text-sm text-sky-500 rounded-full border-[2px] border-sky-500 hover:bg-sky-50"
                      >
                        Check
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-5 mt-7 text-xl font-medium text-center bg-white rounded-lg">
              No record
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AttendanceRequestItem;
