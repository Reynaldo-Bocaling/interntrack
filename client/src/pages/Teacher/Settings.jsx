import React, { useState } from "react";
import Information from "../../components/user-Settings/Information";
import ChangePassword from "../../components/user-Settings/ChangePassword";
import SetUpDate from "../../components/user-Settings/SetupDates";
import { MdKeyboardArrowRight } from "react-icons/md";
import { getTeacher } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ChangeRole from "../../components/user-Settings/ChangeRole";


const Settings = () => {
  const [valueEvent, setValueEvent] = useState(1);

  const { data } = useQuery({
    queryKey: ["getTeacherInfo"],
    queryFn: getTeacher,
  });

  const newData =  data? data: []
  const infoData = [
    {
      label: "Name",
      value: `${newData?.firstname} ${newData?.lastname}`,
    },
    {
      label: "Email",
      value: newData?.email,
    },
    {
      label: "Contact",
      value: newData?.contact,
    },
  ];

  const links = [
    {
      label: "Personal Information ",
      value: 1,
      element: Information,
      data: infoData,
      extraText: "Personal Data",
    },
    {
      label: "Change password ",
      value: 2,
      element: ChangePassword,
    },
    {
      id: 3,
      label: "Old students ",
      url: "/old-students",
    },
    {
      label: "Date Range ",
      value: 3,
      element: SetUpDate,
      extraText: "Date Range Setup",
    },
    {
      id: 4,
      label: "Change Role",
      value: 4,
      element: ChangeRole,
    },
  ];

  return (
    <div className="p-1">
      <small className="block -mt-2 mb-4 text-gray-400 tracking-wider">
        {links.map((item, index) =>
          valueEvent === item.value ? (
            <span key={index} className="flex items-center">
              Settings <MdKeyboardArrowRight size={18} /> {item.label}
            </span>
          ) : (
            ""
          )
        )}
      </small>
      <span className="w-full text-2xl font-bold">Settings</span>

      <div className="flex gap-4 w-full mt-5">
      <div className="mt-3 w-[25%] flex flex-col gap-3 items-start">
          {links.map((item, index) => (
            <div key={index}>
              {item.extraText &&
              (
                <small  className="text-[0.68rem] text-gray-400 mt-5 block">
                  {item.extraText}
                </small>
              )}
              {item.url && (
                <Link
                  to={item.url}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Old Student
                </Link>
              )}

              {!item.url && (
                <button
                  onClick={() => setValueEvent(item?.value)}
                  key={index}
                  className={`${
                    item.value === valueEvent
                      ? "text-gray-700 underline"
                      : "text-blue-500"
                  } text-sm hover:underline`}
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="w-[75%]">
          {links.map((item, index) =>
            valueEvent === item.value ? <item.element key={index} data={item.data} /> : ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
