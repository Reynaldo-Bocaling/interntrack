import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCollege, getCampus } from "../../api/Api";

function College() {
  const [formValues, setFormValues] = useState({
    college_description: "",
    campus_id: 0,
  });

  const { data: CampusList } = useQuery({
    queryKey: ["getCampus"],
    queryFn: getCampus,
  });

  const { mutate } = useMutation(addCollege, {
    onSuccess: () => {
      alert("success add campus");
    },
    onError: () => {
      alert("error");
    },
  });

  const campus = CampusList ? CampusList : [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    mutate(formValues);
  };

  return (
    <div>
      <p className="text-lg font-semibold mb-4">Add College</p>

      <div className="grid gap-3">
        <Select
          label="Campus"
          className="max-w-xs"
          size="sm"
          isRequired
          onChange={handleChange}
          name="campus_id"
        >
          {campus &&
            campus.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.campus_Location}
              </SelectItem>
            ))}
        </Select>

        <Input
          type="text"
          label="College"
          name="college_description"
          className="max-w-xs"
          onChange={handleChange}
        />

        <Button
          onClick={handleSubmit}
          color="primary"
          size="lg"
          className="max-w-xs mt-2 font-medium"
        >
          Add College
        </Button>
      </div>
    </div>
  );
}

export default College;
