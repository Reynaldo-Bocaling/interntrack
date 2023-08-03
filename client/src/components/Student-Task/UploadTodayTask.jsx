import React, { useEffect, useState } from "react";
import pic from "../../assets/images/task1.jpg";

function UploadTodayTask() {
  const currentDate = new Date();
  const getMonthName = (date) => {
    return date.toLocaleString("en-US", { month: "long" });
  };

  return (
    <div>
      <p className="text-lg font-semibold tracking-wide">
        {`${getMonthName(
          currentDate
        )} ${currentDate.getDate()}, ${currentDate.getFullYear()}`}
      </p>

      <section className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {Array.from({ length: 8 }, (item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg shadow-slate-100 border border-slate-100 rounded-lg p-4 flex flex-col justify-end"
          >
            <img
              className="w-full h-48 object-cover object-center mb-4 rounded-lg"
              src={pic}
              alt={"ds"}
            />
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-center w-full pb-1 mb-2 border-b">
                  <h2 className="text-base text-gray-800 font-semibold tracking-wide">
                    Check Student Code
                  </h2>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm text-gray-600 font-semibold tracking-wide">
                      Reynaldo F. Bocaling
                    </h2>
                  </div>

                  <button className="text-base font-semibold text-blue-500 py-2 px-2">
                    View
                  </button>
                </div>
              </div>
            </div>

          </div>
        ))}
      </section>
    </div>
  );
}

export default UploadTodayTask;
