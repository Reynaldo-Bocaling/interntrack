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
} from "@nextui-org/react";

import { getCampus, getCoordinatorList } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";

const AddCoordinator = ({ onSubmit, AddIsOpen, AddOnClose, isLoading }) => {
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);

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

  const campus = CampusList;
  const college = selectedCampus
    ? campus.find((college) => college.id === parseInt(selectedCampus))
    : [];
  const program = selectedCollege
    ? college.college.find(
        (program) => program.id === parseInt(selectedCollege)
      )
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
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const contactRegex = /^\d+$/;

    switch (name) {
      case "firstname":
      case "lastname":
      case "middlename":
        return nameRegex.test(value)
          ? null
          : "Please enter a valid name";
      case "email":
        return emailRegex.test(value)
          ? null
          : "Please enter a valid email";
      case "contact":
        return contactRegex.test(value)
          ? null
          : "Please enter a valid contact number";
      default:
        return null;
    }
  };

  const {
    data: coordinatorList,
    isLoading: coordinatorLoading,
    isError: coordinatoryError,
  } = useQuery({
    queryKey: ["director_getCoordinatorList"],
    queryFn: getCoordinatorList,
  });



  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if there are any errors
    if (Object.values(errors).every((error) => error === null)) {
      const campus = {
        campus: college.campus_Location,
        college: program.college_description,
        program: selectedProgram,
      };
      onSubmit({ ...formData, ...campus });
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
                Add Coordinator Form
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 py-4 px-2"
                >
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <Input
                      type="text"
                      label="First Name"
                      name="firstname"
                      onChange={handleChange}
                      size="sm"
                      isRequired
                      className="w-full md:w-[40%]"
                      errorMessage={errors.firstname}
                    />

                    <Input
                      type="text"
                      label="Last Name"
                      name="lastname"
                      onChange={handleChange}
                      size="sm"
                      isRequired
                      className="w-full md:w-[40%]"
                      errorMessage={errors.lastname}
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
                      className="w-full md:w-[20%]"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <Input
                      type="text"
                      label="Email"
                      name="email"
                      onChange={handleChange}
                      size="sm"
                      isRequired
                      className="w-full md:w-[60%]"
                      errorMessage={errors.email}
                      isInvalid={errors.email || coordinatorList?.some((item) => item.email === formData.email)}
                    />
                    <Input
                      type="number"
                      label="Contact no."
                      name="contact"
                      onChange={handleChange}
                      size="sm"
                      isRequired
                      className="w-full md:w-[40%]"
                      errorMessage={errors.contact}
                    />
                  </div>

                  <div className="flex flex-col  md:flex-row items-center gap-3">
                    <Select
                      label="Campus"
                      className="w-full md:max-w-xs"
                      size="sm"
                      isRequired
                      onChange={handleCampusChange}
                    >
                      {campus &&
                        campus.map(({ id, campus_Location }) => (
                          <SelectItem key={id}>{campus_Location}</SelectItem>
                        ))}
                    </Select>

                    <Select
                      label=" College"
                      className="w-full md:max-w-xs"
                      size="sm"
                      isRequired
                      onChange={handleCollegeChange}
                      isDisabled={!selectedCampus}
                    >
                      {selectedCampus &&
                        college.college.map(({ id, college_description }) => (
                          <SelectItem key={id}>
                            {college_description}
                          </SelectItem>
                        ))}
                    </Select>

                    <Select
                      label=" Program"
                      className="w-full md:max-w-xs"
                      size="sm"
                      isRequired
                      onChange={handleProgramChange}
                      isDisabled={!selectedCollege}
                    >
                      {selectedCollege &&
                        program.program.map(({ program_description }) => (
                          <SelectItem key={program_description}>
                            {program_description}
                          </SelectItem>
                        ))}
                    </Select>
                  </div>

                  <div className=" flex items-center justify-between">
                    {coordinatorList?.some(
                      (item) => item.email === formData.email
                    ) ? (
                      <small className="text-red-500 text-xs ">
                        Sorry, that email address is already taken.
                      </small>
                    ): <div> </div>}

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
                        color="primary"
                        className="font-medium tracking-wide px-8"
                        isDisabled={isLoading ||coordinatorList?.some((item) => item.email === formData.email)}
                      >
                        {isLoading ? "Processing..." : "Submit"}
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

export default AddCoordinator;
