import React, { useEffect, useState } from "react";
import Empty from "../../assets/images/emptyProfile.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  sidebarToggle,
  notificationToggle,
  profileToggle,
} from "../../store/Store";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { BiHelpCircle } from "react-icons/bi";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiArrowRightSLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownFill } from "react-icons/ri";
import { BsDot } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { getUser, logout } from "../../api/Api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Drawer, Button, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Avatar } from "@nextui-org/react";

function Header(props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [dataValue, setDataValue] = useState(null);

  const { isOpenSidebar, setIsOpenSidebar } = sidebarToggle();

  const { data: getUserData } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  const navigate = useNavigate();
  const { toggleProfile, isOpenProfile, role } = props;

  const capitalizeFirstLetter = (string) => {
    if (string && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return string;
    }
  };

  // logout
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/");
      window.location.reload();
    },
    onError: () => {},
  });

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#49A6F3",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate();
      }
    });

    const content = Array(100)
      .fill(0)
      .map((_, index) => <p key={index}>Drawer with scroll</p>);
  };

  const data = getUserData ? getUserData : {};

  useEffect(() => {
    if (data?.role === "Director") {
      setDataValue(data.director);
    } else if (data?.role === "Coordinator") {
      setDataValue(data?.coordinator);
    } else if (data?.role === "Teacher") {
      setDataValue(data?.teacher);
    } else if (data?.role === "Trainer") {
      setDataValue(data?.trainer);
    } else if (data?.role === "SuperAdmin") {
      setDataValue(data?.superadmin);
    }
  }, [data]);

  const user = dataValue
    ? dataValue.map(({ id, firstname, lastname, profile_url }) => ({
        id,
        name: `${firstname} ${lastname}`,
        url: profile_url,
      }))[0]
    : [];

  return (
    <div
      className={`fixed top-0 left-0 h-[60px] max-w-full w-full duration-300 z-20 bg-white shadow-sm shadow-slate-100`}
    >
      <div className="p-3 pt-3  flex items-center justify-between px-7 w-full lg:pl-[17.5rem]">
        <button onClick={setIsOpenSidebar} className="lg:hidden">
          <HiOutlineMenuAlt4 size={27} />
        </button>

        <div className="text-[1rem] font-normal hidden lg:flex">
          Welcome back,{" "}
          <span className="font-medium tracking-wide pl-2">
            {capitalizeFirstLetter(role)}
          </span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div
            className="relative flex items-center gap-4 cursor-pointer p-1"
            onClick={open}
          >
            <div>
              <IoNotificationsOutline size={20} className="text-blue-500" />
              <BsDot
                size={23}
                className="absolute -top-1 -right-1 text-red-500"
              />
            </div>
          </div>

          <div
            className="relative h-fit w-fit rounded-full bg-white shadow-lg p- "
            onClick={toggleProfile}
          >
            <Avatar
              src={user?.url ? user?.url : Empty}
              className="cursor-pointer w-8 h-8 shadow-md"
            />
            <RiArrowDropDownFill
              size={20}
              className="text-blue-500 absolute top-1/3 -right-4 -translate-y-1/2"
            />

            <Drawer
              opened={opened}
              onClose={close}
              title={
                <span className="text-lg font-semibold">Notifications</span>
              }
              scrollAreaComponent={ScrollArea.Autosize}
              position="right"
            >
              <div className="flex flex-col gap-3">
                <div className="bg-gray-50 p-3 rounded-lg border-b flex gap-3">
                  <IoNotificationsOutline size={30} className="text-blue-500" />
                  <div>
                    <small className="text-xs text-gray-500 capitalize">
                      Dear {role},
                    </small>
                    <div>
                      <span className="font-semibold">Added Successfully</span>
                      <p className="mt-2 text-sm text-gray-500 font-light tracking-wide">
                        We area pleased to inform you that you have been added
                        to the InternTrack system as a {role}. Your role in
                        overseeing OJT matters is now active.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Drawer>

            {isOpenProfile && (
              <div className="absolute top-[50px] right-1 w-[270px] flex flex-col gap-2 rounded-l-xl rounded-br-xl bg-white shadow-lg py-5 px-5">
                <div className="flex items-center gap-2 cursor-pointer mb-5 border-b pb-3">
                  <Avatar
                    src={user?.url ? user?.url : Empty}
                    className="cursor-pointer w-8 h-8 shadow-md mr-2"
                  />
                  <div className="flex flex-col">
                    <span className=" tracking-wider font-medium">
                      {user?.name}
                    </span>
                    <small className="text-blue-500 tracking-wide font-medium">
                      {role}
                    </small>
                  </div>
                </div>

                {/* row2 */}
                <NavLink
                  to="/MyProfile"
                  className="flex items-center justify-between cursor-pointer py-2 px-2 rounded-lg hover:text-blue-500"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-blue-500 p-1 bg-blue-100 rounded-full">
                      <CgProfile size={20} />
                    </div>
                    <span className="text-sm">Personal Information</span>
                  </div>
                  <RiArrowRightSLine />
                </NavLink>

                <div className="flex items-center justify-between cursor-pointer py-2 px-2 rounded-lg hover:text-blue-500">
                  <div className="flex items-center gap-2">
                    <div className="text-blue-500 p-1 bg-blue-100 rounded-full">
                      <BiHelpCircle size={20} />
                    </div>
                    <span className="text-sm">Help</span>
                  </div>
                  <RiArrowRightSLine />
                </div>

                <Link
                  to="/Settings"
                  className="flex items-center justify-between cursor-pointer py-2 px-2 rounded-lg hover:text-blue-500"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-blue-500 p-1 bg-blue-100 rounded-full">
                      <FiSettings size={20} />
                    </div>
                    <span className="text-sm">Settings</span>
                  </div>
                  <RiArrowRightSLine />
                </Link>

                <div
                  onClick={handleLogout}
                  className="flex items-center justify-between cursor-pointer py-2 px-2 rounded-lg mt-3 hover:text-red-500 hover:bg-red-50"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-red-500 p-1 bg-red-100 rounded-full">
                      <LiaSignOutAltSolid size={20} />
                    </div>
                    <span className="text-sm textgray-500">Sign out</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
