import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { addDateRange, getDateRange, updateDateRange } from "../../api/Api";
import { FiEdit3 } from "react-icons/fi";
import { MdEditOff } from "react-icons/md";
import Swal from "sweetalert2";
function SetupDates() {
  const queryClient = useQueryClient();
  const [isDisable, setIsDisable] = useState(true);

  const [values, setValues] = useState({
    start_date: "",
    end_date: "",
  });

  // get
  const { data } = useQuery({
    queryKey: ["getDateRange"],
    queryFn: getDateRange,
  });

  const { mutate } = useMutation(addDateRange, {
    onSuccess: () => {
      Swal.fire("Success", "Date range has been successfully added.", "success");
      queryClient.invalidateQueries('getDateRange')
    },
    onError: () => {
      Swal.fire("Error", "Failed to add date range. \n Please try again", "error");
    },
  });

  const { mutate: updatemMutate } = useMutation(updateDateRange, {
    onSuccess: () => {
      Swal.fire("Success", "Date range has been successfully updated.", "success");
      setIsDisable(true)
      queryClient.invalidateQueries('getDateRange')
    },
    onError: () => {
      Swal.fire("Error", "Failed to updated date range. \n Please try again", "error");
    },
  });

  const dateRange = data ? data : [];
  const [updateValues, setUpdateValues] = useState(dateRange[0]);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateChange = (e) => {
    const { value, name } = e.target;

    setUpdateValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setUpdateValues(dateRange[0]);
  }, [dateRange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(values);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updatemMutate(updateValues);
  };

  console.log(updateValues);
  return (
    <div>
      <div className="text-lg font-semibold mb-4">Date Range Setup</div>
      {dateRange.length > 0 ? (
        <div className="grid gap-3 max-w-[350px] w-full">
          <button
            onClick={() => setIsDisable(!isDisable)}
            className="w-full grid justify-end mb-3 "
          >
            {isDisable ? (
              <FiEdit3 size={20} className="text-green-600" />
            ) : (
              <MdEditOff size={20} className="text-red-500" />
            )}
          </button>

          <Input
            type="date"
            onChange={handleUpdateChange}
            label="Start Date"
            className="w-full"
            name="start_date"
            placeholder=" "
            value={updateValues?.start_date || ""}
            isDisabled={isDisable}
          />
          <Input
            type="date"
            onChange={handleUpdateChange}
            label="End Date"
            className="w-full"
            name="end_date"
            placeholder=" "
            value={updateValues?.end_date || ""}
            isDisabled={isDisable}
          />

          <Button
          onClick={handleUpdateSubmit}
            color="success"
            size="lg"
            className="w-full mt-2 font-medium text-white"
            isDisabled={isDisable}
          >
            Update Date
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-7 max-w-[650px]">
            <small className="text-red-500 tracking-wide">
              Please define the start and end dates for student timesheets. Once
              set, the system will automatically generate timesheets for
              students within this date range when you initiate the import and
              add student process.
            </small>
          
          <div className="grid gap-3 max-w-[350px] w-full">
            <Input
              type="date"
              onChange={handleChange}
              label="Start Date"
              className="w-full"
              name="start_date"
              placeholder=" "
            />
            <Input
              type="date"
              onChange={handleChange}
              label="End Date"
              className="w-full"
              name="end_date"
              placeholder=" "
            />

            <Button
              onClick={handleSubmit}
              color="primary"
              size="lg"
              className="w-full mt-2 font-medium"
              isDisabled={!values.start_date || !values.end_date}
            >
              Setup date
            </Button>
          </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SetupDates;
