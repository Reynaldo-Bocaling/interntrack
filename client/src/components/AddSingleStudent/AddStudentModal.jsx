import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { getDateRange, getStudentList } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import WarningIcon from "../../assets/images/warning.png";

const AddSingStudent = ({
  onSubmit,
  AddIsOpen,
  AddOnClose,
  handleAddStudent,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    contact: 0,
    address: "",
    major: "",
    gender: "",
  });

  const [emailAlready, setEmailAlready] = useState(false)
  const {data} = useQuery({
    queryKey: 'getEmail',
    queryFn: getStudentList
  })
  const { data: dateRange } = useQuery({
    queryKey: "getDateRange",
    queryFn: getDateRange,
  });

  const Emails = data?.map(({ email }) => email.toLowerCase());

  const [errors, setErrors] = useState({});

  const firstnameRegex = /^[A-Za-z\s]+$/;
  const lastnameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  const mobileRegex = /^[0-9]/;
  const addressRegex = /^[A-Za-z\s]+$/;
  const genderRegex = /^(male|female)$/i;
  const majorRegex = /^[A-Za-z\s]+$/;

  const validateField = (name, value) => {
    switch (name) {
      case "firstname":
        return firstnameRegex.test(value);
      case "lastname":
        return lastnameRegex.test(value);
      case "email":
        return emailRegex.test(value);
      case "contact":
        return mobileRegex.test(value);
      case "address":
        return addressRegex.test(value);
      case "major":
        return majorRegex.test(value);
      case "gender":
        return genderRegex.test(value.toLowerCase());
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const error = validateField(name, value)
      ? null
      : "Please enter a valid input";
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const isFormValid = Object.values(errors).every((error) => error === null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(Emails.includes(formData?.email)) {
      setEmailAlready(true)
    }
    else if (isFormValid) {
      handleAddStudent(formData);
    }
  };


 console.log(',',Emails);

  return (
    <>
      <Modal
        isOpen={AddIsOpen}
        onOpenChange={AddOnClose}
        placement="top-center"
        className="max-w-[800px]"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-base font-semibold flex flex-col gap-1">
                Add Student Form
              </ModalHeader>
              <ModalBody>
                {dateRange.length > 0 ? (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 py-4 px-2"
                  >
                    <div className="flex items-center gap-4">
                      <Input
                        type="text"
                        label="First Name"
                        name="firstname"
                        onChange={handleChange}
                        size="sm"
                        isRequired
                        className="w-[40%]"
                        errorMessage={errors.firstname}
                      />

                      <Input
                        type="text"
                        label="Last Name"
                        name="lastname"
                        onChange={handleChange}
                        size="sm"
                        isRequired
                        className="w-[40%]"
                        errorMessage={errors.lastname}
                      />

                      <Input
                        type="text"
                        label={
                          <p>
                            MI{" "}
                            <span className="text-[#a8a9a9]">(Optional)</span>
                          </p>
                        }
                        name="middlename"
                        onChange={handleChange}
                        size="sm"
                        className="w-[20%]"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Input
                        type="text"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        size="sm"
                        isRequired
                        className="w-[60%]"
                        errorMessage={errors.email ? errors.email : emailAlready ? 'Email is already exist':''}
                      />

                      <Input
                        type="number"
                        label="Contact no."
                        name="contact"
                        onChange={handleChange}
                        size="sm"
                        isRequired
                        className="w-[40%]"
                        errorMessage={errors.contact}
                      />
                    </div>

                    <div className="flex items-end gap-12">
                      <Input
                        type="text"
                        label="Address"
                        name="address"
                        onChange={handleChange}
                        size="sm"
                        isRequired
                        className="w-[60%]"
                        errorMessage={errors.address}
                      />

                      <RadioGroup
                        label="Sex"
                        orientation="horizontal"
                        name="gender"
                        onChange={handleChange}
                        value={formData.gender}
                      >
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female</Radio>
                      </RadioGroup>
                    </div>

                    <Input
                      type="text"
                      label="Major"
                      name="major"
                      onChange={handleChange}
                      size="sm"
                      isRequired
                      className="w-[40%]"
                      errorMessage={errors.major}
                    />

                    <div className="mt-5 mb-2 flex items-center gap-3 justify-end">
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={AddOnClose}
                        className="font-medium tracking-wide px-2"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        isRequired
                        color="primary"
                        className="font-medium tracking-wide px-8"
                        disabled={!isFormValid}
                      >
                        {isLoading ? "Loading..." : "Submit"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="h-full w-full flex flex-col justify-start items-center gap-5 pt-5 pb-10">
                    <img src={WarningIcon} className="h-16 w-16" />
                    <p className="text-gray-400 tracking-wider font-light text-sm">
                      Before you can import or add students, please set up the
                      date range. Click{" "}
                      <Link
                        to="/Settings"
                        className="text-blue-500 underline mx-2"
                      >
                        'Go to Settings'
                      </Link>{" "}
                      and then 'Set Date Range' to specify the date range for
                      generating student timesheets.
                    </p>
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSingStudent;
