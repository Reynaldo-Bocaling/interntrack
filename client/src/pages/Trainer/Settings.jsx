import React, { useState } from "react";
import Information from "../../components/user-Settings/Information";
import ChangePassword from "../../components/user-Settings/ChangePassword";
import SetUpDate from "../../components/user-Settings/SetupDates";
import { MdKeyboardArrowRight } from "react-icons/md";
import { getTrainer } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";

function Settings() {
  const [valueEvent, setValueEvent] = useState(1);

  const { data } = useQuery({
    queryKey: ["getTrainerInfo"],
    queryFn: getTrainer,
  });

  const infoData = [
    {
      label: "Name",
      value: `${data?.firstname} ${data?.lastname}`,
    },
    {
      label: "Email",
      value: data?.email,
    },
    {
      label: "Contact",
      value: data?.contact,
    },
  ];

  const links = [
    {
      label: "Personal Information ",
      url: "/Settings/",
      value: 1,
      element: Information,
      data: infoData,
    },
    {
      label: "Change password ",
      url: "/Settings/change-password",
      value: 2,
      element: ChangePassword,
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
        <div className="mt-9 w-[25%] flex flex-col gap-3 items-start">
          {links.map((item, index) => (
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
          ))}
        </div>

        <div className="w-[75%]">
          {links.map((item, index) =>
            valueEvent === item.value ? <item.element data={item.data} /> : ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
