import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProgram, getCampus } from "../../api/Api";
import Swal from "sweetalert2";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { FiEdit2,FiTrash2 } from "react-icons/fi";

function Program() {
  const queryClient = useQueryClient();
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [program, setProgram] = useState(null);
  const [hours, setHours] = useState(null);
  const [campusId, setCampusId] = useState(0);

  const [value, setValue] = useState(0);

  const { data: campuses } = useQuery({
    queryKey: ["GetProgram"],
    queryFn: getCampus,
  });

  const { mutate } = useMutation(addProgram, {
    onSuccess: () => {
      Swal.fire("Success", "Program has been successfully added.", "success");
      queryClient.invalidateQueries("GetProgram");
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Failed to add program. The campus may already exist or the format is invalid. \n Please review and try again.",
        "error"
      );
    },
  });

  const campus = campuses ? campuses : [];

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

  const handleSubmit = () => {
    mutate({
      program_description: program,
      college_id: Number(selectedCollege),
      trainingHours: hours,
    });
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const getProgramList = campus
    ?.flatMap(({ college }) => college)
    .map(({ id, college_description, campus, program }) => ({
      id,
      college_description,
      campusName: campus?.campus_Location,
      campus_id: campus?.id,
      program,
    }))
    .flatMap(({ program }) => program);

  const filteredPrograms = getProgramList
    .map(({ id, program_description, trainingHours, college }) => ({
      id,
      program_description,
      trainingHours,
      college,
      college_id: college?.id,
      college_description: college?.college_description,
      campus: college?.campus.campus_Location,
      campus_id: college?.campus.id,
    }))
    .filter(
      (item) =>
        selectedCollege === null || item.college_id === Number(selectedCollege)
    );

  const collegeList = campus
    ?.flatMap(({ college }) => college)
    .map(({ id, college_description, program, campus }) => ({
      id,
      college_description,
      program,
      campus: campus.campus_Location,
    }));

  console.log(selectedCollege);

  return (
    <div className="max-w-[450px]">
      <div>
        <p className="text-lg font-semibold mb-4">Program</p>

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
                  Add Program
                </small>
              }
            />
            <Tab
              label={
                <small className="font-medium capitalize tracking-wide text-sm">
                  View Program
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
                className="max-w-full"
                size="sm"
                onChange={handleCampusChange}
                isRequired
              >
                {campus &&
                  campus.map(({ id, campus_Location }) => (
                    <SelectItem key={id} value={id}>
                      {campus_Location}
                    </SelectItem>
                  ))}
              </Select>

              <Select
                label=" College"
                className="max-w-full"
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
                className="max-w-full"
                isRequired
                onChange={(e) => setProgram(e.target.value)}
              />
              <Input
                type="number"
                label="Training Hours"
                className="max-w-full"
                isRequired
                onChange={(e) => setHours(e.target.value)}
              />

              <Button
                onClick={handleSubmit}
                color="primary"
                size="lg"
                isRequired
                className="max-w-xs mt-2 font-medium"
              >
                Add Program
              </Button>
            </div>
          </div>
        )}

        {value === 1 && (
          <div className="w-full">
            <div className="scrollBar h-[300px] overflow-y-auto flex flex-col gap-2">
              <Select
                label="Slect College"
                className="max-w-full"
                size="sm"
                onChange={handleCollegeChange}
              >
                {collegeList &&
                  collegeList.map(({ id, college_description, campus }) => (
                    <SelectItem key={id}>
                      {`${college_description} > ${campus}`}
                    </SelectItem>
                  ))}
              </Select>

              {filteredPrograms.map((item, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <Input
                    type="text"
                    label={
                      <>
                        {item.college_description} {">"} {item.campus}
                      </>
                    }
                    className="max-w-full"
                    value={item.program_description}
                    isDisabled={campusId !== item.id}
                  />
                  <Input
                    type="number"
                    label="Hours"
                    className="max-w-[100px]"
                    value={item.trainingHours}
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

export default Program;
