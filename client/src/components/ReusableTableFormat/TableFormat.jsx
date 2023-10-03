import React from "react";
import BasicTable from "../React-table/BasicTable";
import PulseLoader from "react-spinners/PulseLoader";

const TableFormat = ({ data, columns, isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <h1 className="text-center my-14 py-5 border rounded-lg">
          <PulseLoader
            color="#1892fc"
            margin={5}
            size={13}
            speedMultiplier={1}
            className="mx-auto"
          />
        </h1>
      ) : (
        <BasicTable data={data} columns={columns} />
      )}
    </div>
  );
};

export default TableFormat;
