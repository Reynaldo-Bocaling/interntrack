import React from "react";
import { DotIcons } from "../ReactIcon/React-Icons";

const Table = (props) => {
  const {
    data,
    datalist, 
    setId, 
    setFullscreen 
  } = props;
  return (
    <>
      {data.length !== 0 ? (
        <table className="w-full">
          <thead>
            <tr className="h-12 border-b">
              <th className="text-sm tracking-wide text-left pl-2">ID</th>
              <th className="text-sm tracking-wide text-left pl-2 w-[320px]">
                Name
              </th>
              <th className="text-sm tracking-wide text-center">Total tasks</th>
              <th className="text-sm tracking-wide text-center">Last upload</th>
              <th className="text-sm tracking-wide text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {datalist.length !== 0 ? (
              datalist.map((data, index) => (
                <tr
                  key={index}
                  className={` h-14 hover:bg-gray-50 hover:border-b cursor-pointer`}
                  onClick={() => {
                    setId(data.studentNo), setFullscreen(true);
                  }}
                >
                  <td className="text-sm tracking-wide pl-2 ">
                    {data.studentNo}
                  </td>
                  <td className="text-sm tracking-wide pl-2">
                    <div className="profile flex items-center gap-3">
                      <div className=" mt-3 rounded-full w-10 h-10 flex items-center justify-center bg-white border shadow-lg shadow-slate-200">
                        <img
                          src={data.image}
                          alt=""
                          width={30}
                          className="rounded-full mx-[0.35rem]"
                        />
                      </div>
                      <span className="mt-2 text-sm font-semibold">
                        {data.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-sm tracking-wide pl-2 text-center">
                    {data.totalTask}
                  </td>
                  <td className="text-sm tracking-wide pl-2 text-center">
                    {data.lastUpload}
                  </td>
                  <td className="text-sm tracking-wide pl-2 text-center ">
                    <div className="flex items-center justify-center">
                      {data.status === 0 ? (
                        <div className="flex items-center justify-center text-green-500 bg-green-100 px-2 py-[2px] rounded-full">
                          <span>Online</span>
                          <div className="text-xl">
                            <DotIcons />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center text-red-500 bg-red-100 px-2 py-[2px] rounded-full">
                          <span>Offline</span>
                          <div className="text-xl">
                            <DotIcons />
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="h-12 mt-5">
                <td colSpan={5} className="text-center">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center">No record exist</div>
      )}
    </>
  );
}

export default Table;
