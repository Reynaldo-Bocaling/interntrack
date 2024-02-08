import React, { Suspense, lazy, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
const Information = lazy(() => import("./Information"));
const Requirements = lazy(() => import("./Requirements"));
const Security = lazy(() => import("./Security"));
import { MdAlternateEmail } from "react-icons/md";
import {
  BsFillTelephoneFill,
} from "react-icons/bs";
import {
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { LiaUserEditSolid } from "react-icons/lia";
import { PiGenderMaleBold } from "react-icons/pi";
import { BiBookOpen, BiUserVoice } from "react-icons/bi";
import { FaRegBuilding } from "react-icons/fa";
import { DotLoading } from "../spinners-loading/Spinner";

function index({ data }) {
  const [value, setValue] = useState(0);

  const dataInfo = [
    {
      label: "Name",
      value: `${data?.firstname} ${data?.lastname}`,
      icon: LiaUserEditSolid,
      title: "Information",
    },
    {
      label: "Email",
      value: data?.email,
      icon: MdAlternateEmail,
    },
    {
      label: "Contact",
      value: data?.contact,
      icon: BsFillTelephoneFill,
    },
    {
      label: "Gender",
      value: data?.gender,
      icon: PiGenderMaleBold,
    },

    // education
    {
      label: "Program",
      value: data?.program,
      icon: BiBookOpen,
      title: "Education",
      style: "mt-7",
    },
    {
      label: "Major",
      value: data?.major,
      icon: BiBookOpen,
    },
    {
      label: "College",
      value: data?.college,
      icon: BiBookOpen,
    },
    {
      label: "Campus",
      value: data?.campus,
      icon: BiBookOpen,
    },

    // others
    {
      label: "Teacher",
      value: `${data?.teacher?.firstname} ${data?.teacher?.lastname}`,
      icon: AiOutlineUserSwitch,
      title: "Others",
      style: "mt-3",
    },
    {
      label: "Trainer",
      value: `${data?.trainer?.firstname} ${data?.trainer?.lastname}`,
      icon: BiUserVoice,
    },
    {
      label: "Company",
      value: data?.Company ? data?.Company : "",
      icon: FaRegBuilding,
    },
    {
      label: "Area Of Assignemnt",
      value: data?.AreaOfAssignment ? data?.AreaOfAssignment?.areaName : "",
      icon: FaRegBuilding,
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="my-5">
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          marginBottom: "20px",
        }}
      >
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Info" sx={{fontSize:'10px'}} />
          <Tab label="Security" sx={{fontSize:'10px'}} />
          <Tab label="Requirements" sx={{fontSize:'10px'}} />
        </Tabs>
      </Box>

      {value === 0 && <Information dataInfo={dataInfo} />}
      {value === 1 && (
        <Suspense fallback={<DotLoading />}>
          <Security data={data} />
        </Suspense>
      )}
      {value === 2 && (
        <Suspense fallback={<DotLoading />}>
          <Requirements />
        </Suspense>
      )}
    </div>
  );
}

export default index;
