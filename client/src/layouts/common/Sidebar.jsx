import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/icons/logo.png";
import { sidebarToggle } from "../../store/Store";
import { SidebarData } from "./SidebarLinks";

const Sidebar = (props) => {
  const { role } = props;
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { isOpenSidebar, setIsCloseSidebar } = sidebarToggle();

  const menu = SidebarData[role] || [];

  const handleSubmenu = (label) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const handleContainerClick = (e) => {
    if (e.target.classList.contains("sidebar-container")) {
      setIsCloseSidebar();
    }
  };

  return (
    <>
      {isOpenSidebar && (
        <div
          onClick={handleContainerClick}
          className="sidebar-container fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-40"
        ></div>
      )}

      <div
        className={`${
          isOpenSidebar
            ? "w-[20rem]  lg:w-[16rem] xl:w-[16rem]"
            : "w-0 lg:w-[16rem] xl:w-[16rem]"
        } sidebar fixed z-50 top-0 left-0 bg-white shadow-xl shadow-gray-100 pt-5 h-screen overflow-y-auto overflow-x-hidden duration-500 lg:flex lg:flex-col transition-all`}
      >
        <div className="flex flex-col items-center gap-2 mx-2 pb-2">
          <img src={Logo} alt="Logo icon" width={32} />
          <span className="font-semibold text-xl whitespace-pre">
            InternTrack
          </span>
        </div>

        <div className="mt-4 py-5 px-3 text-gray-700">
          <div className="flex flex-col gap-2 duration-700">
            {menu.map((item, index) => (
              <div key={index}>
                {item.subMenu ? (
                  <div
                    className={`rounded-lg ${
                      openSubmenu === item.label ? "bg-gray-50" : ""
                    }`}
                  >
                    <button
                      onClick={() => handleSubmenu(item.label)}
                      className="p-3 link hover:none flex justify-between w-full"
                    >
                      <span className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-md">
                          <item.icon
                            size={item.size}
                            className="text-blue-500"
                          />
                        </div>
                        {item.label}
                      </span>

                      <item.dropDownIcon
                        size={20}
                        className={openSubmenu === item.label && "rotate-180"}
                      />
                    </button>

                    {openSubmenu === item.label && (
                      <div className="px-5 ">
                        {item.subMenu.map((subItem, subIndex) => (
                          <NavLink
                            onClick={setIsCloseSidebar}
                            to={subItem.url}
                            key={subIndex}
                            className="link p-3 hover:bg-blue-50"
                          >
                            {subItem.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    onClick={setIsCloseSidebar}
                    to={item.url}
                    className="link p-3 hover:bg-blue-50"
                  >
                    <div className="bg-blue-50 p-2 rounded-md">
                      <item.icon size={item.size} className="text-blue-500" />
                    </div>
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
