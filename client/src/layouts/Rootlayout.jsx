import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";
import StudentHeader from "./common/StudentHeader";
import Header from "./common/Header";
import Footer from "./common/Footer";
import StudentNavigate from "./common/StudentNavigation";
import Notification from "../components/notification/Notification";

const Rootlayout = (props) => {
  const { role,data } = props;
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
    <div className="overflow-hidden">
      {role !== "Unauthorized" && (
        <div>
          {role === "Student" ? (
            <div>
              <StudentHeader />
              <StudentNavigate />
            </div>
          ) : (
            <div>
              <Header
                toggleIsOpen={isOpen}
                toggleNotif={toggleNotif}
                toggleProfile={toggleProfile}
                isOpenNotif={isOpenNotif}
                isOpenProfile={isOpenProfile}
                role={role}
                data={data}
              />

              <Sidebar
                toggleIsOpen={isOpen}
                toggleSetIsOpen={toggleIsOpen}
                role={role}
              />
            </div>
          )}


          <Notification />


          <div
            className={`${
              role !== "Student" ? "lg:ml-[16rem]": 'lg:pl-[120px]'
            } min-h-screen px-4  pt-20 pb-6 duration-300 bg-slate-50 `}
            onClick={() => {
              setIsOpenNotif(false), setIsOpenProfile(false);
            }}
          >
            <Outlet />
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default Rootlayout;
