import React from "react";
import picture from "../../assets/images/dp.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddDirectorAccount, getDirectorList } from "../../api/Api";
import AddDirector from "../../components/addDirector/AddDirector";
import { Button, useDisclosure } from "@nextui-org/react";
import { logout } from "../../api/Api";
import { useNavigate } from "react-router-dom";




const Director = () => {
  const queryClient = useQueryClient();
const navigate = useNavigate()
  const {
    isOpen: AddIsOpen,
    onOpen: AddOnOpen,
    onClose: AddOnClose,
  } = useDisclosure();


  const {mutate} = useMutation({
    mutationFn: AddDirectorAccount,
    onSuccess: (data) => {
      console.log({username: data.username, password: data.password});
      queryClient.invalidateQueries({queryKey: ['directorInfo']})
    },
    onError: ()=> {
      alert('error');
    }
  })

  const handleSubmit = (directorData) => {
    mutate(directorData)
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["directorInfo"],
    queryFn: getDirectorList,
  });

  
  if (isLoading) {
    return <span>Loading</span>;
  }






  

  

  return (
    <div>
      {data ? (
        <div className="max-w-[900px] mx-auto py-12 flex items-center justify-center gap-7">
          <div className="bg-blue-500 w-[300px] h-[300px]  overflow-hidden rounded-full flex items-center justify-center">
            <img src={picture} alt="" />
          </div>

          <div className="max-w-[420px] w-full grid gap-7">
            <div>
              <h1 className="text-[2.2rem] font-bold mb-3 flex items-center gap-3">
                <span className="capitalize">{data[0].firstname}</span>
                <span className="capitalize">{data[0].lastname}</span>
              </h1>
              <small className="text-blue-500 font-semibold">Director</small>
            </div>
            <div className="grid gap-3">
              <div className="grid grid-cols-3 justify-start">
                <p>Email:</p> <span>{data[0].email}</span>
              </div>
              <div className="grid grid-cols-3 justify-start">
                <p>Contact:</p> <span>{data[0].contact}</span>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <Button color="primary" className="w-[130px]">
                  Edit
                </Button>
                <Button className="w-[130px] text-red-500 font-medium tracking-wide bg-[rgba(250,0,0,0.2)]">
                  Drop
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" max-w-[900px] mx-auto my-20 flex items-center flex-col justify-center gap-5 p-10">
          <span className="text-[1.5rem] text-gray-500">
            No director have been registered yet
          </span>
          <Button color="primary" size="lg" onPress={AddOnOpen}>
            Add Director
          </Button>
        
        
           {/* modal components */}
          <AddDirector
            submit={handleSubmit}
            AddIsOpen={AddIsOpen}
            AddOnClose={AddOnClose}
          />
        </div>
      )}
    </div>
  );
};

export default Director;
