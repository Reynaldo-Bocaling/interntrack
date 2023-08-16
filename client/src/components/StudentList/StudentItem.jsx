import React from "react";
import BasicTable from "../React-table/BasicTable";

const StudentListItem = ({ data, columns }) => {
  return (
    <div>
      <BasicTable data={data} columns={columns} />
    </div>
  );
};


export default StudentListItem