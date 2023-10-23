import React, { useState } from "react";
import { Drawer } from "@mantine/core";
import { Button, Tooltip, Textarea, image } from "@nextui-org/react";
import { AiOutlineCloudUpload } from "react-icons/ai";

function BrgyCertificate(props) {
  const { opened, onClose, handleSubmit, data } = props;
  const [File, setFile] = useState(null);
  const [Preview, setPreview] = useState(null);

  const loadingImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const handleClick = () => {
    const formData = new FormData();
    formData.append("type", "brgy");
    formData.append("image", File);
    handleSubmit(formData);
  };

  return (
    <div>
      <Drawer
        position="bottom"
        size="100%"
        opened={opened}
        onClose={onClose}
        title={
          <header className="mt-2">
            <span className="text-xl font-semibold">BRGY Certificate</span>
          </header>
        }
      >
        {data?.imageUrl ? (
          <img src={data.imageUrl} alt="" className="max-w-full my-7 mx-auto" />
        ) : (
          <>
            <div className="mt-10">
              {!Preview ? (
                <Tooltip content="Browse Image" closeDelay={0}>
                  <button className=" uploadMoa h-[200px]  relative overflow-hidden text-sm  w-full flex flex-col items-center justify-center gap-2">
                    <AiOutlineCloudUpload size={30} className="text-blue-500" />
                    <span className="text-base "> Upload Image</span>
                    <input
                      type="file"
                      onChange={loadingImage}
                      className="absolute scale-[3] opacity-0 cursor-pointer"
                    />
                  </button>
                </Tooltip>
              ) : (
                <div className=" h-[200px]  bg-gray-100 rounded-lg p-2  relative overflow-hidden text-sm  w-full flex flex-col items-center justify-center ">
                  <img src={Preview} alt="" className="" />
                  <input
                    type="file"
                    onChange={loadingImage}
                    className="absolute scale-[3] opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>

            <Button
              onClick={handleClick}
              color="primary"
              className="rounded-full w-full mt-7 py-5"
              size="lg"
            >
              Upload Brgy Certificate
            </Button>
          </>
        )}
      </Drawer>
    </div>
  );
}

export default BrgyCertificate;