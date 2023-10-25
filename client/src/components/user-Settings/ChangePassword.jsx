import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { changeStudentPassword } from "../../api/Api";
function ChangePassword() {
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
    <div>
      <p className="text-lg font-semibold mb-4">Change password</p>

      <div className="relative flex flex-col gap-4">
        <Input
          type="password"
          label="Enter password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="max-w-md"
        />

        <Input
          type="password"
          label="New password"
          onChange={(e) => setNewPassword(e.target.value)}
          className="max-w-md"
        />
        <Input
          type="password"
          label="Re-enter new password"
          onChange={handleReEnterPassword}
          isInvalid={isInvalid}
          errorMessage={errorMsg ? "Passwords do not match" : null}
          className="max-w-md"
        />
        <Button
          color="primary"
          onClick={handleSubmit}
          className="my-2 text-white py-2  font-medium tracking-wide rounded-full max-w-md"
          size="lg"
          isDisabled={
            errorMsg || !reEnterNewPassword || !newPassword || !password
          }
        >
          Change password
        </Button>
      </div>
    </div>
  );
}

export default ChangePassword;
