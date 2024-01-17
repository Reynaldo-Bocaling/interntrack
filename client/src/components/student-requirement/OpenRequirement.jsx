import React, { useState } from "react";
import { Drawer } from "@mantine/core";
import { Button, Tooltip, Textarea, image } from "@nextui-org/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {useMutation} from '@tanstack/react-query'
import { deleteRequirement } from "../../api/Api";
import Swal from "sweetalert2";


const OpenRequirement = ({data, opened, onClose,handleDelete}) => {

    const [id, setId] = useState(0)



    
    if(!data) {
        return <>Waiting</>
    }


  return (
    <div>
      <Drawer
        position="bottom"
        size="100%"
        opened={opened}
        onClose={onClose}
        title={
          <header className="mt-2">
            <span className="text-xl font-semibold">{data?.type}</span>
          </header>
        }
      >
        <div className="w-full pt-3  pb-10 px-7">
        <img src={data?.imageUrl} alt="" className="max-w-full my-7 mx-auto" />

            <Button 
            size="lg" className="text-red-500 font-medium bg-[rgba(246,194,194,0.4)] w-full"
            onClick={()=>handleDelete(data?.id)}
            >Delete</Button>
        </div>
          
       
      </Drawer>
    </div>
  );
};

export default OpenRequirement;
