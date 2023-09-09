import React, { useState } from "react";
import PieChart from "../../components/charts/PieChart";
import { RiAttachment2 } from "react-icons/ri";
import { useForm } from "@mantine/form";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  TextInput,
  FileButton,
  Input,
  Group,
  ActionIcon,
  Box,
  Text,
  Button,
  Code,
  NumberInput,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { IMaskInput } from "react-imask";
import { useLocation } from "react-router-dom";

const StudentIfo = () => {
 const location = useLocation();
 const companyInfo = location.state
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ito ang bahagi kung paano mo ipapasa ang data sa server o iba pang bahagi ng iyong sistema.
    console.log(formData);
  };
  const [file, setFile] = useState("");

  const percentage = 70;

  return (
    <div>
      <div className="flex px-5 bg-slate-50 w-full">
        <div className="flex items-start gap-7 w-full">
          <div className="mt-1 flex flex-col gap-5 max-w-full w-full">
            <small className=" text-gray-400 tracking-wider">
              Company Information
            </small>
            <form
              onSubmit={handleSubmit}
              className="flex items-start gap-5 p-1  w-full"
            >
              <div className="mr-5 w-1/2 bg-white p-5 py-7 rounded-lg shadow-md shadow-slate-200">
                <div className="">
                  <TextInput
                    placeholder="Enter Company Name"
                    label="Company Name"
                    value={companyInfo.companyName}
                    labelProps={{
                      className: "mb-2 ",
                    }}
                    size="md"
                  />
                </div>

                {/* <div className="flex flex-col gap-3 mb-3 mt-7">
                      <label> Company name </label>
                      <input
                        type="text"
                        name="companyName"
                        className="border border-slate-400 h-10 w-[300px] rounded-md pl-3"
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                    </div> */}

                <div className="mt-3">
                  <TextInput
                    placeholder="Enter Address"
                    label=" Address"
                    value={companyInfo.Address}
                    labelProps={{
                      className: "mb-2 ",
                    }}
                    size="md"
                  />
                </div>

                <div className="mt-3">
                  <TextInput
                    placeholder="Enter Email Address"
                    label="Email Address"
                    value={companyInfo.Email}
                    labelProps={{
                      className: "mb-2 ",
                    }}
                    size="md"
                  />
                </div>

                <div className="mt-3 mb-5">
                  <Input.Wrapper label="Contact Number">
                    <Input
                      component={IMaskInput}
                      mask="+63 000 000-0000"
                      placeholder="Ex. 9xx xxx-xxxx"
                      size="md"
                      // value={companyInfo.Contact}
                    />
                  </Input.Wrapper>
                </div>

                {/* <div className="mt-3">
                   <Group position="center" className="bg-slate-400 rounded-lg">
                      <FileButton
                        onChange={setFile}
                        accept="image/png,image/jpeg"
                      >
                        {(props) => <Button {...props}><RiAttachment2 /> Upload MOA</Button>}
                      </FileButton>
                    </Group>

                    {file && (
                      <Text size="sm" align="center" mt="sm">
                        Picked file: {file.name}
                      </Text>
                    )}
                  </div> */}

                <div className="flex items-center gap-5 border-slate-100 pt-2">
                <button
                  type="button"
                  className=" text-sm font-medium tracking-wide text-white bg-blue-500 rounded-md py-2 w-full"
                  onClick={() => {
                    alert("Success"), closeModal();
                  }}
                >
                  Update Changes
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 text-sm font-medium tracking-wid bg-red-100 text-red-500 rounded-md py-2 w-full"
                  onClick={() => {
                    alert("Success"), closeModal();
                  }}
                >
                  <IconTrash size="1rem" />
                  <p>Delete</p>
                </button>
                </div>
              </div>

              <div className="relative w-1/2 h-[300px] bg-green-50 shadow-2xl shadow-green-50 flex flex-col items-center justify-center gap-5">
                  <p className="mt-4 text-center text-2xl font-semibold tracking-wide">
                    Completion Rate
                  </p>
                  <div className="w-48">
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      styles={{
                        path: { stroke: `#20D117` },
                        text: { fill: `#333`,fontSize: `1rem`, fontWeight:600 }, 
                      }}
                    />
                  </div>

                  <div className="absolute w-full -bottom-24 flex justify-between ">
                    <div className="w-1/2 h-[70px] flex gap-2 flex-col justify-center items-center border-r border-green-400">
                      <span className="text-2xl font-medium">{percentage}%</span>
                      <p className="text-sm text-gray-600 tracking-wider">OJT Done</p>
                    </div>

                    <div className="w-1/2 h-[70px] flex gap-2 flex-col justify-center items-center border-r border-green-400">
                      <span className="text-2xl font-medium">{100-percentage}%</span>
                      <p className="text-sm text-gray-600 tracking-wider">OJT Ongoing</p>
                    </div>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentIfo;
