import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
} from "@nextui-org/react";
import { PinInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { verifyPin, verifyEmail, forgotpassword } from "../api/Api";

function ForgotPassword({ openForgotPassword, onOpenChangeEvent }) {
  const [isOpenVerification, setIsOpenVerification] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [pin, setPin] = useState("");
  const [isPinError, setIsPinError] = useState(true);
  const [isPinErrorMsg, setIsPinErrorMsg] = useState("");

  const { mutate: verifyPinMutate } = useMutation({
    mutationFn: verifyPin,
    onSuccess: (response) => {
      setIsPinError(response ? false : true);
      setIsPinErrorMsg(!response && "Incorrect Pin Please try again");
    },
    onError: () => {
      alert("errorr");
    },
  });

  const { mutate: forgotPasswordMutate } = useMutation({
    mutationFn: forgotpassword,
    onSuccess: () => {
      alert('success')
    },
    onError: () => {
      alert("errorr");
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (response) => {
      setIsOpenVerification(response ? true : false);
      setIsFailed(response ? false : true);
    },
    onError: () => {
      alert("error");
    },
  });

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    mutate(email);
  };

  const handleVerifyPin = () => {
    verifyPinMutate(pin);
  };

  const handlePinChange = (pinValue) => {
    setPin(pinValue);
  };


  const handleForgotPassword = () => {
    forgotPasswordMutate({password,username:email})
  }

  return (
    <div>
      <Modal isOpen={openForgotPassword} onOpenChange={onOpenChangeEvent}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-base font-medium">
                {!isOpenVerification ? "Forgot password" : isPinError?  "Verification Code": "Set New Password"}
              </ModalHeader>
              <ModalBody>
                {!isOpenVerification ? (
                  <div className="w-full pt-2 pb-7 flex flex-col gap-5">
                    {isFailed && <p>Incoreccect email</p>}

                    <Input
                      label="Enter your email address"
                      className="text-sm"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      color="primary"
                      size="md"
                      className="text-sm font-medium shadow-xl shadow-blue-100"
                      onClick={handleSubmitEmail}
                      isDisabled={isLoading}
                    >
                      {isLoading
                        ? "Proccessing..."
                        : "Submit & Send Verification Code"}
                    </Button>
                    <Button
                      onClick={onOpenChangeEvent}
                      className="bg-transparent text-red-500 text-sm font-medium"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    {isPinError ? (
                      <div className="w-full pt-2 pb-7 flex flex-col gap-7 items-center justify-center">
                        <p>Enter the Verification Code Sent to Your Email</p>
                        <small className="text-red-500">{isPinErrorMsg}</small>
                        <PinInput size="xl" onChange={handlePinChange} />
                        <Button
                          color="primary"
                          size="md"
                          className="text-sm font-medium shadow-xl shadow-blue-100 px-10"
                          onClick={handleVerifyPin}
                        >
                          Verify
                        </Button>
                      </div>
                    ) : (
                        <div className="w-full pt-2 pb-7 flex flex-col gap-4 items-center justify-center">
                        <Input
                        type="password"
                        label="Enter new password"
                        className="text-sm"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                        <Input
                        type="password"
                        label="Confirm password"
                        className="text-sm"
                        onChange={(e)=> setPasswordError(password === e.target.value ? false: true)}
                        isInvalid={passwordError}
                        isDisabled={password == ""}
                      />
                      <Button
                        color="primary"
                        size="md"
                        className="text-sm font-medium shadow-xl shadow-blue-100 mt-2"
                        onClick={handleForgotPassword}
                        isDisabled={isLoading || passwordError}
                      >
                        {isLoading
                          ? "Proccessing..."
                          : "Change password"}
                      </Button>
                        </div>
                    )}
                  </>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ForgotPassword;
