import React from "react";
import { Input, PasswordInput, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MdAlternateEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
function Security() {
  const [opened, { open, close }] = useDisclosure(false); //MESSAGE

  return (
    <div className="mt-3 mb-8">
      <h1 className="text-lg font-semibold tracking-wide mb-5">Security</h1>

      <div className="flex flex-col gap-4">
        <Input.Wrapper label={<p className="pb-2">Email</p>}>
          <Input
            icon={<MdAlternateEmail />}
            size="md"
            placeholder="Your email"
          />
        </Input.Wrapper>
        <PasswordInput
          icon={<FiLock />}
          placeholder="Password"
          label={<p className="pb-2">Password</p>}
          size=""
        />
        <button
          onClick={open}
          className="my-2 text-blue-500 py-2  font-medium tracking-wide rounded-lg"
        >
          Change password
        </button>
        <Drawer
          position="bottom"
          size="50%"
          opened={opened}
          onClose={close}
          title={
            <header className="mt-2">
              <span className="text-xl font-semibold">Change password</span>
            </header>
          }
        >
          <div className="relative py-5 px-2 flex flex-col gap-4">
            <PasswordInput
              icon={<FiLock />}
              placeholder="Password"
              label={<p className="pb-2">Password</p>}
              size=""
            />
            <PasswordInput
              icon={<FiLock />}
              placeholder="Password"
              label={
                <p className="pb-2 flex itce gap-2">
                  Confirm password{" "}
                  <span className="text-lg text-red-500">*</span>
                </p>
              }
            />
            <button
              onClick={open}
              className="my-2 text-white py-2  font-medium tracking-wide bg-blue-500 rounded-lg"
            >
              Change password
            </button>
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
