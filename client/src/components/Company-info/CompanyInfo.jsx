import React, { useEffect, useState } from "react";
import PieChart from "../../components/charts/PieChart";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BiEditAlt } from "react-icons/bi";

import { Input, Button } from "@nextui-org/react";

import { IconTrash } from "@tabler/icons-react";
import { getCampus, getStudentList } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";

const CompanyInfo = ({ data }) => {
  const [Editable, setEditable] = useState(false);

  const [companyInfo, setCompanyInfo] = useState(data);

  const [file, setFile] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCompanyInfo({ ...companyInfo, [name]: value });
  };

  useEffect(() => {
    setCompanyInfo(data);
  }, [data]);

  const handleEditable = (e) => {
    e.preventDefault();
    setEditable(!Editable);
  };

  const { data: StudentList, isLoading: studentLoading } = useQuery({
    queryKey: ["getStudentList33"],
    queryFn: getStudentList,
  });

  const { data: getProgram, isLoading: programLoading } = useQuery({
    queryKey: ["getProgram"],
    queryFn: getCampus,
  });

  const programList = getProgram
    ? getProgram
        .flatMap(({ college }) => college?.flatMap(({ program }) => program))
        .map(({ trainingHours, program_description }) => ({
          trainingHours,
          program_description,
        }))
    : [];

  const totalAllHoursStudent = StudentList
    ? StudentList.filter((item) => item.deletedStatus === 0)
        .map(
          ({ program }) =>
            programList.find((item) => item.program_description === program)
              ?.trainingHours
        )
        .reduce((total, item) => total + item, 0)
    : [];

  const totalHoursStudent = StudentList
    ? StudentList.flatMap(({ timesheet }) => timesheet)
        .filter((item) => item.logStatus === 1)
        .reduce((total, item) => total + item.totalHours, 0)
    : [];

  const percentage = Math.floor(
    (Math.round(totalHoursStudent) / totalAllHoursStudent) * 100
  );

  if (studentLoading) return <center className="my-5 ">Computing...</center>;

  return (
    <div>
      <div className="flex px-5 bg-slate-50 w-full">
        <div className="flex items-start gap-7 w-full">
          <div className="mt-1 flex flex-col gap-5 max-w-full w-full">
            <small className=" text-gray-400 tracking-wider">
              Company Information
            </small>
            <form className=" flex items-start gap-5 p-1  w-full">
              <div className="relative mr-5 w-1/2 grid gap-4 bg-white p-5 py-7 rounded-lg shadow-md shadow-slate-200">
                <Input
                  type="text"
                  value={companyInfo.companyName || ""}
                  name="companyName"
                  onChange={handleChange}
                  variant="underlined"
                  label="Company Name"
                  isDisabled={!Editable}
                />

                <Input
                  type="text"
                  value={companyInfo.address || ""}
                  variant={"underlined"}
                  label="Address"
                  isDisabled={!Editable}
                />

                <Input
                  type="text"
                  value={companyInfo.email || ""}
                  variant={"underlined"}
                  label="Email"
                  isDisabled={!Editable}
                />

                <Input
                  type="number"
                  value={companyInfo.contact || ""}
                  variant={"underlined"}
                  label="Contact Number"
                  isDisabled={!Editable}
                />

                <button
                  className="absolute top-3 right-3 flex items-center gap-2 rounded-full py-2 px-5 border text-blue-500 text-xs font-medium overflow-hidden"
                  onClick={handleEditable}
                >
                  {!Editable ? (
                    <>
                      Edit <BiEditAlt />{" "}
                    </>
                  ) : (
                    <span className="text-red-500">Cancel</span>
                  )}
                </button>

                {Editable && (
                  <Button className="bg-blue-500 text-white font-medium tracking-wide">
                    Save Changes
                  </Button>
                )}
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
                      text: { fill: `#333`, fontSize: `1rem`, fontWeight: 600 },
                    }}
                  />
                </div>

                <div className="absolute w-full -bottom-24 flex justify-between ">
                  <div className="w-1/2 h-[70px] flex gap-2 flex-col justify-center items-center border-r border-green-400">
                    <span className="text-2xl font-medium">{percentage}%</span>
                    <p className="text-sm text-gray-600 tracking-wider">
                      OJT Done
                    </p>
                  </div>

                  <div className="w-1/2 h-[70px] flex gap-2 flex-col justify-center items-center border-r border-green-400">
                    <span className="text-2xl font-medium">
                      {100 - percentage}%
                    </span>
                    <p className="text-sm text-gray-600 tracking-wider">
                      OJT Ongoing
                    </p>
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

export default CompanyInfo;
