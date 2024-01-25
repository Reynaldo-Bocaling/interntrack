import React, { lazy, useState } from 'react'
const ViewReport = lazy(()=> import('../../components/StudentWeeklyReport/TeacherViewReport'))
const ReportRequest = lazy(()=> import('../../components/StudentWeeklyReport/ReportRequest'))
import { Tabs } from "@mantine/core";
import { BiSearch } from 'react-icons/bi';


function WeeklyReportList() {
  const [searchInput, setSearchInput] = useState("");
  const [searchLength, setSearchLength] = useState(false);
  return (
    <div className="py-2">
       <div className="flex items-center justify-between w-full pr-5 mb-4">
          <h2 className="text-xl font-semibold mb-3">Weekly Reports</h2>

          <div className="flex items-center gap-3">
            <div
              className={`${
                searchLength ? "w-[250px]" : "w-[40px]"
              } h-10  flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200 duration-300`}
            >
              <BiSearch
                onClick={() => setSearchLength(!searchLength)}
                className={`${
                  searchLength ? "text-blue-500" : "text-gray-600"
                } cursor-pointer`}
              />
              {searchLength && (
                <input
                  type="text"
                  placeholder="Search.."
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="outline-none text-sm"
                />
              )}
            </div>
          </div>
        </div>

       <div className="flex items-center justify-between">


        <Tabs defaultValue="all" className="w-full">
          <Tabs.List sx={{ borderColor: "#ecf0f1" }}>
            <Tabs.Tab
              className="text-base text-gray-500 tracking-wide"
              value="all"
            >
              All
            </Tabs.Tab>

            <Tabs.Tab
              className="text-base text-gray-500 tracking-wide"
              value="request"
            >
              Request
            </Tabs.Tab>
          </Tabs.List>


          <Tabs.Panel value="all" pt="xs">
            <ViewReport />
          </Tabs.Panel>

          <Tabs.Panel value="request" pt="xs">
            <ReportRequest />
          </Tabs.Panel>
          
        </Tabs>
      </div>
    </div>
  )
}

export default WeeklyReportList
