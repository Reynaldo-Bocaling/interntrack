import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { Input, Button } from "@nextui-org/react";

const Info = ({ data, InputTypes, handleSubmit, Editable, setEditable }) => {
  const [coordinatorInfo, setCoordinatorIndo] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCoordinatorIndo({ ...coordinatorInfo, [name]: value });
  };

  useEffect(() => {
    setCoordinatorIndo(data);
  }, [data]);

  const handleEditable = (e) => {
    e.preventDefault();
    setEditable(!Editable);
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit(coordinatorInfo);
  };

  return (
    <div className="bg-slate-50 w-full">
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
              <div className=" w-full grid grid-cols-3 gap-7">
                {InputTypes?.map(({ id, type, name, label }) => (
                  <Input
                    key={id}
                    type={type}
                    value={coordinatorInfo[name]}
                    name={name}
                    onChange={handleChange}
                    variant="underlined"
                    label={label}
                    isDisabled={!Editable}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 mb-2 flex items-center gap-3 justify-end">
          <Button
            onClick={handleClick}
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

export default Info;
