import React, { Suspense, lazy, useState } from "react";
import { Outlet } from "react-router-dom";
const Sidebar = lazy(() => import("./common/Sidebar"));
const StudentHeader = lazy(() => import("./common/StudentHeader"));
const Header = lazy(() => import("./common/Header"));
const Footer = lazy(() => import("./common/Footer"));
const StudentNavigate = lazy(() => import("./common/StudentNavigation"));
const Notification = lazy(() =>
  import("../components/notification/Notification")
);

const Rootlayout = (props) => {
  const { role, data } = props;
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
    <>
      {role !== "Unauthorized" && (
        <div>
          {role === "Student" ? (
            <div>
              <Suspense fallback="Load Contact..">
                <StudentHeader />
                <StudentNavigate />
              </Suspense>
            </div>
          ) : (
            <div>
              <Suspense fallback="Load Contact..">
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
              </Suspense>
            </div>
          )}

          <Suspense fallback="Load Contact..">
            <Notification />
          </Suspense>

          <div
            className={`${
              role !== "Student" ? "lg:ml-[16rem]" : "lg:pl-[120px]"
            } min-h-screen px-4  pt-20 pb-6 duration-300 bg-slate-50 `}
            onClick={() => {
              setIsOpenNotif(false), setIsOpenProfile(false);
            }}
          >
            <Suspense fallback="Load Contact..">
              <Outlet />

              <Footer />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

export default Rootlayout;
