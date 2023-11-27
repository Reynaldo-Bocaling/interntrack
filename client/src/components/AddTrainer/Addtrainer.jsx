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

const AddTrainer = ({
  companies,
  onSubmit,
  AddIsOpen,
  AddOnClose,
  isLoading,
}) => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const [formData, setFormData] = useState({
    area_id: selectedArea,
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    contact: "",
  });

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
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const contactRegex = /^\d+$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    switch (name) {
      case "firstname":
      case "lastname":
      case "middlename":
        return nameRegex.test(value) ? null : "Please enter a valid name";
      case "email":
        return emailRegex.test(value) ? null : "Please enter a valid email";
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

    // Check if there are any errors
    if (Object.values(errors).every((error) => error === null)) {
      const selectedAreaId = { area_id: selectedArea };
      onSubmit({ ...formData, ...selectedAreaId });
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
                Add Trainer Form
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 py-4 px-2"
                >
                  <div className="flex items-center gap-4">
                    <Select
                      items={companies ? companies : []}
                      onChange={handleCompanyChange}
                      label="Select Company"
                      className="max-w-[280px]"
                      size="sm"
                      isRequired
                    >
                      {(companies) => (
                        <SelectItem key={companies.id}>
                          {`${companies.companyName} (${companies.address} )`}
                        </SelectItem>
                      )}
                    </Select>

                    <Select
                      onChange={handleAreaAssignChange}
                      items={findAreaList && findAreaList}
                      name="area_id"
                      label="Select Area"
                      className="max-w-[280px]"
                      size="sm"
                      isRequired
                      isDisabled={!selectedCompany}
                    >
                      {(item) => (
                        <SelectItem key={item.id}>{item.areaName}</SelectItem>
                      )}
                    </Select>
                  </div>
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
                          MI <span className="text-[#a8a9a9]">(Optional)</span>
                        </p>
                      }
                      name="middlename"
                      onChange={handleChange}
                      size="sm"
                      className="w-[20%]"
                      errorMessage={errors.middlename}
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
                      errorMessage={errors.email}
                    />
                    <Input
                      type="text"
                      label="Contact no."
                      name="contact"
                      onChange={handleChange}
                      size="sm"
                      isRequired
                      className="w-[40%]"
                      errorMessage={errors.contact}
                    />
                  </div>

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
                      disabled={
                        !Object.values(errors).every((error) => error === null)
                      }
                    >
                      {isLoading ? "Loading..." : "Submit"}
                    </Button>
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

export default AddTrainer;
