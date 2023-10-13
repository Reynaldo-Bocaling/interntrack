import React, { useEffect, useState } from "react";
import Img from "../assets/icons/logo.png";
import { AiOutlineUser } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import { Input, Button } from "@nextui-org/react";
import model from "../assets/images/LogInModel.png";
import unlockIcon from "../assets/images/unlock-vector-icon.jpg";
import { Link } from "react-router-dom";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import CheckIcon from "../assets/images/check.png";
import heart from "../assets/images/heart.png";
import like from "../assets/images/like.png";
import wow from "../assets/images/wow2.png";
import { useMutation, useQuery } from "@tanstack/react-query";
import { auth } from "../api/Api";
import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import Swal from "sweetalert2";


const Login = () => {
  const icon = <IconInfoCircle />;

  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { mutate, isLoading } = useMutation({
    mutationFn: auth,
    onSuccess: (data) => {
      if (data == "Success") {
        window.location.reload();
      } else {
        setError(data);
      }
    },
  });

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleOnchage = (e) => {
    e.preventDefault();
    const { value, name } = e.target;

    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div className="w-screen h-screen bg-white">
      <div className="shadow-effect relative max-w-[1224px] mx-auto min-h-screen flex items-center">
        <div className="absolute top-7 left-7 z-30 flex items-center gap-2">
          <img src={Img} alt="" className="w-[35px]" />
          <span className="text-xl font-semibold">InternTrack</span>
        </div>
        <div className="relative w-[55%] flex items-center justify-center mr-10">
          <img src={model} alt="" className="max-w-[380px] z-20" />

          {/* total box */}
          <div className="absolute -bottom-7 left-16 max-w-[160px] w-full bg-white rounded-lg flex flex-col items-center gap-3 shadow-md py-4 px-2 z-20 shadow-slate-200 border border-slate-200">
            <div className="shadow-lg shadow-slate-200 rounded-full p-3">
              <AiOutlineUser size={25} className="text-violet-500" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <small>STUDENTS</small>
              <h1 className="font-semibold">10+</h1>
              <AvatarGroup isBordered max={3} total={10}>
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                />
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                />
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                />
              </AvatarGroup>
            </div>
          </div>

          <img
            src={heart}
            alt=""
            className="absolute right-28 bottom-16 max-w-[50px]"
          />
          <img
            src={like}
            alt=""
            className="absolute right-10 bottom-32 max-w-[50px]"
          />
          <img
            src={wow}
            alt=""
            className="absolute right-20 bottom-56 max-w-[45px]"
          />

          {/* top right */}
          <div className="absolute top-32 -right-3 max-w-[300px] bg-white rounded-lg shadow-sm shadow-slate-200 border border-slate-200 pr-5 pl-2 py-3 z-20 flex items-center gap-2">
            <img src={CheckIcon} alt="" className="w-[40px]" />
            <span className="font-semibold">
              Start Your Adventure with InternTrack.
            </span>
          </div>

          {/* bottom */}
          <div className="absolute -bottom-7 right-16   bg-white rounded-lg shadow-lg shadow-slate-200 border border-slate-200 pr-5 pl-2 py-3 z-20 flex items-center gap-2">
            <img src={unlockIcon} alt="" className="w-[40px]" />
            <span className="font-semibold">Unlock Opportunities</span>
          </div>

          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 z-1 h-[300px] w-[300px] bg-blue-500 shadow-2xl shadow-blue-300 rounded-[40px] rotate-45 "></div>
          <div className="absolute left-32 top-32 z-1 h-[40px] -rotate-45 w-[100px] bg-yellow-500  shadow-2xl shadow-yellow-300 rounded-full "></div>
        </div>

        <div className=" w-[45%] h-screen  flex items-center justify-center">
          <div className="max-w-[400px] w-full flex flex-col p-5 gap-3">
            <span className="font-semibold text-2xl tracking-tight">
              Welcome back!
            </span>
            <small className="text-sm text-gray-500 mb-3 tracking-wide">
              Begin Enhancing Your OJT Experience Efficiently
            </small>

            {error && (
              <Alert
                variant="light"
                radius="md"
                title="Login failed"
                icon={icon}
                style={{
                  position: "relative",
                  width: "100%",
                  background: "rgba(255, 0, 1, 0.1)",
                  color: "red",
                }}
                className="swing-animation"
              >
                <span>{error ? error : ""}</span>

                <button
                  className="absolute top-3 right-3"
                  onClick={() => setError("")}
                >
                  <LiaTimesSolid className="text-red-500" size={16} />
                </button>
              </Alert>
            )}

            <div className=" flex flex-col gap-4">
              <Input
                type="email"
                label="Email"
                name="username"
                onChange={handleOnchage}
              />

              <Input
                type={isVisible ? "text" : "password"}
                label="Password"
                name="password"
                onChange={handleOnchage}
                endContent={
                  <button
                    className="focus:outline-none mr-2 text-gray-500"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {!isVisible ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                  </button>
                }
              />

              <div className="flex justify-end">
                <Link className="text-sm text-blue-500 font-semibold">
                  Forgot password
                </Link>
              </div>
              <Button
                onClick={handleLogin}
                color="primary"
                size="lg"
                className="font-medium tracking-wide"
              >
                {isLoading ? "Loading..." : "Sign in"}
              </Button>
            </div>

            <footer className="absolute bottom-5 right-15">
              <p className="text-sm text-gary-500 text-center tracking-wider pb-1">
                &copy; 2023{" "}
                <Link
                  to="/"
                  className="font-semibold text-black hover:underline"
                >
                  InternTrack
                </Link>
                . All Rights Reserved.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
