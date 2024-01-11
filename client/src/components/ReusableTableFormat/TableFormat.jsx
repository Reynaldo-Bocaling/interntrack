import React from "react";
import BasicTable from "../React-table/BasicTable";
import PulseLoader from "react-spinners/PulseLoader";
import ErrorImage from '../../assets/images/errorServerIcon.jpg'
import WarningIcon from '../../assets/images/warningicon.png'

const TableFormat = ({ data, columns, isLoading, isError }) => {
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center flex items-center gap-2">
          Server Failed. Please Try Again Later
          <img src={WarningIcon} alt="warning icon"  className="w-[50px]"/>
        </h1>

        <img src={ErrorImage} alt="Server Error Image" className="max-w-[450px] w-full" />
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <h1 className="textLoading text-base flex items-center justify-center gap-1">
          Retrieving Data
          <PulseLoader
            color="#1892fc"
            margin={3}
            size={4}
            speedMultiplier={1}
            className=""
          />
        </h1>
      ) : (
        <BasicTable data={data} columns={columns} />
      )}
    </div>
  );
};

export default TableFormat;
