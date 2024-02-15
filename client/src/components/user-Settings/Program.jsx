import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProgram,
  deleteProgram,
  getCampus,
  updateProgram,
} from "../../api/Api";
import Swal from "sweetalert2";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const Program = () => {
  const queryClient = useQueryClient();
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [program, setProgram] = useState(null);
  const [hours, setHours] = useState(null);
  const [campusId, setCampusId] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const [value, setValue] = useState(0);

  const { data: campuses } = useQuery({
    queryKey: ["GetProgram"],
    queryFn: getCampus,
  });

  const { mutate, isLoading:AddProgramLoading } = useMutation(addProgram, {
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
        item.program_description
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        item.college_description
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        item.campus.toLowerCase().includes(searchValue.toLowerCase())
    );

  const [itemList, setItemList] = useState({});

  const handleInputChange = (e, itemId) => {
    const { name, value } = e.target;

    setItemList((prevItemList) => ({
      ...prevItemList,
      [itemId]: {
        ...prevItemList[itemId],
        [name]: value,
      },
    }));
  };

  const collegeList = campus
    ?.flatMap(({ college }) => college)
    .map(({ id, college_description, program, campus }) => ({
      id,
      college_description,
      program,
      campus: campus.campus_Location,
    }));

  const { mutate: deleteMutate } = useMutation(deleteProgram, {
    onSuccess: (id) => {
      Swal.fire("Success", "Program has been successfully deleted.", "success");
      queryClient.invalidateQueries("GetProgram");
    },
    onError: () => {
      Swal.fire("Error", "Failed \n Please try again", "error");
    },
  });

  const { mutate: updateMutate } = useMutation(updateProgram, {
    onSuccess: (id) => {
      Swal.fire("Success", "Program has been successfully updated.", "success");
      queryClient.invalidateQueries("GetProgram");
      setCampusId(0);
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Failed to updated Program. \n Please try again",
        "error"
      );
    },
  });

  const handleDelete = (id) => {
    deleteMutate(id);
  };

  const handleUpdate = (id, program_desc, trainer_hours) => {
    const updatedValue = itemList[id]?.program_description;
    const trainingHours = itemList[id]?.trainingHours;

    let updateProgramDesc =
      updatedValue !== undefined ? updatedValue : program_desc;
    let updateProgramHours =
      trainingHours !== undefined ? trainingHours : trainer_hours;

    setCampusId(0);

    updateMutate({
      id,
      program_description: updateProgramDesc,
      trainingHours: updateProgramHours,
    });
  };

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
                className="max-w-sm"
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
                className="max-w-sm"
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
                className="max-w-sm"
                isRequired
                onChange={(e) => setProgram(e.target.value)}
              />
              <Input
                type="number"
                label="Training Hours"
                className="max-w-sm"
                isRequired
                onChange={(e) => setHours(e.target.value)}
              />

              <Button
                onClick={handleSubmit}
                color="primary"
                size="lg"
                isRequired
                className="max-w-[170px] mt-2 font-medium"
                isDisabled={AddProgramLoading}
              >
                {
                  AddProgramLoading ? <span>Adding..</span> : <span>Add Program</span>
                }
              </Button>
            </div>
          </div>
        )}

        {value === 1 && (
          <div className="w-full">
            <div className="scrollBar h-[300px] overflow-y-auto flex flex-col gap-2">
              <Input
                type="text"
                label="Search"
                className="max-w-full"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />

              {filteredPrograms.map((item, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <Input
                    type="text"
                    label={`${item.college_description} > ${item.campus}`}
                    className="max-w-full"
                    value={
                      itemList[item.id]?.program_description !== undefined
                        ? itemList[item.id]?.program_description
                        : item.program_description
                    }
                    isDisabled={campusId !== item.id}
                    name="program_description"
                    onChange={(e) => handleInputChange(e, item.id)}
                  />
                  <Input
                    type="number"
                    label="Hours"
                    name="trainingHours"
                    className="max-w-[100px]"
                    value={
                      itemList[item.id]?.trainingHours !== undefined
                        ? itemList[item.id]?.trainingHours
                        : item.trainingHours
                    }
                    isDisabled={campusId !== item.id}
                    onChange={(e) => handleInputChange(e, item.id)}
                  />

                  <button>
                    {campusId !== item.id ? (
                      <div className="flex items-center gap-2">
                        <FiEdit2
                          onClick={() =>
                            setCampusId(campusId === item.id ? 0 : item.id)
                          }
                          size={20}
                          className="text-green-600"
                        />
                        <FiTrash2
                          onClick={() => handleDelete(item.id)}
                          size={20}
                          className="text-red-600"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button
                          className="bg-green-500 text-white font-medium"
                          size="sm"
                          onClick={() =>
                            handleUpdate(
                              item?.id,
                              item?.program_description,
                              item?.trainingHours
                            )
                          }
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
