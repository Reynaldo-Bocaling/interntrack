import React from "react";
import Logo from "../../assets/icons/logo.png";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="relative z-50">
      <nav
        className={`flex items-center justify-between py-6  `}
      >
        <div className="flex items-center gap-1">
          <img src={Logo} alt="" className="w-8 h-8" />
          <div className="text-[1.2rem] font-semibold">InternTrack</div>
        </div>
        <ul className="flex items-center gap-4 text-gary-800">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Features</li>
          <li>Contact</li>
        </ul>

        <Button
          color="primary"
          size="sms"
          className=" rounded-full font-medium px-5 shadow-2xl shadow-blue-300"
          onClick={()=> navigate('/')}
        >
          Sign in
        </Button>
      </nav>
    </div>
  );
}

export default Navbar;
