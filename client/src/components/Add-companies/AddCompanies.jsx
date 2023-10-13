import React, { useState } from "react";
import { Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  Button, 
  Input ,
  Tooltip
} from "@nextui-org/react";
import{ AiOutlineCloudUpload} from 'react-icons/ai'
import{ BiCheck} from 'react-icons/bi'
import { IconTrash } from "@tabler/icons-react";
import { randomId } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {NumberInput} from "@mantine/core";

const CustomModal = ({onAddCompany , AddIsOpen, AddOnClose , isLoading  }) => {

      const [Moa, setMoa] = useState("");
      const [CompanyName, setCompanyName] = useState("");
      const [Address, setAddress] = useState("");
      const [Email, setEmail] = useState("");
      const [Contact, setContact] = useState("");
    
      const form = useForm({
        initialValues: {
          available_positions: [{ position: "", slot: "", key: randomId() }],
        },
      });

      const fields = form.values.available_positions.map((item, index) => (
        <div key={item.key} className="flex items-center gap-3">
            {/* <TextInput
                placeholder={`Area Assignment ${index + 1}`}
                withAsterisk
                className="w-[270px] mt-2"
                {...form.getInputProps(`available_positions.${index}.position`)}
              /> */}
            <Input
              type="text"
              label={`Area Assignment ${index + 1} `}
              onChange={(e) => setCompanyName(e.target.value)}
              size="sm"
              isRequired
              className="w-[270px]"
              {...form.getInputProps(`available_positions.${index}.position`)}
            />
    
            <NumberInput
              defaultValue={80}
              step={5}
              min={0}
              size="md"
              className="w-[100px]"
              placeholder="Slot"
              {...form.getInputProps(`available_positions.${index}.slot`)}
            />
          <button
            className="text-red-500"
            onClick={() => form.removeListItem("available_positions", index)}
          >
            <IconTrash size="1.3rem" />
          </button>
        </div>
      ));




      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("pdfFile", Moa);
        formData.append("companyName", CompanyName);
        formData.append("address", Address);
        formData.append("email", Email);
        formData.append("contact", Contact);
    
        // area of assignmnet
        formData.append(
          "available_positions",
          JSON.stringify(form.values.available_positions)
        );
    
        onAddCompany(formData);
        // console.log('form', formData);
      };
   
  return (
    <>
      <Modal
        isOpen={AddIsOpen}
        onOpenChange={AddOnClose}
        placement="top-center"
        className="max-w-[900px] h-[570px] overflow-y-auto"
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
                className="flex items-start gap-5 px-5"
              >
                <div className="border-r pr-12 mr-5 w-[350px] flex flex-col gap-5">
                <span className="font-medium text-lg">
                  Company Info
                </span>
                  <Input
                    type="text"
                    label="Company Name "
                    onChange={(e) => setCompanyName(e.target.value)}
                    size="sm"
                    isRequired
                  />
                  <Input
                    type="text"
                    label="Address "
                    onChange={(e) => setAddress(e.target.value)}
                    size="sm"
                    isRequired
                  />
                  <Input
                    type="text"
                    label="Email "
                    onChange={(e) => setEmail(e.target.value)}
                    size="sm"
                    isRequired
                  />
                  <Input
                    type="number"
                    label="Contact # "
                    onChange={(e) => setContact(e.target.value)}
                    size="sm"
                    isRequired
                  />

                  <Tooltip content="Browse PDF file" closeDelay={0}>  
                    <button className=" uploadMoa   relative overflow-hidden text-sm  w-full flex flex-col items-center justify-center gap-2">
                      {
                        Moa ? <BiCheck  size={30} className="addCompanyCheck text-green-500"/> : <AiOutlineCloudUpload  size={30} className=" addCompanyCheck text-[#7057fc]"/>
                      }
                    <span className="text-base "> Upload Moa</span>
                      <input
                          type="file"
                          onChange={(e) => setMoa(e.target.files[0])}
                          className="absolute scale-[3] opacity-0 cursor-pointer"
                        />
                    </button>
                  </Tooltip>
                  
                   <Button
                    className="text-sm text-white font-medium tracking-wide bg-blue-500 mt-1"
                    type="submit"
                  >
                    { 
                      isLoading  ? "Loading..." : "Submit"
                     }
                  </Button>
                  
                  
                </div>

                {/* available posotions */}
                <div>
                  {fields.length > 0 ? (
                    <div>
                      <span className="font-medium text-lg">
                        Area of assignment
                      </span>
                    </div>
                  ) : (
                    <h1 color="dimmed" align="center">
                      No one here...
                    </h1>
                  )}

                  <div className="flex flex-col gap-4 mt-5">
                    {fields}
                  </div>

                  <Button
                    className="text-white font-medium tracking-wide bg-blue-500 mt-5"
                    onClick={() =>
                      form.insertListItem("available_positions", {
                        position: "",
                        slot: "",
                        key: randomId(),
                      })
                    }
                  >
                    Add Row
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

export default CustomModal;
