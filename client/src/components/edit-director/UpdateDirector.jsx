import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Input} from '@nextui-org/react';
import {useMutation} from '@tanstack/react-query'
import { updateDirect } from "../../api/Api";

export default function UpdateDictor({isOpen, isClose, data}) {
    const [formData, setFormData] = useState(data);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const direactorInfo = [
        {
            id:1,
            type: 'text',
            label: 'firstname',
            value: formData.firstname
        },
        {
            id:2,
            type: 'text',
            label: 'lastname',
            value: formData.lastname
        },
        {
            id:2,
            type: 'number',
            label: 'contact',
            value: formData.contact
        },
        {
            id:2,
            type: 'email',
            label: 'email',
            value: formData.email
        },
      
    ]


    const {mutate} = useMutation({
        mutationFn: updateDirect,
        onSuccess: ()=>{
            alert('Success')
        },
        onError: ()=>{

alert('error')
        }
    })

    const handleClick = (e) =>{
        e.preventDefault();

        mutate(formData)
    }


    return (

   
    <>

      <Modal isOpen={isOpen} onOpenChange={isClose}>
        <ModalContent>
          {(isClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update Director</ModalHeader>
              <ModalBody>
               <div className="flex flex-col gap-3">
                {
                    direactorInfo.map((item, index)=> (
                        <Input key={index} type={item.type} value={item.value} name={item.label} onChange={handleChange} label={item.label} />
                    ))
                }
               
               </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={isClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleClick}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
