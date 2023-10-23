import React, { useEffect, useState } from "react";
import { Drawer } from "@mantine/core";
import { Input,Button } from "@nextui-org/react";

function Editinfo({ opened, onClose, info, handleSubmit,data }) {
  const [formValues, setFormValues] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(()=> {
    setFormValues(data)
  },[data])

  const handleClick = (e) => {
     e.preventDefault();
    handleSubmit(formValues)
  }

  return (
    <div>
      <Drawer
        position="bottom"
        size="100%"
        opened={opened}
        onClose={onClose}
        title={
          <header className="mt-2">
            <span className="text-xl font-semibold">Edit Info</span>
          </header>
        }
      >
        <form className="bg-white w-full h-full flex flex-col gap-4 px-3 py-5">
            <h1 className="font-semibold ">Personal Information</h1>
          {info?.map(({id, type, name, label}) => (
            <Input
            value={formValues && formValues[name]}
              key={id}
              type={type}
              label={label}
              name={name}
              onChange={handleChange}
            />
          ))}

          <Button onClick={handleClick} color="primary" className="mt-4 font-medium rounded-full" size="lg">Save changes</Button>
          <Button onClose={onClose} className="font-medium bg-[rgba(250,0,0,0.1)] text-red-500 mt-1 rounded-full" size="lg">Cancel</Button>
        </form>
      </Drawer>
    </div>
  );
}

export default Editinfo;
