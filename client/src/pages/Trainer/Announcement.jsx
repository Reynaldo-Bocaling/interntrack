import { format } from "date-fns";
import React, { useState } from "react";
import { Tabs } from "@mantine/core";
import { FaUsersRays } from "react-icons/fa6";
import { TfiAnnouncement } from "react-icons/tfi";
import { createAnnouncement, getAnnouncement, getTrainer } from "../../api/Api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Textarea,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const Announcement = () => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: getAnnouncementList, isLoading: announcementLoading } =
    useQuery({
      queryKey: ["trainer_getAnnouncement"],
      queryFn: getAnnouncement,
    });
  const { data: trainer, isLoading: trainerLoading } = useQuery({
    queryKey: ["trainer_trainer"],
    queryFn: getTrainer,
  });

  const announcementList = getAnnouncementList ? getAnnouncementList : [];
  const trainer_id = trainer?.id;

  const student_ids = trainer
    ? trainer.student
        .map(({ id }) => id)
    : "";

  // create
  const [values, setValues] = useState({
    title: "",
    description: "",
    selectedOptions: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleMultiSelectChange = (selected) => {
    setValues({
      ...values,
      selectedOptions: selected,
    });
  };

  const { mutate } = useMutation(createAnnouncement, {
    onSuccess: () => {
      alert("success"), queryClient.invalidateQueries("trainer_getAnnouncement");
    },
    onError: () => alert("Error"),
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    mutate({
      id: trainer_id,
      title: values.title,
      description: values.description,
      student_ids,
      postedBy: `${trainer?.firstname} ${trainer?.lastname} ( Trainer )`
    });
  };

  const yourPost = announcementList
  .filter(item => item.trainer_id === trainer_id)
  .filter((item, index, self) =>  self.findIndex((el) => el.title === item.title && el.description === item.description) === index)

  // console.log(otherPost,'d');
  if (announcementLoading) return <center>Loading</center>;
  return (
    <div className="bg-white rounded-lg p-5 w-full">
      <div className="flex items-center justify-between pr-2">
        <h1 className="text-xl font-semibold tracking-wide text-gray-700">
          Announcement
        </h1>

        <Button
          onPress={onOpen}
          color="primary"
          className="font-medium tracking-wider rounded-full w-[120px]"
        >
          Create
        </Button>
      </div>

      <Tabs
        defaultValue="post"
        orientation="vertical"
        sx={{ marginTop: "40px", minHeight: "100vh" }}
      >
        <Tabs.List sx={{ width: "150px" }}>
          <Tabs.Tab
            value="post"
            sx={{
              color: "#999",
              fontSize: "17px",
              marginTop: "10px",
              letterSpacing: "0.9px",
            }}
          >
            Your post
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="post">
          <div className="flex flex-col gap-1 w-full">
            <p className="px-7 py-1 text-xl text-gray-500">Your post</p>
            {yourPost.length > 0 ? (
              yourPost.map((item, index) => (
                <div key={index} className="p-7 flex gap-4 border-b ">
                  <TfiAnnouncement size={25} className="text-gray-400" />
                  <div className="w-full">
                    <div className="flex items-center justify-between gap-2 mb-5 w-full">
                      <div className="flex gap-2">
                        <span className="font-semibold">{item.title}</span>
                        <small className="text-xs  py-1 px-3 rounded-full bg-[#f28837] text-white">
                          {format(new Date(), "MMMM dd, yyyy")}
                        </small>
                      </div>
                      <div className="text-sm text-[#828383] flex items-center gap-2">
                        <Button
                          onClick={() => alert(item.id)}
                          size="sm"
                          className="bg-red-100 text-red-500 font-medium"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-[#828383] text-justify">
                      {item.description}
                    </p>

                    <div className="mt-7 flex items-center justify-between">
                      <button className="text-blue-500 font-medium tracking-wide">
                        View
                      </button>

                      <small className="flex items-center gap-3 text-[#828383]">
                        <FaUsersRays size={20} />
                        {item.postedBy}
                      </small>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <center>No Announcemnet</center>
            )}
          </div>
        </Tabs.Panel>
      </Tabs>

      <Modal
        isOpen={isOpen}
        className="max-w-[550px] w-full p-3"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Announcement
              </ModalHeader>
              <ModalBody>
                <div>
                  <form
                    onSubmit={handleSubmit}
                    className="pb-7 flex flex-col gap-3"
                  >
                    <div>
                      <Input
                        label="Title"
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Textarea
                        label="Description"
                        type="text"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                      />
                    </div>

                    <Button
                      color="primary"
                      size="lg"
                      className="w-full rounded-full mt-5"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Announcement;
