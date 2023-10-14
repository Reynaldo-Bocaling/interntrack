import React, { lazy, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import Sidebar from "./common/Sidebar";
import StudentHeader from "./common/StudentHeader";
import Header from "./common/Header";
import Footer from "./common/Footer";
import StudentNavigate from "./common/StudentNavigation";

const Rootlayout = (props) => {
  const { role } = props;
  const [isOpen, setIsOpen] = useState(true);
  const [opened, { open, close }] = useDisclosure(false); //MESSAGE
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
    <>
      {role !== "Unauthorized" && (
        <div>
          {role !== "student" ? (
            <div>
              <Header
                toggleIsOpen={isOpen}
                toggleNotif={toggleNotif}
                toggleProfile={toggleProfile}
                isOpenNotif={isOpenNotif}
                isOpenProfile={isOpenProfile}
                role={role}
              />

              <Sidebar
                toggleIsOpen={isOpen}
                toggleSetIsOpen={toggleIsOpen}
                role={role}
              />
            </div>
          ) : (
            <div>
              <StudentHeader isOpen={open} />
              <StudentNavigate />
            </div>
          )}

          <div
            className={`${
              role !== "student" && "ml-[16rem]"
            } min-h-screen px-4  pt-20 pb-6 duration-300 bg-slate-50`}
            onClick={() => {
              setIsOpenNotif(false), setIsOpenProfile(false);
            }}
          >
            <Drawer
              position="right"
              size="80%"
              opened={opened}
              onClose={close}
              title={
                <header className="mt-2">
                  <span className="text-xl font-semibold">Menu</span>
                </header>
              }
            ></Drawer>

            <Outlet />
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default Rootlayout;
