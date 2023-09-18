import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { StudentData } from "../../components/Student-Task/Data";




import { RxDashboard } from "react-icons/rx";
import FilterTask from "../../components/StudentTaskStyle/FilterTask";
const Activities = () => {
  const [filter, setFilter] = useState(true)
  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <h1 className="pl-1 text-xl font-semibold">Upload task</h1>
        <div className="flex items-center gap-5">
          
          {/* </div> */}
        </div>
      </div>

      <FilterTask />

    </div>
  );
};

export default Activities;
