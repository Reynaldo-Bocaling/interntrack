import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { addCampus } from "../../api/Api";

function Campus() {
    const [campus, setCampus] = useState('')
    const {mutate} = useMutation(addCampus, {
        onSuccess: () => {
            alert('success add campus')
        },
        onError: () => {
            alert('error')
        }
    });


    const handleSubmit = () => {
        mutate({campus_Location:campus})
    }

  return (
    <div>
      <p className="text-lg font-semibold mb-4">Add Campus</p>

     <div className="grid gap-3">
     <Input
          type="text"
          label="Campus"
          name="compus"
          className="max-w-xs"
          onChange={(e)=> setCampus(e.target.value)}
        />

        <Button onClick={handleSubmit} size="lg" color="primary" className="max-w-xs mt-2 font-medium">Add Campus</Button>
     </div>
    </div>
  );
}

export default Campus;
