import React, { useState } from "react";
import {
  Switch,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/Api";

import ClipLoader from "react-spinners/ClipLoader";


const AddTrainer = ({
  companies,
  onSubmit,
  AddIsOpen,
  AddOnClose,
  isLoading,
  trainerList,
}) => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [toggleAddSelf, setToggleAddSelf] = useState(false);

  const [formData, setFormData] = useState({
    area_id: selectedArea,
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    contact: "",
  });

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: getUser,
  });

  const data = user ?? [];
  const coordinator = data?.coordinator?.[0] || {};
  const teacher = data?.teacher?.[0] || {};

  const [errors, setErrors] = useState({});

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
    const contactRegex = /^\d+$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    switch (name) {
      case "firstname":
      case "lastname":
      case "middlename":
        return nameRegex.test(value) ? null : "Please enter a valid name";
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
      const selectedAreaId = { area_id: selectedArea };
      const toggleButton = { isToggle: toggleAddSelf };
      onSubmit({ ...formData, ...selectedAreaId, ...toggleButton });
    }
  };

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
    setSelectedArea("");
  };

  const handleAreaAssignChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const findAreaList = selectedCompany
    ? companies.find(({ id }) => id === parseInt(selectedCompany))
        ?.areaOfAssignment
    : [];

  const handleTry = () => {
    setToggleAddSelf(!toggleAddSelf);

    if (toggleAddSelf) {
      setFormData({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        contact: "",
      });
    } else {
      setFormData({
        firstname: coordinator?.firstname ?? teacher?.firstname,
        middlename: coordinator?.middlename ?? teacher?.middlename,
        lastname: coordinator?.lastname ?? teacher?.lastname,
        email: coordinator?.email ?? teacher?.email,
        contact: coordinator?.contact ?? teacher?.contact,
      });
    }
  };

  return (
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
              Add Trainer Form
            </ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 py-4 px-2"
              >
                <div className="flex  flex-col md:flex-row items-center gap-4">
                  <Select
                    items={companies || []}
                    onChange={handleCompanyChange}
                    label="Select Company"
                    className="w-full md:max-w-[280px]"
                    size="sm"
                    isRequired
                  >
                    {(company) => (
                      <SelectItem key={company.id}>
                        {`${company.companyName} (${company.address})`}
                      </SelectItem>
                    )}
                  </Select>

                  <Select
                    onChange={handleAreaAssignChange}
                    items={findAreaList || []}
                    name="area_id"
                    label="Select Area"
                    className="w-full md:max-w-[280px]"
                    size="sm"
                    isRequired
                    isDisabled={!selectedCompany}
                  >
                    {(item) => (
                      <SelectItem key={item.id}>{item.areaName}</SelectItem>
                    )}
                  </Select>
                </div>
                <div className="flex  flex-col md:flex-row items-center gap-4">
                  <Input
                    type="text"
                    label="First Name"
                    name="firstname"
                    onChange={handleChange}
                    size="sm"
                    isRequired
                    className="w-full md:w-[40%]"
                    errorMessage={errors.firstname}
                    value={formData.firstname}
                    isDisabled={toggleAddSelf}
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
                    value={formData.lastname}
                    isDisabled={toggleAddSelf}
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
                    className="w-full md:w-[20%]"
                    errorMessage={errors.middlename}
                    value={formData.middlename}
                    isDisabled={toggleAddSelf}
                  />
                </div>
                <div className="flex  flex-col md:flex-row items-center gap-4">
                  <div className="relative w-full md:w-[60%]">
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
                      isDisabled={toggleAddSelf}
                      isInvalid={trainerList.some((item) => item.email === formData.email)}
                    />

                    {trainerList.some(
                      (item) => item.email === formData.email
                    ) && (
                      <small className="text-red-500 text-xs absolute -bottom-5">
                        Sorry, that email address is already taken.
                      </small>
                    )}
                  </div>

                  <Input
                    type="text"
                    label="Contact no."
                    name="contact"
                    onChange={handleChange}
                    size="sm"
                    isRequired
                    className="w-full md:w-[40%]"
                    errorMessage={errors.contact}
                    value={formData.contact}
                    isDisabled={toggleAddSelf}
                  />
                </div>

                <div className="mt-5 mb-2 flex items-center gap-3 justify-between">
                  {userLoading ? (
                    <small className="flex items-center gap-3 text-gray-400">
                      Loading <ClipLoader color="#3683d6" size={19} />
                    </small>
                  ) : (
                    <Switch
                      isSelected={toggleAddSelf}
                      onValueChange={handleTry}
                      isDisabled={trainerList.some(
                        (item) => item.email === data?.username
                      )}
                    >
                      <div className="flex flex-col gap-0">
                        <small className="text-gray-400 tracking-wide">
                          Add me as Trainer
                        </small>

                        {trainerList.some(
                          (item) => item.email === data?.username
                        ) && (
                          <small className="text-red-500 text-xs">
                            You have already added this trainer
                          </small>
                        )}
                      </div>
                    </Switch>
                  )}

                  <div className="flex items-center gap-3">
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
                        trainerList.some((item) => item.email === formData.email)
                        || isLoading
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
  );
};

export default AddTrainer;
