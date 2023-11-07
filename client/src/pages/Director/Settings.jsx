import React, { useState } from "react";
import Information from "../../components/user-Settings/Information";
import ChangePassword from "../../components/user-Settings/ChangePassword";
import Campus from "../../components/user-Settings/Campus";
import College from "../../components/user-Settings/College";
import Program from "../../components/user-Settings/Program";
import Major from "../../components/user-Settings/Major";
import { MdKeyboardArrowRight } from "react-icons/md";
import { getDirector } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function Settings() {
  const [valueEvent, setValueEvent] = useState(1);

  const { data } = useQuery({
    queryKey: ["getDirectorInfo"],
    queryFn: getDirector,
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
      id: 1,
      label: "Personal Information ",
      value: 1,
      element: Information,
      data: infoData,
      extraText: "Personal Data",
    },
    {
      id: 2,
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
      id: 4,
      label: "Add campus ",
      value: 3,
      element: Campus,
      extraText: "Adding Capuses",
    },
    {
      id: 5,
      label: "Add college ",
      value: 4,
      element: College,
    },
    {
      id: 6,
      label: "Add program ",
      value: 5,
      element: Program,
    },
    {
      id: 7,
      label: "Add major ",
      value: 6,
      element: Major,
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

      <div className="flex gap-4 w-full">
        <div className="mt-7 w-[25%] flex flex-col gap-3 items-start">
          {links.map((item, index) => (
            <div key={index}>
              {item.extraText && (
                <small className="text-[0.68rem] text-gray-400 mt-5 block">
                  {item.extraText}
                </small>
              )}

              {item.url && (
                <Link to={item.url} className="text-blue-500 text-sm hover:underline">
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
            valueEvent === item.value ? (
              <item.element key={item.id} data={item.data} />
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
