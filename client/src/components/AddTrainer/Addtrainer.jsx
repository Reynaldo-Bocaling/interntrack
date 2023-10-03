import React, { useState } from "react";
import { Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  Button, 
  Input ,
  Select, 
  SelectItem
} from "@nextui-org/react";

const AddTrainer = ({companies, onSubmit , AddIsOpen, AddOnClose   }) => {

      const [formData, setFormData] = useState({
        company_id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        contact: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        onSubmit(formData)
      }
   

      
  return (
    <>
      <Modal
        isOpen={AddIsOpen}
        onOpenChange={AddOnClose}
        placement="top-center"
        className="max-w-[800px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-base font-semibold flex flex-col gap-1">
                Add Trainer Form
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-4 px-2">
                  <Select onChange={handleChange} name="company_id" label="Slect Company" className="max-w-[280px]" size="sm" isRequired>
                    {
                      companies ?
                      companies.map(({companyName, id, address}) => (
                        <SelectItem key={id}  value={id}>
                          {`${companyName} (${address})`}
                        </SelectItem>
                      )): []
                    }
                   
                  </Select>
                  <div className="flex items-center gap-4">
                    <Input
                      type="text"
                      label="First Name"
                      name="firstname"
                      onChange={handleChange}
                      size="sm"
                      isRequired
                      className="w-[40%]"
                    />

                     <Input
                      type="text"
                      label="Last Name"
                      name="lastname"
                      onChange={handleChange}
                      size="sm"
                      isRequired
                      className="w-[40%]"
                    />

                    <Input
                      type="text"
                      label={<p>MI <span className="text-[#a8a9a9]">(Optional)</span></p>}
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
                    />
                    <Input
                      type="number"
                      label="Contact no."
                      name="contact"
                      onChange={handleChange}
                      size="sm"
                      isRequired
                      className="w-[40%]"
                    />
                  </div>
                  
                  <div className="mt-5 mb-2 flex items-center gap-3 justify-end">
                    <Button color="danger" variant="flat" onPress={AddOnClose} className="font-medium tracking-wide px-2">
                      Cancel
                    </Button>
                    <Button type="submit" color="primary" className="font-medium tracking-wide px-8">
                      Add Now
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
