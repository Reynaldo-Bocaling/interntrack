import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { getCampus, addMajor } from "../../api/Api";
import Swal from "sweetalert2";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { FiEdit2,FiTrash2 } from "react-icons/fi";


function Major() {
  const queryClient = useQueryClient();
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [value, setValue] = useState(0);
  const [college_id, setCollege_id] = useState(0)
  const [program_id, setProgram_id] = useState(0)
  const [campusId, setCampusId] = useState(0);

  const [values, setValues] = useState({
    program: "",
    major: "",
  });

  const { data: campuses } = useQuery({
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

  const campus = campuses? campuses : [];

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


  const collegeList = campus
  ?.flatMap(({ college }) => college)
  .map(({ id, college_description, program, campus }) => ({
    id,
    college_description,
    program,
    campus: campus.campus_Location,
  }));


  const programList = collegeList.flatMap(({program})=> program)
  .map(({ id, program_description, trainingHours, college,major }) => ({
    id,
    program_description,
    trainingHours,
    college,
    college_id: college?.id,
    college_description: college?.college_description,
    campus: college?.campus.campus_Location,
    campus_id: college?.campus.id,
    major
  }))
  .filter(
    (item) =>
      college_id == null || item.college_id === Number(college_id)
  );
  


  const majorList = programList 
  ? programList.flatMap(({major})=> major)
  :[]


  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };


  console.log('prog',programList );

  return (
    <div className="max-w-[450px]">
      <div>
        <p className="text-lg font-semibold mb-4"> Major</p>

        <Box
          sx={{
            width: "100%",
            marginBottom: "25px",
          }}
        >
          <Tabs value={value} onChange={handleTabChange}>
            <Tab
              label={
                <small className="font-medium capitalize tracking-wide text-sm">
                  Add major
                </small>
              }
            />
            <Tab
              label={
                <small className="font-medium capitalize tracking-wide text-sm">
                  View major
                </small>
              }
            />
          </Tabs>
        </Box>

        {value === 0 && (
 <div className="w-full">
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
        )
}

{value === 1 && (
          <div className="w-full">
            <div className="scrollBar h-[300px] overflow-y-auto flex flex-col gap-2">
            <Select
            label=" College"
            className="max-w-xs"
            size="sm"
            isRequired
            onChange={(e)=> setCollege_id(e.target.value)}
          >
            {collegeList &&
                  collegeList.map(({ id, college_description, campus }) => (
                    <SelectItem key={id} value={id}>
                      {`${college_description} > ${campus}`}
                    </SelectItem>
                  ))}
          </Select>



             

          {
              majorList.map((item, index) => (
              <div className="flex items-center gap-3" key={index}>
                <Input
                  type="text"
                  label={`${item.program?.program_description} >  ${item.program?.college?.college_description}`}
                  className="max-w-full"
                  value={item.major_description}
                  isDisabled={campusId !== item.id}
                />

                <button
                >
                  {campusId !== item.id ? (
                    <div className="flex items-center gap-2">
                    <FiEdit2 onClick={() =>
                    setCampusId(campusId === item.id ? 0 : item.id)
                  } size={20} className="text-green-600" />
                    <FiTrash2 onClick={()=> alert(item.id)} size={20} className="text-red-600" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button
                        className="bg-green-500 text-white font-medium"
                        size="sm"
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => setCampusId(0)}
                        className="bg-red-100 text-red-500 font-medium "
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </button>
              </div>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Major;
