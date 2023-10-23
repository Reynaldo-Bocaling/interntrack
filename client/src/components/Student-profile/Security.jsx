import React, { useState } from "react";
import { Drawer } from "@mantine/core";
import { Input, Button } from "@nextui-org/react";
import { useDisclosure } from "@mantine/hooks";
import { MdAlternateEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { changeStudentPassword } from "../../api/Api";
function Security({ data }) {
  const [opened, { open, close }] = useDisclosure(false); //MESSAGE
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterNewPassword, setReEnterNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleReEnterPassword = (e) => {
    const reEnterPass = e.target.value;
    setReEnterNewPassword(reEnterPass);
    // Check if passwords match
    if (newPassword !== reEnterPass) {
      setErrorMsg(true);
      setIsInvalid(true);
    } else {
      setErrorMsg(false);
      setIsInvalid(false);
    }
  };

  const { mutate } = useMutation(changeStudentPassword, {
    onSuccess: () => {
      alert("success");
    },
    onError: () => {
      alert("error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ oldPassword: password, newPassword: newPassword });
  };

  return (
    <div className="mt-3 mb-8">
      <h1 className="text-lg font-semibold tracking-wide mb-5">Security</h1>

      <div className="flex flex-col gap-4">
        <Input value={data?.email} type="text" label="username" isDisabled />

        <button
          onClick={open}
          className="my-2 text-blue-500 py-2  font-medium tracking-wide rounded-lg"
        >
          Change password
        </button>
        <Drawer
          position="bottom"
          size="60%"
          opened={opened}
          onClose={close}
          title={
            <header className="mt-2">
              <span className="text-xl font-semibold">Change password</span>
            </header>
          }
        >
          <div className="relative py-5 px-2 flex flex-col gap-4">
            <Input
              type="password"
              label="Enter password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              type="password"
              label="New password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              label="Re-enter new password"
              onChange={handleReEnterPassword}
              isInvalid={isInvalid}
              errorMessage={errorMsg ? "Passwords do not match" : null}
            />
            <Button
              color="primary"
              onClick={handleSubmit}
              className="my-2 text-white py-2  font-medium tracking-wide rounded-full"
              size="lg"
              isDisabled={
                errorMsg || !reEnterNewPassword || !newPassword || !password
              }
            >
              Change password
            </Button>
            <button
              onClick={open}
              className=" text-red-500 py-2  font-medium tracking-wide rounded-lg"
            >
              Cancel
            </button>
          </div>
        </Drawer>
      </div>
    </div>
  );
}

export default Security;
