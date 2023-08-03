import React from "react";
import { Link, Outlet } from "react-router-dom";
function LeaveRequest() {
  return (
    <div>
      <div>
        <h1>Leave Request</h1>
      </div>
        <div>
            <Link to="/leave-request">Approve</Link>
            <Link to="/leave-request/failed">Denied</Link>
        </div>

        <div>
            <Outlet />
        </div>
    </div>
  );
}

export default LeaveRequest;
