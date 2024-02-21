import React, { lazy, Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { DotLoading } from "../components/spinners-loading/Spinner";

const LazySidebar = lazy(() => import("./common/Sidebar"));
const LazyStudentHeader = lazy(() => import("./common/StudentHeader"));
const LazyHeader = lazy(() => import("./common/Header"));
const LazyFooter = lazy(() => import("./common/Footer"));
const LazyStudentNavigate = lazy(() => import("./common/StudentNavigation"));
// const LazyNotification = lazy(() => import("../components/notification/Notification"));

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
    <div className="overflow-hidden">
      <div>
        {role === "Student" ? (
          <>
            <LazyStudentHeader />

            <LazyStudentNavigate />
          </>
        ) : (
          <>
            <LazyHeader
              toggleIsOpen={isOpen}
              toggleNotif={toggleNotif}
              toggleProfile={toggleProfile}
              isOpenNotif={isOpenNotif}
              isOpenProfile={isOpenProfile}
              role={role}
              data={data}
            />

            <LazySidebar
              toggleIsOpen={isOpen}
              toggleSetIsOpen={toggleIsOpen}
              role={role}
            />
          </>
        )}

        <div
          className={`${
            role !== "Student" ? "lg:ml-[16rem]" : "lg:max-w-[350px] lg:w-full lg:border lg:mx-auto"
          } min-h-screen px-4  pt-20 pb-6 duration-300 bg-white`}
          onClick={() => {
            setIsOpenNotif(false), setIsOpenProfile(false);
          }}
        >
          <Suspense fallback={<DotLoading />}>
            <Outlet />
          </Suspense>

          <LazyFooter />
        </div>
      </div>
    </div>
  );
};

export default Rootlayout;
