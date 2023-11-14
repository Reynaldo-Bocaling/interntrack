import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { Input, Button } from "@nextui-org/react";
const StudentIfo = ({ data }) => {
  const [teacherInfo, setTeacherInfo] = useState(data);
  const [Editable, setEditable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTeacherInfo({ ...teacherInfo, [name]: value });
  };

  useEffect(() => {
    setTeacherInfo(data);
  }, [data]);

  const handleEditable = (e) => {
    e.preventDefault();
    setEditable(!Editable);
  };

  return (
    <div className="bg-slate-50">
      <form className="flex flex-col gap-5 py-4 px-2">
        <div className="grid  gap-10 px-">
          <div className="p-5 grid gap-5 bg-white rounded-lg border">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold tracking-wide">Personal Info</h2>
                <button
                  className="flex items-center gap-2 rounded-full py-2 px-5 border text-blue-500 font-medium overflow-hidden"
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
              </div>
              <div className=" w-full grid gap-7">
                <div className="mt-5 flex items-center gap-10 max-w-full">
                  <Input
                    type="text"
                    value={teacherInfo.firstname || ""}
                    name="firstname"
                    onChange={handleChange}
                    variant="underlined"
                    label="Firstname"
                    isDisabled={!Editable}
                  />
                  <Input
                    type="text"
                    value={teacherInfo.lastname || ""}
                    name="lastname"
                    onChange={handleChange}
                    variant="underlined"
                    label="Lastname"
                    isDisabled={!Editable}
                  />
                  <Input
                    type="text"
                    value={teacherInfo.middlename || ""}
                    name="middlename"
                    onChange={handleChange}
                    variant="underlined"
                    label="MI"
                    isDisabled={!Editable}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Input
                    type="text"
                    value={teacherInfo.email || ""}
                    name="email"
                    onChange={handleChange}
                    variant="underlined"
                    label="Email"
                    isDisabled={!Editable}
                  />

                  <Input
                    type="number"
                    value={teacherInfo.contact || ""}
                    name="contact"
                    onChange={handleChange}
                    variant="underlined"
                    label="Contact"
                    isDisabled={!Editable}
                  />
                </div>

                <div className="p-5 grid gap-5 bg-white rounded-lg border">
                  <h2 className="font-semibold tracking-wide">
                    Educational Details
                  </h2>
                  <div className="mt-3 flex items-center gap-5">
                    <Input
                      type="text"
                      value={teacherInfo.campus || ""}
                      name="campus"
                      onChange={handleChange}
                      variant="underlined"
                      label="Contact"
                      isDisabled={!Editable}
                    />

                    <Input
                      type="text"
                      value={teacherInfo.college || ""}
                      name="college"
                      onChange={handleChange}
                      variant="underlined"
                      label="Contact"
                      isDisabled={!Editable}
                    />

                    <Input
                      type="text"
                      value={teacherInfo.program || ""}
                      name="program"
                      onChange={handleChange}
                      variant="underlined"
                      label="Contact"
                      isDisabled={!Editable}
                    />

                    <Input
                      type="text"
                      value={teacherInfo.major || ""}
                      name="major"
                      onChange={handleChange}
                      variant="underlined"
                      label="Contact"
                      isDisabled={!Editable}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 mb-2 flex items-center gap-3 justify-end">
          <Button
            type="submit"
            className={`${
              !Editable ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
            } font-medium tracking-wide px-8 text-white`}
            disabled={!Editable}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentIfo;
