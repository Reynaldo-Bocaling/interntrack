import React from "react";
import pic from "../../assets/images/task1.jpg";
import { BiSearch } from "react-icons/bi";

function UploadAllTask() {
  const currentDate = new Date();
  const getMonthName = (date) => {
    return date.toLocaleString("en-US", { month: "long" });
  };

  return (
    <div>
      <div className="header flex justify-between m-1">
        <p className="text-lg font-semibold tracking-wide">All Uploads</p>
        <div className="search flex items-center gap-2 bg-white  px-3 py-2 rounded-full shadow-md shadow-slate-100 border border-slate-100">
          <BiSearch />
          <input
            type="search"
            className="w-[200px] outline-none "
            placeholder="Search.."
          />
        </div>
      </div>

      <section className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {Array.from({ length: 8 }, (item, index) => (
          <div
            key={index}
            className="bg-white shadow-md shadow-slate-200 border border-slate-100 rounded-lg p-4 flex flex-col justify-end"
          >
            <img
              className="w-full h-48 object-cover object-center mb-2 rounded-lg"
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

                <div className="flex justify-between">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm text-gray-600 font-semibold tracking-wide">
                      Reynaldo F. Bocaling
                    </h2>

                    <p className="text-xs text-gray-600">
                      {`${getMonthName(
                        currentDate
                      )} ${currentDate.getDate()}, ${currentDate.getFullYear()}`}
                    </p>
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

export default UploadAllTask;
