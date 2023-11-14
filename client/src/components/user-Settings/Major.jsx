import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCampus, addMajor, deleteMajor, updateMajor } from "../../api/Api";
import Swal from "sweetalert2";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const Major = () => {
  const queryClient = useQueryClient();
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [value, setValue] = useState(0);
  const [college_id, setCollege_id] = useState(0);
  const [program_id, setProgram_id] = useState(0);
  const [campusId, setCampusId] = useState(0);

  const [values, setValues] = useState({
    program: "",
    major: "",
  });

  const { data: campuses } = useQuery({
    queryKey: ["getCampuses"],
    queryFn: getCampus,
  });

  const { mutate } = useMutation(addMajor, {
    onSuccess: () => {
      Swal.fire("Success", "Major has Major successfully added.", "success");
      queryClient.invalidateQueries("getCampuses");
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Failed to add major. The campus may already exist or the format is invalid. \n Please review and try again.",
        "error"
      );
    },
  });

  const campus = campuses ? campuses : [];

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

  const programList = collegeList
    .flatMap(({ program }) => program)
    .map(({ id, program_description, trainingHours, college, major }) => ({
      id,
      program_description,
      trainingHours,
      college,
      college_id: college?.id,
      college_description: college?.college_description,
      campus: college?.campus.campus_Location,
      campus_id: college?.campus.id,
      major,
    }));

  const majorList = programList
    ? programList
        .flatMap(({ major }) => major)
        ?.map(({ id, major_description, program }) => ({
          id,
          major_description,
          program,
          program_id: program?.id,
          program_description: program?.program_description,
          collegeName: program?.college?.college_description,
          campusName: program?.college?.campus?.campus_Location,
        }))
    : [];

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

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const { mutate: deleteMutate } = useMutation(deleteMajor, {
    onSuccess: () => {
      Swal.fire("Success", "Major has been successfully deleted.", "success");
      queryClient.invalidateQueries("getCampuses");
    },
    onError: () => {
      Swal.fire("Error", "Failed \n Please try again", "error");
    },
  });

  const handleDelete = (id) => {
    deleteMutate(id);
  };

  const { mutate: updateMutate } = useMutation(updateMajor, {
    onSuccess: (id) => {
      Swal.fire("Success", "Major has been successfully updated.", "success");
      queryClient.invalidateQueries("getCampuses");
      setCampusId(0);
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Failed to updated Major. \n Please try again",
        "error"
      );
    },
  });

  const handleUpdate = (id, major_desc) => {
    const updatedValue = itemList[id]?.major_description;

    let updateMajoreDesc =
      updatedValue !== undefined ? updatedValue : major_desc;
    setCampusId(0);

    updateMutate({ id, major_description: updateMajoreDesc });
  };

  const [searchValue, setSearchValue] = useState("");

  const filteredCollege = majorList.filter(
    (item) =>
      item.major_description
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      item.program_description
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      item.campusName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.collegeName.toLowerCase().includes(searchValue.toLowerCase())
  );

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
                className="max-w-sm"
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
                className="max-w-sm"
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
                className="max-w-sm"
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
                className="max-w-sm"
                onChange={handleChange}
                name="major"
                isRequired
              />

              <Button
                onClick={handleSubmit}
                color="primary"
                size="lg"
                className="max-w-[170px] mt-2 font-medium"
              >
                Add Major
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

              {filteredCollege.map((item, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <Input
                    type="text"
                    label={`${item.program_description} >  ${item.collegeName} > ${item?.campusName}`}
                    className="max-w-full"
                    name="major_description"
                    value={
                      itemList[item.id]?.major_description !== undefined
                        ? itemList[item.id]?.major_description
                        : item.major_description
                    }
                    onChange={(e) => handleInputChange(e, item.id)}
                    isDisabled={campusId !== item.id}
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
                            handleUpdate(item?.id, item?.major_description)
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
};

export default Major;
