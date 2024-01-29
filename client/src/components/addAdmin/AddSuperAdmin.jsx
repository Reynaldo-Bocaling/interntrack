import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { addAdminAccount } from "../../api/Api";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
function AddAdmin() {
  const [formData, setFormatData] = useState({
    firstname: "",
    // middlename: "",
    lastname: "",
    email: "",
    contact: "",
  });

  // State to store validation errors
  const [errors, setErrors] = useState({
    firstname: null,
    // middlename: null,
    lastname: null,
    email: null,
    contact: null,
  });

  const { mutate, isLoading } = useMutation(addAdminAccount, {
    onSuccess: () => {
      Swal.fire("Success", "The Super admin has been added", "success");
    },
    onError: () => {
      Swal.fire(
        "Error",
        "There was an issue adding the Super admin. \n Please check the information provided and try again.",
        "error"
      );
    },
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    // Real-time validation using regular expressions
    const validationError =
      name === "email"
        ? !/^\S+@\S+\.\S+$/.test(value)
        : name === "contact"
        ? !/^\d+$/.test(value)
        : name === "firstname" || name === "middlename" || name === "lastname"
        ? !/^[A-Za-z\s]+$/.test(value)
        : null;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationError ? `${name} is invalid` : null,
    }));

    setFormatData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Check if there are any validation errors
    if (Object.values(errors).every((error) => error === null)) {
      mutate(formData);
    } else {
      // Handle validation errors
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 p-2">
      <Input
        type="text"
        label="Firstname"
        name="firstname"
        onChange={handleChange}
        className="w-full"
        errorMessage={errors.firstname}
        isRequired
      />
      {/* <Input
        type="text"
        label="Middlename"
        name="middlename"
        onChange={handleChange}
        className="w-full"
        errorMessage={errors.middlename}
        required
      /> */}
      <Input
        type="text"
        label="Lastname"
        name="lastname"
        onChange={handleChange}
        className="w-full"
        errorMessage={errors.lastname}
        isRequired
      />
      <Input
        type="text"
        label="Email"
        name="email"
        onChange={handleChange}
        className="w-full"
        errorMessage={errors.email}
        isRequired
      />
      <Input
        type="text"
        label="Contact"
        name="contact"
        onChange={handleChange}
        className="w-full"
        errorMessage={errors.contact}
        isRequired
      />
      <Button 
      type="button"
      color="primary"  
      isDisabled={isLoading}
      onClick={handleSubmit}
      >
        {isLoading ? "Processing..." : "Submit"}
      </Button>
    </div>
  );
}

export default AddAdmin;