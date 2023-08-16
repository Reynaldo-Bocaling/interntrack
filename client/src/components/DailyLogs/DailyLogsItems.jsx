import React from "react";
import BasicTable from "../React-table/BasicTable";

const DailyLogsItems = ({ data, columns }) => {
  
  return (
    <div>
      <BasicTable data={data} columns={columns} />
    </div>
  );
};

export default DailyLogsItems;
