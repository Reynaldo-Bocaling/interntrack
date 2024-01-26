import React from "react";
import { User } from "@nextui-org/react";
import { Drawer } from "@mantine/core";
// import pic from "../../assets/images/dp.png";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { RiArrowRightSLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { BiHelpCircle } from "react-icons/bi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TfiAnnouncement } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import { getStudent, logout } from "../../api/Api";
import Swal from "sweetalert2";
import{useNavigate} from 'react-router-dom'
// import {Avatar} from "@nextui-org/react";


const Profile = ({ opened, close }) => {
  const navigate = useNavigate();
  // logout
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await Swal.fire({
        icon: 'success',
        title: 'Logout Successful!',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/');
      window.location.reload();
    },
    onError: () => {},
  });
  
  const { data } = useQuery({
    queryKey: ["getstudentInfo"],
    queryFn: getStudent,
  });


  console.log('s', data);
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
  };

  return (
    <div>
      <Drawer
        position="right"
        size="85%"
        opened={opened}
        onClose={close}
        title={
          <header className="mt-2">
            <span className="text-xl font-semibold">Menu</span>
          </header>
        }
      >
        <div className="my-4 px-1">
          <User
            name={
              <p className="text-[1.1rem] font-medium tracking-wide mb-2 capitalize">
                {`${data?.firstname} ${data?.lastname}`}
              </p>
            }
            description="Student"
            avatarProps={{
              src: data?.profile_url,
              size: "md",
            }}
          />

          <div className="my-5" onClick={close}>
            <div className="flex items-center justify-between cursor-pointer py-2 px-2 rounded-lg hover:text-blue-500">
              <div className="flex items-center gap-2">
                <div className="text-blue-500 p-1 bg-blue-100 rounded-full">
                  <TfiAnnouncement size={16} />
                </div>
                <NavLink to="/Announcement" className="text-sm">
                  Announcements
                </NavLink>
              </div>
              <RiArrowRightSLine />
            </div>

            <div className="flex items-center justify-between cursor-pointer py-2 px-2 rounded-lg hover:text-blue-500">
              <div className="flex items-center gap-2">
                <div className="text-blue-500 p-1 bg-blue-100 rounded-full">
                  <BiHelpCircle size={20} />
                </div>
                <span className="text-sm">Help</span>
              </div>
              <RiArrowRightSLine />
            </div>

            <div className="flex items-center justify-between cursor-pointer py-2 px-2 rounded-lg hover:text-blue-500">
              <div className="flex items-center gap-2">
                <div className="text-blue-500 p-1 bg-blue-100 rounded-full">
                  <FiSettings size={20} />
                </div>
                <span className="text-sm">Settings</span>
              </div>
              <RiArrowRightSLine />
            </div>

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
        </div>
      </Drawer>
    </div>
  );
};

export default Profile;
