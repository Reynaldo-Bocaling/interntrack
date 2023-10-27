import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCollege,
  deleteCollege,
  getCampus,
  updateCollege,
} from "../../api/Api";
import Swal from "sweetalert2";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

function College() {
  const queryClient = useQueryClient();
  const [campusId, setCampusId] = useState(0);
  const [valueTab, setValueTab] = useState(0);
  const [formValues, setFormValues] = useState({
    college_description: "",
    campus_id: 0,
  });

  const [campus_id, setCampus_id] = useState(null);

  const {
    data: campuses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getCampuses"],
    queryFn: getCampus,
  });

  const { mutate } = useMutation(addCollege, {
    onSuccess: () => {
      Swal.fire("Success", "College has been successfully added.", "success");
      setFormValues({ college_description: "", campus_id: 0 });
      queryClient.invalidateQueries("getCampuses");
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Failed to add college. The campus may already exist or the format is invalid. \n Please review and try again.",
        "error"
      );
    },
  });

  // if (isLoading) return <h1>Loading</h1>;

  const newCampuses = campuses ? campuses : [];

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

  const handleTabChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const getCollegeList = newCampuses
    ?.flatMap(({ college }) => college)
    .map(({ id, college_description, campus, program }) => ({
      id,
      college_description,
      campusName: campus?.campus_Location,
      program,
      campus_id: campus?.id,
    }));

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

  const [searchValue, setSearchValue] = useState("");

  const filteredCollege = getCollegeList.filter((item) =>
    item.college_description.toLowerCase().includes(searchValue.toLowerCase())
    || item.campusName.toLowerCase().includes(searchValue.toLowerCase())

  );



  const { mutate: deleteMutate } = useMutation(deleteCollege, {
    onSuccess: (id) => {
      console.log(id);
      Swal.fire("Success", "College has been successfully deleted.", "success");
      queryClient.invalidateQueries("getCampuses");
    },
    onError: () => {
      Swal.fire("Error", "Failed \n Please try again", "error");
    },
  });

  const { mutate: updateMutate } = useMutation(updateCollege, {
    onSuccess: (id) => {
      console.log(id);
      Swal.fire("Success", "College has been successfully updated.", "success");
      queryClient.invalidateQueries("getCampuses");
      setCampusId(0);
    },
    onError: () => {
      Swal.fire("Error", "Failed to updated College. \n Please try again", "error");
    },
  });



  const handleDelete = (id) => {
    deleteMutate(id);
  };



  const handleUpdate = (id, college_desc) => {
    const updatedValue = itemList[id]?.college_description;

    let updateCollegeDesc =
      updatedValue !== undefined ? updatedValue : college_desc;
    setCampusId(0);

    updateMutate({id, college_description: updateCollegeDesc})
  };

  return (
    <div className="max-w-[450px]">
      <p className="text-lg font-semibold mb-4">Add College</p>

      <Box
        sx={{
          width: "100%",
          marginBottom: "25px",
        }}
      >
        <Tabs value={valueTab} onChange={handleTabChange}>
          <Tab
            label={
              <small className="font-medium capitalize tracking-wide text-sm">
                Add College
              </small>
            }
          />
          <Tab
            label={
              <small className="font-medium capitalize tracking-wide text-sm">
                View College
              </small>
            }
          />
        </Tabs>
      </Box>

      {valueTab === 0 && (
        <div className="w-full">
          <div className="grid gap-3">
            <Select
              label="Campus"
              className="max-w-sm"
              size="sm"
              isRequired
              onChange={handleChange}
              name="campus_id"
            >
              {newCampuses &&
                newCampuses.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.campus_Location}
                  </SelectItem>
                ))}
            </Select>

            <Input
              type="text"
              label="College"
              name="college_description"
              className="max-w-sm"
              value={formValues.college_description}
              onChange={handleChange}
              isRequired
            />

            <Button
              onClick={handleSubmit}
              color="primary"
              size="lg"
              className="max-w-[170px] mt-2 font-medium"
            >
              Add College
            </Button>
          </div>
        </div>
      )}

      {valueTab === 1 && (
        <div className="w-full">
          <div className="scrollBar h-[300px] overflow-y-auto flex flex-col gap-2">
          <Input
              type="text"
              label="Search"
              className="max-w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />

            {filteredCollege.length > 0 ? (
              filteredCollege.map((item, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <Input
                    type="text"
                    name="college_description"
                    label={item.campusName}
                    value={
                      itemList[item.id]?.college_description !== undefined
                        ? itemList[item.id]?.college_description
                        : item.college_description
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
                          // onClick={() => {
                          //   const updatedValue =
                          //     itemList[item.id]?.college_description;
                          //   if (updatedValue !== undefined) {
                          //     console.log(updatedValue);
                          //   } else {
                          //     console.log(item.college_description);
                          //   }
                          // setCampusId(0);
                          // }}

                          onClick={() =>
                            handleUpdate(item?.id, item.college_description)
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
              ))
            ) : (
              <>No College</>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default College;
