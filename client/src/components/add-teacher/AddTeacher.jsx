import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Select,
  Switch,
  SelectItem,
} from "@nextui-org/react";

import { getCampus } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";

const AddTeacher = ({ onSubmit, AddIsOpen, AddOnClose, isLoading, info , teacherList}) => {
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [majorList, setMajorList] = useState(null);
  const [togleAddSelf, setToggleAddSelf] = useState(false);

  const data = info ? info : {};
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});

  const { data: CampusList } = useQuery({
    queryKey: ["getCampus"],
    queryFn: getCampus,
  });


  console.log('info', info);
  const campus = CampusList ? CampusList : [];

  const college = selectedCampus
    ? campus.find((item) => item.campus_Location == selectedCampus)
    : [];

  const program = selectedCollege
    ? college?.college.find(
        (item) => item.college_description == selectedCollege
      )
    : [];
  const major = togleAddSelf
    ? majorList
    : selectedCollege
    ? program.program.find(
        (item) => item.program_description == selectedProgram
      )?.major
    : [];

  const handleCampusChange = (e) => {
    setSelectedCampus(e.target.value);
    setSelectedCollege(null);
    setSelectedProgram(null);
    setSelectedMajor(null);
  };

  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
    setSelectedProgram(null);
    setSelectedMajor(null);
  };

  const handleProgramChange = (e) => {
    setSelectedProgram(e.target.value);
    setSelectedMajor(null);
  };

  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const validateField = (name, value) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    // const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const contactRegex = /^\d+$/;

    
    switch (name) {
      case "firstname":
      case "lastname":
      case "middlename":
        return nameRegex.test(value) ? null : "Please enter a valid name";
      // case "email":
      //   if (!togleAddSelf && data?.email && data?.email.toLowerCase() === value.toLowerCase()) {
      //     return "Email is already taken";
      //   }else {
      //     return emailRegex.test(value) ? null : "Please enter a valid email";
      //   }
      case "contact":
        return contactRegex.test(value)
          ? null
          : "Please enter a valid contact number";
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(errors).every((error) => error === null)) {
      const campus = {
        campus: togleAddSelf ? data?.campus : college?.campus_Location,
        college: togleAddSelf ? data?.college : program?.college_description,
        // program: 'togleAddSelf ? data?.program : major?.program_description',
        program: 'BSIT',
        major: selectedMajor,
        isToggle:  togleAddSelf
      };

      const profileValue = {
        profile :  togleAddSelf ? data?.profile : '',
        profile_url :  togleAddSelf ? data?.profile_url : '',
      }
      onSubmit({ ...formData, ...campus,...profileValue });
      // console.log({ ...formData, ...campus });
    }
  };

  const handleTry = () => {
    setToggleAddSelf(!togleAddSelf);
    setErrors(false)
    if (togleAddSelf) {
      setSelectedCampus(null);
      setSelectedCollege(null);
      setSelectedProgram(null);
      setSelectedMajor(null);
      setMajorList(null);

      setFormData({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        contact: "",
      });
    } else {
      setFormData({
        firstname: data?.firstname,
        middlename: data?.middlename,
        lastname: data?.lastname,
        email: data?.email,
        contact: data?.contact,
      });

      setMajorList(
        campus
          .find((item) => item.campus_Location == data?.campus)
          ?.college.find((item) => item.college_description == data?.college)
          ?.program.find((item) => item.program_description == data?.program)
          ?.major
      );
    }
  };

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
                Add Teacher Form
              </ModalHeader>
              <ModalBody>
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
                      value={formData.firstname}
                      isDisabled={togleAddSelf}
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
                      value={formData.lastname}
                      isDisabled={togleAddSelf}
                    />

                    <Input
                      type="text"
                      label={
                        <p>
                          MI <span className="text-[#a8a9a9]">(Optional)</span>
                        </p>
                      }
                      name="middlename"
                      onChange={handleChange}
                      size="sm"
                      errorMessage={errors.middlename}
                      className="w-[20%]"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                  <div className="relative w-[60%]">
                    <Input
                      type="text"
                      label="Email"
                      name="email"
                      onChange={handleChange}
                      size="sm"
                      isRequired
                      className="w-[100%]"
                      errorMessage={errors.email}
                      value={formData.email}
                      isDisabled={togleAddSelf}
                    />

{
                      teacherList.some(item => item.email === formData.email) && (
                        <snall className="text-red-500 text-xs absolute -bottom-5">Sorry, that email address is already taken.</snall>
                      )
                    }
                    
                    </div>

                    <Input
                      type="text"
                      label="Contact no."
                      name="contact"
                      onChange={handleChange}
                      size="sm"
                      isRequired
                      className="w-[40%]"
                      errorMessage={errors.contact}
                      value={formData.contact}
                      isDisabled={togleAddSelf}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Select
                      label="Campus"
                      className="max-w-xs"
                      size="sm"
                      isRequired={!togleAddSelf}
                      onChange={handleCampusChange}
                      isDisabled={togleAddSelf}
                    >
                      {campus &&
                        campus.map(({ id, campus_Location }) => (
                          <SelectItem key={campus_Location}>
                            {campus_Location}
                          </SelectItem>
                        ))}
                    </Select>

                    <Select
                      label=" College"
                      className="max-w-xs"
                      size="sm"
                      isRequired={!togleAddSelf}
                      onChange={handleCollegeChange}
                      isDisabled={!selectedCampus}
                    >
                      {selectedCampus &&
                        college.college.map(({ id, college_description }) => (
                          <SelectItem key={college_description}>
                            {college_description}
                          </SelectItem>
                        ))}
                    </Select>

                    <Select
                      label=" Program"
                      className="max-w-xs"
                      size="sm"
                      isRequired={!togleAddSelf}
                      onChange={handleProgramChange}
                      // isDisabled={!selectedCollege}
                    >
                      {selectedCollege &&
                        program.program.map(({ id, program_description }) => (
                          <SelectItem key={program_description}>
                            {program_description}
                          </SelectItem>
                        ))}
                    </Select>

                    <Select
                      label="Major"
                      className="max-w-xs"
                      size="sm"
                      isRequired={!togleAddSelf}
                      onChange={handleMajorChange}
                    >
                      {major?.map(({ major_description }) => (
                        <SelectItem key={major_description}>
                          {major_description}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div className="mt-5 mb-2 flex items-center gap-3 justify-between">
                    <Switch isSelected={togleAddSelf} onValueChange={handleTry} isDisabled={teacherList.some(item => item.email === info?.email)}>
                    <div  className="flex flex-col gap-0">
                     <small className="text-gray-400 tracking-wide">
                        Add me as Trainer
                      </small>

                      {
                      teacherList.some(item => item.email === info?.email) && (
                        <snall className="text-red-500 text-xs">You have already added this teacher</snall>
                      )
                    }

                     </div>
                    </Switch>

                    <div className=" flex items-center gap-3">
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
                        color="primary"
                        className="font-medium tracking-wide px-8"
                        disabled={
                          !Object.values(errors).every(
                            (error) => error === null
                          ) ||  
                          teacherList.some(item => item.email === formData.email)

                        }
                      >
                        {isLoading ? "Loading..." : "Submit"}
                      </Button>
                    </div>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTeacher;
