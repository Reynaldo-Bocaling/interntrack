import React, { lazy, Suspense, useState } from "react";
import { Outlet } from "react-router-dom";

const LazySidebar = lazy(() => import("./common/Sidebar"));
const LazyStudentHeader = lazy(() => import("./common/StudentHeader"));
const LazyHeader = lazy(() => import("./common/Header"));
const LazyFooter = lazy(() => import("./common/Footer"));
const LazyStudentNavigate = lazy(() => import("./common/StudentNavigation"));
const LazyNotification = lazy(() => import("../components/notification/Notification"));

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
      {role !== "Unauthorized" && (
        <div>
          {role === "Student" ? (
            <>
            {/* <Suspense fallback={<div>Load Header</div>}> */}
              <LazyStudentHeader />
              {/* </Suspense> */}
              
              {/* <Suspense fallback={<div>Load Navigation</div>}> */}
              <LazyStudentNavigate />
              {/* </Suspense> */}
            </>
            
            
          ) : (
            // <Suspense fallback={<div>Load Header</div>}>
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
             
            // </Suspense>
          )}

          <Suspense fallback={<div>Load Notifications</div>}>
            <LazyNotification />
          </Suspense>

          <div
            className={`${
              role !== "Student" ? "lg:ml-[16rem]" : "lg:pl-[120px]"
            } min-h-screen px-4  pt-20 pb-6 duration-300 bg-slate-50 `}
            onClick={() => {
              setIsOpenNotif(false), setIsOpenProfile(false);
            }}
          >

<Suspense fallback={<div>Load Content, Please wait</div>}>
<Outlet />
</Suspense>
           
            {/* <Suspense fallback={<div>Load Footer</div>}> */}
              <LazyFooter />
            {/* </Suspense> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rootlayout;
