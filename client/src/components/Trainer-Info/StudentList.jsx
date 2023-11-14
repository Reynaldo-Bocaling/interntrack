import React from "react";
import pic from "../../assets/images/dp.png";
import { Avatar } from "@nextui-org/react";
import Pulseloader from "react-spinners/PulseLoader";

const StudentList = ({ data, isLoading }) => {
  return (
    <div>
      <div className="text-xl text-gray-700 font-semibold tracking-wide mt-3 mb-5 ml-5">
        Student List
      </div>
      {isLoading ? (
        <h1 className="text-center my-14 py-5 border rounded-lg">
          <Pulseloader
            color="#1892fc"
            margin={5}
            size={13}
            speedMultiplier={1}
            className="mx-auto"
          />
        </h1>
      ) : (
        <div className="max-w-[97%] w-full my-5 mx-5 rounded-lg border p-4">
          <table className=" w-full">
            <thead>
              <tr className="h-14 border-b">
                <th className="text-sm text-left pl-3">ID</th>
                <th className="text-sm text-left pl-3">Name</th>
                <th className="text-sm text-left pl-3">Email</th>
                <th className="text-sm text-left pl-3">Contact</th>
                <th className="text-sm text-left pl-3">campus</th>
                <th className="text-sm text-left pl-3">program</th>
                <th className="text-sm text-left pl-3">major</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index} className="h-14">
                    <td className="text-left pl-3">{item.id}</td>
                    <td className="text-left pl-3">
                      <div className="flex items-center gap-2">
                        <Avatar src={pic} size="sm" />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="text-sm text-left pl-3">{item.email}</td>
                    <td className="text-sm text-left pl-3">{item.contact}</td>
                    <td className="text-sm text-left pl-3">{item.campus}</td>
                    <td className="text-sm text-left pl-3">{item.program}</td>
                    <td className="text-sm text-left pl-3">{item.major}</td>
                  </tr>
                ))
              ) : (
                <tr className="h-14">
                  <td colSpan={8} className="text-center">
                    NO STUDENT
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
