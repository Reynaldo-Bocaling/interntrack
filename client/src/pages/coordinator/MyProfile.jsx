import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsChatDots, BsCamera, BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineCloudUpload, AiOutlineUser } from "react-icons/ai";
import {
  getCoordinator,
  editCoordinatorProfile,
  updateCoordinatorProfilePicture,
} from "../../api/Api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import Info from "../../components/user-profile/Info";
import EmptyProfileIcon from "../../assets/images/emptyProfile.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";

const CoordinatorInfo = () => {
  const [Editable, setEditable] = useState(false);
  const [File, setFile] = useState(null);
  const [Preview, setPreview] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const loadingImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery(["getTeacher"], getCoordinator);

  const { mutate: editText } = useMutation(editCoordinatorProfile, {
    onSuccess: () => {
      Swal.fire("Success", "Update Successful", "success");
      queryClient.invalidateQueries("getTeacher");
      setEditable(false);
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Update Failed. Please check the information provided and try again.",
        "error"
      );
    },
  });

  const { mutate: editProfile } = useMutation(updateCoordinatorProfilePicture, {
    onSuccess: () => {
      Swal.fire("Success", "Update Successful", "success");
      queryClient.invalidateQueries("getTeacher");
      setEditable(false);
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Update Failed. Please check the information provided and try again.",
        "error"
      );
    },
  });

  const InputTypes = [
    { id: 0, type: "text", name: "firstname", label: "Firstname" },
    { id: 1, type: "text", name: "lastname", label: "Lastname" },
    { id: 2, type: "text", name: "middlename", label: "Middle Initial" },
    { id: 3, type: "text", name: "email", label: "Email" },
    { id: 4, type: "number", name: "contact", label: "Contact" },
    { id: 5, type: "text", name: "campus", label: "Campus" },
    { id: 6, type: "text", name: "college", label: "College" },
    { id: 7, type: "text", name: "program", label: "Program" },
  ];

  const handleSubmit = (item) => {
    editText(item);
  };

  const handleEditProfile = () => {
    const formData = new FormData();
    formData.append("image", File);
    editProfile(formData);
  };

  return (
    <div className="rounded-xl overflow-hidden -mt-3 -ml-2">
      {isLoading ? (
        <h1 className="text-center my-14 py-5 border rounded-lg">
          <PulseLoader
            color="#1892fc"
            margin={5}
            size={13}
            speedMultiplier={1}
            className="mx-auto"
          />
        </h1>
      ) : (
        <>
          <div className="cover"></div>

          <div className="flex flex-col gap-3 border-b bg-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="ml-7 -mt-48 bg-white w-44 h-44 p-5 border-white right rounded-full shadow-md overflow-hidden">
                  {data?.profile ? (
                    <img src={data.profile_url} alt={data.profile_url} />
                  ) : (
                    ""
                  )}
                </div>
                <button
                  onClick={onOpen}
                  className="absolute bottom-3 right-5 bg-gray-200 px-2 h-[35px] w-[35px] flex items-center justify-center rounded-full cursor-pointer"
                >
                  <BsCamera />
                </button>
              </div>

              <div className="left p-5 pl-5 w-full py-5">
                <div className="flex flex-col gap-5">
                  <div className="name">
                    <h1 className="text-2xl font-semibold tracking-wide">
                      {`${data && data.firstname} ${data && data.lastname}`}
                    </h1>
                    <small className="text-blue-500 font-semibold tracking-wider">
                      Teacher
                    </small>
                  </div>

                  <div className="flex items-center gap-5 mb-3 font-semibold">
                    <NavLink className="flex items-center gap-1 text-blue-500 text-sm bg-blue-100 py-2 px-4 rounded-md">
                      <BsChatDots />
                      Send message
                    </NavLink>
                    <NavLink className="flex items-center gap-1 text-red-500 text-sm bg-red-100 py-2 px-4 rounded-md">
                      <BsFillTrash3Fill />
                      Drop
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-7 -mt-5">
              <Info
                InputTypes={InputTypes}
                data={!isLoading && data}
                handleSubmit={handleSubmit}
                setEditable={setEditable}
                Editable={Editable}
              />
            </div>
          </div>
        </>
      )}

      {/* modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload Profile
              </ModalHeader>
              <ModalBody>
                <div className="w-full h-full flex flex-col  items-center justify-center gap-5 py-10">
                  {Preview ? (
                    <Avatar
                      src={Preview}
                      className="w-[150px] h-[150px] text-large"
                    />
                  ) : (
                    <Avatar
                      src={EmptyProfileIcon}
                      className="w-[150px] h-[150px] text-large"
                    />
                  )}

                  {Preview ? (
                    <Button
                      color="primary"
                      className=" rounded-full flex items-center justify-center gap-2 font-medium tracking-wider overflow-hidden "
                      size="lg"
                      onClick={handleEditProfile}
                    >
                      Upload Profile
                    </Button> 
                  ) : (
                    <Button
                      color="primary"
                      className=" relative rounded-full flex items-center justify-center gap-2 font-medium tracking-wider overflow-hidden "
                      size="lg"
                    >
                      <input
                        type="file"
                        onChange={loadingImage}
                        className="absolute scale-[2] opacity-0 cursor-pointer"
                      />
                      <AiOutlineCloudUpload size={23} />
                      Select Image
                    </Button>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CoordinatorInfo;
