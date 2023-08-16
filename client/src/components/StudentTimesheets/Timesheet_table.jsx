import React, { useState } from "react";
import { RiArrowUpDownLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";


const TimeSheetTable = ({data}) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const calculateTotalHours = (timeSheet) => {
    return timeSheet.reduce((sum, entry) => sum + entry.totalHours, 0);
  };

  const filteredStudentList = data.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudentList = filteredStudentList
    .filter((student) => student.timeSheet)
    .sort((a, b) => {
      const totalA = calculateTotalHours(a.timeSheet);
      const totalB = calculateTotalHours(b.timeSheet);
      return sortOrder === "asc" ? totalA - totalB : totalB - totalA;
    });

  const dates =
    sortedStudentList.length > 0
      ? sortedStudentList[0].timeSheet.map((entry) => entry.date)
      : [];
  const dateChunks = [];
  const chunkSize = 5;

  for (let i = 0; i < dates.length; i += chunkSize) {
    dateChunks.push(dates.slice(i, i + chunkSize));
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedStudentList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="pl-1 text-xl font-semibold tracking-wider">Timesheet</h2>
        <div className="flex items-center gap-5">
        <div className="h-10 flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200">
          <BiSearch />
          <input
            type="text"
            placeholder="Search"
            className="outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className=" text-sm text-white font-medium tracking-wide bg-green-500 rounded-md px-3 py-[7px]">Export</button>
        </div>
        
      </div>

      <div className="overflow-x-auto rounded-xl border">
        {currentItems.length > 0 && (
          <div className="w-max border-collapse p-2 bg-white">
            <table className="">
              <thead className="text-gray-700 text-md">
                <tr className="h-12">
                  <th></th>
                  <th></th>
                  {dateChunks.map((chunk, index) => (
                    <th
                      key={index}
                      colSpan={chunk.length + 1}
                      className="text-center border-r border-l font-semibold"
                    >
                      {chunk[0]} - {chunk[chunk.length - 1]}
                    </th>
                  ))}
                  <th className="text-center"></th>
                </tr>
                <tr className="h-14">
                  <th></th>
                  <th className="pr-4 py-2 font-semibold border-r">Name</th>
                  {dates.map((date, index) => (
                    <React.Fragment key={date}>
                      <th className="px-4 py-2 font-semibold">
                        {months[new Date(date).getMonth()]}{" "}
                        {new Date(date).getDate()}
                      </th>
                      {(index + 1) % chunkSize === 0 && (
                        <th className="px-4 py-2 font-semibold border-r">
                          Total
                        </th>
                      )}
                    </React.Fragment>
                  ))}
                  <th
                    className={`px-4 py-2 bg-slate-50 cursor-pointer gap-2 font-semibold`}
                    onClick={toggleSortOrder}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span>Total All</span>
                      <RiArrowUpDownLine />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-md tracking-wide">
                {currentItems.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`h-12 ${index % 2 === 0 ? "bg-slate-50" : ""}`}
                  >
                    <td className="px-2 border-r border-b text-center font-medium">
                      {index+1}
                    </td>
                    <td
                      className={`border-b pl-4 pr-10 py-2 font-medium border-r`}
                    >
                      {student.name}
                    </td>
                    {student.timeSheet.map((entry, index) => (
                      <React.Fragment key={entry.id}>
                        <td
                          title={student.name}
                          className={`border-b px-4 py-2 text-center cursor-pointer ${
                            entry.totalHours === 0 &&
                            index % chunkSize !== chunkSize - 1
                              ? "bg-red-100"
                              : ""
                          }`}
                        >
                          {entry.totalHours}
                        </td>
                        {(index + 1) % chunkSize === 0 && (
                          <td
                            className={`border-b px-4 py-2 font-semibold text-center text-gray-600 border-r`}
                          >
                            {student.timeSheet
                              .slice(index - chunkSize + 1, index + 1)
                              .reduce(
                                (sum, current) => sum + current.totalHours,
                                0
                              )}
                          </td>
                        )}
                      </React.Fragment>
                    ))}
                    <td
                      className={`border-b px-4 py-2 text-center font-medium ${
                        student.timeSheet.reduce(
                          (sum, entry) => sum + entry.totalHours,
                          0
                        ) >= 500
                          ? "bg-blue-400 text-white"
                          : student.timeSheet.reduce(
                              (sum, entry) => sum + entry.totalHours,
                              0
                            ) >= 375
                          ? "bg-green-100"
                          : student.timeSheet.reduce(
                              (sum, entry) => sum + entry.totalHours,
                              0
                            ) >= 250
                          ? "bg-orange-200"
                          : student.timeSheet.reduce(
                              (sum, entry) => sum + entry.totalHours,
                              0
                            ) >= 125
                          ? "bg-red-100"
                          : "bg-red-200"
                      }`}
                    >
                      {student.timeSheet.reduce(
                        (sum, entry) => sum + entry.totalHours,
                        0
                      ) >= 500
                        ? "Complete"
                        : student.timeSheet.reduce(
                            (sum, entry) => sum + entry.totalHours,
                            0
                          )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {currentItems.length === 0 ? (
          <div className="px-4 py-2 text-center">
            No matching records found.
          </div>
        ) : (
          <div className="flex my-3 ml-3">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-2 px-3 py-1 flex items-center rounded bg-gray-200 text-gray-600"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= sortedStudentList.length}
              className="mx-2 px-3 py-1 rounded bg-gray-200 text-gray-600"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSheetTable;
