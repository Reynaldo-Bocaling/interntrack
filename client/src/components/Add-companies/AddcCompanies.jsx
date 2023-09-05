import React, { useState } from "react";
import Modal from "../Modals/Modal";
import {RiAttachment2} from 'react-icons/ri'
import { useForm } from "@mantine/form";
import {
  TextInput,
  FileButton,
  Input,
  Group,
  ActionIcon,
  Box,
  Text,
  Button,
  Code,
  NumberInput,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { IMaskInput } from "react-imask";

const AddTrainer = (props) => {
  const { closeModal, isOpen } = props;
  const [file, setFile] = useState('');

  const form = useForm({
    initialValues: {
      available_positions: [{ position: "", slot: "", key: randomId() }],
    },
  });

  const fields = form.values.available_positions.map((item, index) => (
    <div key={item.key} className="flex items-end gap-3">
      <Group mt="xs">
        <div>
          <TextInput
            placeholder={`Position ${index + 1}`}
            withAsterisk
            className="w-[270px] mt-2"
            {...form.getInputProps(`available_positions.${index}.position`)}
          />
        </div>
        <div>
          <NumberInput
            defaultValue={80}
            step={5}
            min={0}
            className="w-[100px] mt-2"
            placeholder="Slot"
            {...form.getInputProps(`available_positions.${index}.slot`)}
          />
        </div>
      </Group>
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("available_positions", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </div>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ito ang bahagi kung paano mo ipapasa ang data sa server o iba pang bahagi ng iyong sistema.
    console.log(formData);
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
                <div className="border-r pr-12 mr-5 w-[350px]">
                <span className="font-medium text-lg">Company Details</span>
                  <div className="mt-5">
                  <TextInput
                    placeholder="Enter Company Name"
                    label="Company Name"
                    withAsterisk
                    labelProps={{
                      className: "mb-2 ",
                    }}
                  />
                  </div>

                  {/* <div className="flex flex-col gap-3 mb-3 mt-7">
                      <label> Company name </label>
                      <input
                        type="text"
                        name="companyName"
                        className="border border-slate-400 h-10 w-[300px] rounded-md pl-3"
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                    </div> */}

                  <div className="mt-3">
                  <TextInput
                    placeholder="Enter Address"
                    label=" Address"
                    withAsterisk
                    labelProps={{
                      className: "mb-2 ",
                    }}
                  />
                  </div>

                  <div className="mt-3">
                  <TextInput
                    placeholder="Enter Email Address"
                    label="Email Address"
                    withAsterisk
                    labelProps={{
                      className: "mb-2 ",
                    }}
                  />
                  </div>

                  <div className="mt-3 mb-8">
                  <Input.Wrapper
                    label="Contact Number"
                    required
                    maw={320}
                    mx="auto"
                  >
                    <Input
                      component={IMaskInput}
                      mask="+63 000 000-0000"
                      placeholder="Ex. 9xx xxx-xxxx"
                    />
                  </Input.Wrapper>
                  </div>

                  <div className="mt-3">
                   <Group position="center" className="bg-slate-400 rounded-lg">
                      <FileButton
                        onChange={setFile}
                        accept="image/png,image/jpeg"
                      >
                        {(props) => <Button {...props}><RiAttachment2 /> Upload image</Button>}
                      </FileButton>
                    </Group>

                    {file && (
                      <Text size="sm" align="center" mt="sm">
                        Picked file: {file.name}
                      </Text>
                    )}
                  </div>

                  <button
                    type="button"
                    className="mt-12 text-sm font-medium tracking-wide text-white bg-blue-500 rounded-md py-2 w-full"
                    onClick={()=> {alert('Success'),closeModal() }}
                  >
                    Submit
                  </button>
                </div>

                {/* available posotions */}
                <Box maw={500} mx="auto">
                  

                  {fields.length > 0 ? (
                    <Group mb="xs">
                      <span className="font-medium text-lg">Positions Available</span>
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
                      Add Position
                    </Button>
                 

                  {/* <Text size="sm" weight={500} mt="md">
                    Form values:
                  </Text>
                  <Code block>{JSON.stringify(form.values, null, 2)}</Code> */}
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
