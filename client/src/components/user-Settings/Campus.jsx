import { Button, Input } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  addCampus,
  deleteCampus,
  getCampus,
  updateCampus,
} from "../../api/Api";
import Swal from "sweetalert2";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { MdEditOff } from "react-icons/md";

const Campus = () => {
  const queryClient = useQueryClient();
  const [campus, setCampus] = useState("");
  const [campusId, setCampusId] = useState(0);

  const [value, setValue] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { mutate,  isLoading:AddCampusLoading } = useMutation(addCampus, {
    onSuccess: () => {
      Swal.fire("Success", "Campus has been successfully added.", "success");
      queryClient.invalidateQueries("getCampuses");
      setCampus("")
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Failed to add campus. The campus may already exist or the format is invalid. \n Please review and try again.",
        "error"
      );
    },
  });

  const handleSubmit = () => {
    mutate({ campus_Location: campus });
  };

  //view campus
  const { data: campuses } = useQuery({
    queryKey: ["getCampuses"],
    queryFn: getCampus,
  });

  const newCampuses = campuses ? campuses : [];

  const [updateView, setUpdateView] = useState(newCampuses);

  useEffect(() => {
    setUpdateView(newCampuses);
  }, [newCampuses]);

  const handleInputChange = (index, value) => {
    const updatedView = [...updateView];
    updatedView[index].campus_Location = value;
    setUpdateView(updatedView);
  };

  const { mutate: deleteMutate } = useMutation(deleteCampus, {
    onSuccess: () => {
      Swal.fire("Success", "Campus has been successfully deleted.", "success");
      queryClient.invalidateQueries("getCampuses");
    },
    onError: () => {
      Swal.fire("Error", "Failed \n Please try again", "error");
    },
  });

  const { mutate: updateMutate} = useMutation(updateCampus, {
    onSuccess: () => {
      Swal.fire("Success", "Campus has been successfully updated.", "success");
      queryClient.invalidateQueries("getCampuses");
      setCampusId(0);
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Failed to updated Campus. \n Please try again",
        "error"
      );
    },
  });

  const handleDelete = (id) => {
    deleteMutate(id);
  };

  const handleUpdate = (id) => {
    const upDataViewData = updateView
      ? updateView?.filter((item) => item.id === id)
      : [];
    updateMutate(upDataViewData[0]);
  };

  const [searchValue, setSearchValue] = useState("");

  const filteredCampuses = updateView.filter((item) =>
    item.campus_Location.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="max-w-[450px]">
      <p className="text-lg font-semibold mb-4">Campuses</p>

      <Box
        sx={{
          width: "100%",
          marginBottom: "25px",
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label={
              <small className="font-medium capitalize tracking-wide text-sm">
                Add campus
              </small>
            }
          />
          <Tab
            label={
              <small className="font-medium capitalize tracking-wide text-sm">
                View Campuses
              </small>
            }
          />
        </Tabs>
      </Box>

      {value === 0 && (
        <div className="w-full">
          <div className="grid gap-3">
            <Input
              type="text"
              label="Campus"
              name="compus"
              className="max-w-sm"
              onChange={(e) => setCampus(e.target.value)}
              isRequired
            />

            <Button
              onClick={handleSubmit}
              size="lg"
              color="primary"
              className="max-w-[170px] mt-2 font-medium"
              isDisabled={AddCampusLoading}
            >
              {
                AddCampusLoading ? <span>Adding..</span>: <span>Add Campus</span>
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

            {filteredCampuses?.map((item, index) => (
              <div className="flex items-center gap-3" key={index}>
                <Input
                  type="text"
                  label="Campus"
                  name="campus"
                  className="max-w-full"
                  value={item.campus_Location || ""}
                  onChange={(e) => handleInputChange(index, e.target.value)}
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
                        onClick={() => handleUpdate(item.id)}
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
  );
};

export default Campus;
