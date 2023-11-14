import React, { useState } from "react";
import {
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function AddDirector({ submit, AddIsOpen, AddOnClose }) {
  const [formData, setFormatData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormatData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => submit(formData);

  const handleLogout = () => {
    const { data, isError, isLoading } = useQuery({
      queryKey: ["logout"],
      queryFn: logout,
    });

    if (data && data.Status === "success") {
      alert("success");
    } else {
      alert("errror logout");
    }
  };

  return (
    <div>
      <Modal isOpen={AddIsOpen} onOpenChange={AddOnClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>

              <ModalBody>
                <Input
                  type="text"
                  label="Firstname"
                  name="firstname"
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  label="Middlename"
                  name="middlename"
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  label="Lastname"
                  name="lastname"
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  label="Email"
                  name="email"
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  label="Contact"
                  name="contact"
                  onChange={handleChange}
                />
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddDirector;
