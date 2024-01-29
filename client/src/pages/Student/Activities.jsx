import React, { lazy, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
const FilterTask = lazy(()=> import("../../components/StudentTaskStyle/FilterTask"));
import { Button, Tooltip,Textarea  } from "@nextui-org/react";
import { Drawer } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadTask, getTask } from "../../api/Api";
import Swal from "sweetalert2";
import { IoWarning } from "react-icons/io5";
import { AiOutlineCloudUpload  } from "react-icons/ai";
const groupTasksByMonth = (tasks) => {
  const groupedTasks = {};
  tasks.forEach((task) => {
    const month = task.date.split("-")[1];
    if (!groupedTasks[month]) {
      groupedTasks[month] = [];
    }
    groupedTasks[month].push(task);
  });
  return groupedTasks;
};

const Activities = () => {
  const [addTask, setAddTask] = useState(false);
  const [File, setFile] = useState(null);
  const [Preview, setPreview] = useState(null);
  const [values, setValues] = useState({
    date: "",
    desc: "",
  });
  const queryClient = useQueryClient();

  const handleOnchane = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { data } = useQuery({
    queryKey: ["getTask"],
    queryFn: getTask,
  });

  const { mutate } = useMutation(uploadTask, {
    onSuccess: (dt) => {
      console.log(dt);
      Swal.fire(
        "Success",
        "You've Successfully Submitted the activity",
        "success"
      );
      setAddTask(false);
      queryClient.invalidateQueries({ queryKey: ["getTask"] });
    },
    onError: (dt) => {
      console.log(dt);
      Swal.fire(
        "Error",
        "Failed to submit the activity \n Please try again",
        "error"
      );
    },
  });

  const loadingImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { desc, date } = values;
    // const formData = new FormData();
    // formData.append("image", File);
    // formData.append("description", desc);
    // formData.append("date", date);

      mutate({description: desc, date})
    // mutate(formData);
  };

  const taskList = data ? data : [];

  const groupedTasks = groupTasksByMonth(taskList && taskList);

  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <h1 className="pl-1 text-xl font-semibold">Upload task</h1>
        <Button
          onClick={() => setAddTask(true)}
          color="primary"
          className="flex items-center gap-1 text-xs px-5 rounded-full"
        >
          <MdOutlineAdd size={18} />
          Add Task
        </Button>
      </div>

      {data ? (
        Object.keys(groupedTasks).map((month) => (
          <FilterTask key={month} month={month} tasks={groupedTasks[month]} />
        ))
      ) : (
        <h1 className="my-10 text-center">No Upload</h1>
      )}

      <Drawer
        opened={addTask}
        onClose={() => setAddTask(false)}
        title="Upload Task"
        position="bottom"
        size="85%"
      >
        {/* <div className="text-red-500 flex flex-col items-center gap-4">
        <IoWarning size={50} />
          <p className="text-lg text-center tracking-wider">
            <b>Apologies</b>, the upload feature is temporarily unavailable. We are
            working to resolve the issue and appreciate your patience.
          </p>{" "}
        </div> */}
        <div className="w-full h-full py-10 px-4">
          {!Preview ? (
            <Tooltip content="Browse Image" closeDelay={0}>
              <button className=" uploadMoa h-[200pxa]  relative overflow-hidden text-sm  w-full flex flex-col items-center justify-center gap-2">
                <AiOutlineCloudUpload size={30} className="text-blue-500" />
                <span className="text-base "> Upload Moa</span>
                <input
                  type="file"
                  onChange={loadingImage}
                  className="absolute scale-[3] opacity-0 cursor-pointer"
                />
              </button>
            </Tooltip>
          ) : (
            <div className=" h-[200px]  bg-gray-100 rounded-lg p-2  relative overflow-hidden text-sm  w-full flex flex-col items-center justify-center ">
              <img src={Preview} alt="" className="" />
              <input
                type="file"
                onChange={loadingImage}
                className="absolute scale-[3] opacity-0 cursor-pointer"
              />
            </div>
          )}

          <div className=" mt-5 bg-gray-100 py-2 px-3">
            <input
              type="date"
              className="bg-gray-100"
              name="date"
              onChange={handleOnchane}
            />
          </div>

          <Textarea
            isRequired
            onChange={handleOnchane}
            name="desc"
            label="Description"
            labelPlacement="outside"
            placeholder="Enter your description"
            className="w-full mt-10"
          />

          <Button
            onClick={handleSubmit}
            color="primary"
            className="rounded-full w-full mt-7 py-5"
            size="lg"
          >
            Upload Task
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default Activities;
