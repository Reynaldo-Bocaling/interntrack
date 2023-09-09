import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function LeaveRequest() {
  const location = useLocation();
  const moa_list = location.state
  return (
    <div>
      <div>
        <h1>MOA LIST</h1>
        {
        moa_list.moa.map((item)=> (
          <div key={item.id}>
            <div>{item.id}</div>
            <div>{item.moaUploadFile}</div>
          </div>
        ))
        }
      </div>
      
    </div>
  );
}

export default LeaveRequest;
