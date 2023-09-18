import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { StudentData } from "../../components/Student-Task/Data";




import { RxDashboard } from "react-icons/rx";
import UnOrderedListStyle from "../../components/StudentTaskStyle/FilterTask";
import OrderedListStyle from "../../components/StudentTaskStyle/OrderedListStyle";
const StudentTask = () => {
  const [filter, setFilter] = useState(true)
  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <h1 className="mb-5 text-xl font-semibold">Upload task</h1>
        <div className="flex items-center gap-5">
          <div className="h-10 w-[230px] flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200 ">
            <BiSearch className="text-blue-500" />
            <input
              type="text"
              placeholder="Search.."
              onChange={(e) => setSearchInput(e.target.value)}
              className="outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <button className={`${filter? 'bg-blue-500 text-white': 'bg-white'} p-3 rounded-full drop-shadow-md`} onClick={()=> setFilter(true)}>
              <RxDashboard />
            </button>
            <button className={`${filter? 'bg-white': 'bg-blue-500 text-white'} p-3 rounded-full drop-shadow-md`}  onClick={()=> setFilter(false)}>
              <AiOutlineUnorderedList />
            </button>
          </div>
        </div>
      </div>

      {
        filter? <UnOrderedListStyle /> : <OrderedListStyle />
      }

    </div>
  );
};

export default StudentTask;
