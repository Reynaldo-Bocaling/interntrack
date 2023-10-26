import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCampus, addMajor } from "../../api/Api";
import Swal from "sweetalert2";

function Major() {
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const [values, setValues] = useState({
    program: "",
    major: "",
  });

  const { data: CampusList } = useQuery({
    queryKey: ["getCampus"],
    queryFn: getCampus,
  });

  const { mutate } = useMutation(addMajor, {
    onSuccess: () => {
      Swal.fire("Success", "Major has Major successfully added.", "success");
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Failed to add major. The campus may already exist or the format is invalid. \n Please review and try again.",
        "error"
      );
    },
  });

  const campus = CampusList;
  const college = selectedCampus
    ? campus.find((college) => college.id === parseInt(selectedCampus))
    : [];
  const program = selectedCollege
    ? college.college.find(
        (program) => program.id === parseInt(selectedCollege)
      )
    : [];

  const handleCampusChange = (e) => {
    setSelectedCampus(e.target.value);
    setSelectedCollege(null);
    // setSelectedProgram(null);
  };
  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
    // setSelectedProgram(null);
  };
  //   const handleProgramChange = (e) => {
  //     setSelectedProgram(e.target.value);
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(values);

  const handleSubmit = () => {
    const major_desc = values.major;
    const program_id = values.program;
    mutate({ major_description: major_desc, program_id: Number(program_id) });
  };

  return (
    <div>
      <div>
        <p className="text-lg font-semibold mb-4">Add Major</p>

        <div className="grid gap-3">
          <Select
            label="Campus"
            className="max-w-xs"
            size="sm"
            isRequired
            onChange={handleCampusChange}
          >
            {campus &&
              campus.map(({ id, campus_Location }) => (
                <SelectItem key={id}>{campus_Location}</SelectItem>
              ))}
          </Select>

          <Select
            label=" College"
            className="max-w-xs"
            size="sm"
            isRequired
            onChange={handleCollegeChange}
            isDisabled={!selectedCampus}
          >
            {selectedCampus &&
              college.college.map(({ id, college_description }) => (
                <SelectItem key={id}>{college_description}</SelectItem>
              ))}
          </Select>

          <Select
            label=" Program"
            className="max-w-xs"
            size="sm"
            isRequired
            onChange={handleChange}
            isDisabled={!selectedCollege}
            name="program"
          >
            {selectedCollege &&
              program.program.map(({ id, program_description }) => (
                <SelectItem key={id}>{program_description}</SelectItem>
              ))}
          </Select>

          <Input
            type="text"
            label="Major"
            className="max-w-xs"
            onChange={handleChange}
            name="major"
            isRequired
          />

          <Button
            onClick={handleSubmit}
            color="primary"
            size="lg"
            className="max-w-xs mt-2 font-medium"
          >
            Add Major
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Major;
