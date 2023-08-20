import React, { lazy, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./common/Sidebar";
import Header from "./common/Header";
import Footer from "./common/Footer";

const Rootlayout = (props) => {
  const {role} = props;
  const [isOpen, setIsOpen] = useState(true);

  const [isOpenNotif, setIsOpenNotif] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const toggleNotif = () => {
    setIsOpenNotif(!isOpenNotif);
    setIsOpenProfile(false);
  };
  const toggleProfile = () => {
    setIsOpenProfile(!isOpenProfile);
    setIsOpenNotif(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-16-auto">
      <Sidebar toggleIsOpen={isOpen} toggleSetIsOpen={toggleIsOpen} role={role} />

      <div className="bg-gray-50">
        <Header
          toggleIsOpen={isOpen}
          toggleNotif={toggleNotif}
          toggleProfile={toggleProfile}
          isOpenNotif={isOpenNotif}
          isOpenProfile={isOpenProfile}
          role={role}
        />

        {/* main */}
        <div
          className={`${
            isOpen ? "ml-[16rem]" : "ml-[4rem]"
          } min-h-screen px-4  pt-20 pb-6 duration-300`}
          onClick={() => {
            setIsOpenNotif(false), setIsOpenProfile(false);
          }}
        >
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Rootlayout;
