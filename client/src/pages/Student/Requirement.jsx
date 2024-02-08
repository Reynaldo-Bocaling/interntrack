import React, { lazy, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
const UploadRequirement = lazy(()=> import("../../components/student-requirement/UploadRequiremen"));
const OpenRequirement = lazy(()=> import("../../components/student-requirement/OpenRequirement"));
import { deleteRequirement, getRequirement, uploadRequirement } from "../../api/Api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Button } from "@nextui-org/react";
import { IoIosAdd } from "react-icons/io";
import { DotLoading } from "../../components/spinners-loading/Spinner";

const Requirements = () => {
  const queryClient = useQueryClient();
  const [isOpenRequirement, setIsOpenRequirement] = useState(false);
  const [isAddRequirement, setIsAddRequirement] = useState(false);
  const [selectItem, setSelectItem] = useState({})

  const { data, isLoading } = useQuery({
    queryKey: ["getStudenRequirement"],
    queryFn: getRequirement,
  });

  const { mutate } = useMutation(uploadRequirement, {
    onSuccess: () => {
      Swal.fire(
        "Success",
        "New Requirements is successfully added.",
        "success"
      );
      queryClient.invalidateQueries({queryKey: ['getStudenRequirement']})
      setIsAddRequirement(false)
    },
    onError: () => {
      Swal.fire(
        "Error",
        "Failed to add the  Barangay Certificate. \n Please try again.",
        "error"
      );
    },
  });


  // delete mutate
  const {mutate:deleteMutate} = useMutation( deleteRequirement,
    {onSuccess: () => {
        Swal.fire(
            "Success",
            `${data?.type} is Successfully deleted`,
            "success"
          );
          queryClient.invalidateQueries({queryKey: ['getStudenRequirement']})
          setIsOpenRequirement(false)
    },
    onError: () => {
        Swal.fire(
            "Error",
            "Failed to Delete. \n Please try again.",
            "error"
          );
    }
})



  const handleAddCertificate = (formData) => {
    mutate(formData);
  };
  const handleDelete = (id) => {
    deleteMutate(id);
  };


  const handleOpenRequirement =  (item) => {
    setIsOpenRequirement(true)
    setSelectItem(item)
  }


  if(isLoading){
    return <DotLoading/>
  }
  return (
    <div className="mt-3 mb-8">
      <div className="flex items-center justify-between">
        <h1 className="pl-1 text-sm md:text-xl font-semibold">Requirements</h1>
        <Button 
        color="primary"
        onClick={()=>setIsAddRequirement(true)}
        >
          {" "}
          <IoIosAdd size={18} />
          Add Requirement
        </Button>
      </div>

      <div className="mt-7 flex flex-col gap-3">
        {
          data?.map((item, index) => (
            <div
            key={index}
            onClick={() => handleOpenRequirement(item)}
            className="p-5 bg-white flex items-center justify-between rounded-lg border shadow-lg shadow-slate-100 hover:border hover:border-blue-300 transition-all"
          >
            <span className="text-lged font-medium tracking-wide text-blue-500">
              {item.type}
            </span>
            <MdKeyboardArrowRight size={23} className="text-gray-400" />
          </div>
          ))
        }
      </div>

      <UploadRequirement
        opened={isAddRequirement}
        handleSubmit={handleAddCertificate}
        onClose={() => setIsAddRequirement(false)}
      />


<OpenRequirement 
opened={isOpenRequirement}
onClose={()=>setIsOpenRequirement(false)}
data={selectItem}
handleDelete={handleDelete}
/>
    </div>
  );
};

export default Requirements;
