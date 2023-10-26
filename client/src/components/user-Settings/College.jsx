import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCollege, getCampus } from "../../api/Api";
import Swal from "sweetalert2";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { FiEdit2,FiTrash2 } from "react-icons/fi";
import { MdEditOff } from "react-icons/md";


function College() {
  const queryClient = useQueryClient()
  const [campusId, setCampusId] = useState(0);
  const [value, setValue] = useState(0);
  const [formValues, setFormValues] = useState({
    college_description: "",
    campus_id: 0,
  });

  const [campus_id, setCampus_id] = useState(null)

  const { data: campuses } = useQuery({
    queryKey: ["getCampuses"],
    queryFn: getCampus,
  });

  const { mutate } = useMutation(addCollege, {
    onSuccess: () => {
      Swal.fire("Success", "College has been successfully added.", "success");
      setFormValues(null);
      queryClient.invalidateQueries("getCampuses")
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Failed to add college. The campus may already exist or the format is invalid. \n Please review and try again.",
        "error"
      );
    },
  });

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
    setValue(newValue);
  };



  const getCollegeList = newCampuses
  ?.flatMap(({ college }) => college)
  .map(({ id, college_description, campus, program }) => ({
    id,
    college_description,
    campusName: campus?.campus_Location,
    program,
    campus_id: campus?.id,
  }))
  .filter((item) => campus_id === null || item.campus_id === Number(campus_id));


  

  return (
    <div className="max-w-[450px]">
      <p className="text-lg font-semibold mb-4">Add College</p>

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

      {value === 0 && (
        <div className="w-full">
          <div className="grid gap-3">
            <Select
              label="Campus"
              className="max-w-full"
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
              className="max-w-full"
              onChange={handleChange}
              isRequired
            />

            <Button
              onClick={handleSubmit}
              color="primary"
              size="lg"
              className="max-w-full mt-2 font-medium"
            >
              Add College
            </Button>
          </div>
        </div>
      )}

{value === 1 && (
        <div className="w-full">
          <div className="scrollBar h-[300px] overflow-y-auto flex flex-col gap-2">
            <Select
              label="Select Campus"
              className="max-w-full"
              size="sm"
              isRequired
              onChange={(e)=> setCampus_id(e.target.value)}
              name="campus_id"
            >
              {newCampuses &&
                newCampuses.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.campus_Location}
                  </SelectItem>
                ))}
            </Select>

            {
              getCollegeList.length > 0 ?
            getCollegeList.map((item, index) => (
              <div className="flex items-center gap-3" key={index}>
                <Input
                  type="text"
                  label={item.campusName}
                  className="max-w-full"
                  value={item.college_description}
                  isDisabled={campusId !== item.id}
                />

                <button>
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
            )) : <>No College</>}
          </div>
        </div>
      )}
    </div>
  );
}

export default College;
