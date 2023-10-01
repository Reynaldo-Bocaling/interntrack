import React, { useState } from "react";
import Modal from "../Modals/Modal";
import { useForm } from "@mantine/form";
import axios from "axios";
import {
  TextInput,
  Group,
  ActionIcon,
  Box,
  Text,
  Button,
  NumberInput,
} from "@mantine/core";

import { Input } from "@nextui-org/react";

import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { IMaskInput } from "react-imask";

const AddTrainer = (props) => {
  const { closeModal, isOpen, onAddCompany } = props;
  
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
      <Group mt="xs">
        {/* <TextInput
            placeholder={`Area Assignment ${index + 1}`}
            withAsterisk
            className="w-[270px] mt-2"
            {...form.getInputProps(`available_positions.${index}.position`)}
          /> */}
        <Input
          type="text"
          label={`Area Assignment ${index + 1}`}
          name="firstname"
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
      </Group>
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("available_positions", index)}
      >
        <IconTrash size="1.3rem" />
      </ActionIcon>
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
      {isOpen && (
        <Modal
          title={"Add New Company"}
          size=""
          closeModal={closeModal}
          content={
            <div className="p-5">
              <form
                onSubmit={handleSubmit}
                className="flex items-start gap-5 px-5"
              >
                <div className="border-r pr-12 mr-5 w-[350px] flex flex-col gap-5">
                  <Input
                    type="text"
                    label="Company Name"
                    name="firstname"
                    onChange={(e) => setCompanyName(e.target.value)}
                    size="sm"
                    isRequired
                  />
                  <Input
                    type="text"
                    label="Address"
                    name="firstname"
                    onChange={(e) => setAddress(e.target.value)}
                    size="sm"
                    isRequired
                  />
                  <Input
                    type="text"
                    label="Email"
                    name="firstname"
                    onChange={(e) => setEmail(e.target.value)}
                    size="sm"
                    isRequired
                  />
                  <Input
                    type="text"
                    label="First Name"
                    name="firstname"
                    onChange={(e) => setContact(e.target.value)}
                    size="sm"
                    isRequired
                  />
                  <div className="mt-3">
                    <input
                      type="file"
                      onChange={(e) => setMoa(e.target.files[0])}
                    />
                  </div>
                  <input
                    className="mt-7 text-sm font-medium tracking-wide text-white bg-blue-500 rounded-md py-2 w-full"
                    type="submit"
                  />
                  
                </div>

                {/* available posotions */}
                <Box maw={500} mx="auto">
                  {fields.length > 0 ? (
                    <Group mb="xs">
                      <span className="font-medium text-lg">
                        Area of assignment
                      </span>
                    </Group>
                  ) : (
                    <Text color="dimmed" align="center">
                      No one here...
                    </Text>
                  )}

                  {fields}

                  <Button
                    className="bg-blue-500 mt-5"
                    onClick={() =>
                      form.insertListItem("available_positions", {
                        position: "",
                        slot: "",
                        key: randomId(),
                      })
                    }
                  >
                    Add Area
                  </Button>
                </Box>
              </form>
            </div>
          }
        />
      )}
    </>
  );
};

export default AddTrainer;
