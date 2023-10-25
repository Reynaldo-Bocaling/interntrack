import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addProgram, getCampus } from "../../api/Api";

function Program() {
    const [selectedCampus, setSelectedCampus] = useState(null);
     const [selectedCollege, setSelectedCollege] = useState(null);
     const [program, setProgram] = useState(null);



  const { data: CampusList } = useQuery({
    queryKey: ["getCampus"],
    queryFn: getCampus,
  });

  const {mutate} = useMutation(addProgram, {
    onSuccess: () => {
        alert('success add campus')
    },
    onError: () => {
        alert('error')
    }
});


  const campus = CampusList;
  const college = selectedCampus
    ? campus.find((college) => college.id === parseInt(selectedCampus))
    : [];

 


  const handleCampusChange = (e) => {
    setSelectedCampus(e.target.value);
    setSelectedCollege(null);
  };
  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
  };


  console.log(`${selectedCollege} ${program}`);


  const handleSubmit = () => {
    mutate({program_description:program,  college_id: Number(selectedCollege)})
}

    

     

  return (
    <div>
      <div>
        <p className="text-lg font-semibold mb-4">Add Program</p>

        <div className="grid gap-3">
                    <Select
                      label="Campus"
                      className="max-w-xs"
                      size="sm"
                      onChange={handleCampusChange}
                    >
                      {campus &&
                        campus.map(({ id, campus_Location }) => (
                          <SelectItem key={id} value={id}>{campus_Location}</SelectItem>
                        ))
                       }
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
                          <SelectItem key={id} value={id}>
                            {college_description}
                          </SelectItem>
                        ))}
                    </Select>

          <Input
            type="text"
            label="Program"
            name="password"
            className="max-w-xs"
            onChange={(e)=> setProgram(e.target.value)}

          />

          <Button
          onClick={handleSubmit}
            color="primary"
            size="lg"
            className="max-w-xs mt-2 font-medium"
          >
            Add Program
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Program;
