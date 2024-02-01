import React, { Suspense, lazy, useState } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { MdKeyboardArrowLeft } from "react-icons/md";
const ProfileInfo = lazy(() =>
  import("../../components/Student-profile/index")
);
const Editinfo = lazy(() =>
  import("../../components/Student-profile/Editinfo")
);
import { BsCamera } from "react-icons/bs";
import EmptyProfileIcon from "../../assets/images/emptyProfile.png";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Swal from "sweetalert2";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import {
  editStudentProfile,
  getStudent,
  updateStudentProfilePicture,
} from "../../api/Api";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { DotLoading } from "../../components/spinners-loading/Spinner";

const Profile = () => {
  const [File, setFile] = useState(null);
  const [Preview, setPreview] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();

  const [OpenEdit, setOpenEdit] = useState(false);

  const loadingImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const { data } = useQuery({
    queryKey: ["getstudentInfo"],
    queryFn: getStudent,
  });

  const { mutate: editInfoMutate } = useMutation(editStudentProfile, {
    onSuccess: () => {
      Swal.fire("Success", "Update Successful", "success");
      setOpenEdit(false);
      queryClient.invalidateQueries("getstudentInfo");
      setPreview("");
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Update Failed. Please check the information provided and try again.",
        "error"
      );
    },
  });

  const { mutate: editProfile } = useMutation(updateStudentProfilePicture, {
    onSuccess: () => {
      Swal.fire("Success", "Update Successful", "success");
      queryClient.invalidateQueries("getstudentInfo");
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Update Failed. Please check the information provided and try again.",
        "error"
      );
    },
  });

  const handleEditProfile = () => {
    const formData = new FormData();
    formData.append("image", File);
    editProfile(formData);
  };

  const handleEditInfo = (item) => {
    editInfoMutate(item);
  };

  const Info = [
    { id: 0, type: "text", name: "firstname", label: "Firstname" },
    { id: 1, type: "text", name: "lastname", label: "Lastname" },
    { id: 2, type: "text", name: "middlename", label: "Middle Initial" },
    { id: 3, type: "text", name: "email", label: "Email" },
    { id: 4, type: "number", name: "contact", label: "Contact" },
    { id: 5, type: "text", name: "gender", label: "Gender" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <header className="flex items-center justify-between py-2 mb-3 px-2">
          <MdKeyboardArrowLeft size={22} />
          <span className="text-lg font-semibold">Profile</span>
          <CgMenuMotion size={20} />
        </header>
        <div className="bg-blue-2 flex flex-col items-center">
          <div className="relative">
            <div className="ml-7  bg-white w-32 h-32 p-5 object-cover border-white right rounded-full shadow-md overflow-hidden">
              {data?.profile ? (
                <img src={data.profile_url} alt={data.profile_url} />
              ) : (
                ""
              )}
            </div>
            <button
              onClick={onOpen}
              className="absolute -bottom-1 right-5 bg-gray-200 px-2 h-[32px] w-[32px] flex items-center justify-center rounded-full cursor-pointer"
            >
              <BsCamera />
            </button>
          </div>

          <div className="mt-3 flex flex-col items-center">
            <div className="text-lg text-[#000] font-bold flex items-center justify-center gap-2">
              <span className="capitalize">{data?.firstname}</span>
              <span className="capitalize">{data?.lastname}</span>
            </div>
            <small className="text-blue-500 font-medium">Student</small>
          </div>
        </div>
        <div className="flex items-center justify-center px-2 mt-5">
          <button
            onClick={() => setOpenEdit(true)}
            className="font-semibold bg-slate-100 py-2 px-4 rounded-lg"
          >
            Edit Info
          </button>
        </div>

        <ProfileInfo data={data} />
        {OpenEdit && (
          <Suspense fallback={<DotLoading />}>
            <Editinfo
              data={data}
              handleSubmit={handleEditInfo}
              info={Info}
              onClose={() => setOpenEdit(false)}
              opened={OpenEdit}
            />
          </Suspense>
        )}
      </div>

      {/* modal */}
      {isOpen && (
        <Suspense fallback={<DotLoading />}>
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
        </Suspense>
      )}
    </div>
  );
};

export default Profile;
