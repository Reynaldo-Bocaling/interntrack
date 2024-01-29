import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { Input, Button } from "@nextui-org/react";
import { format } from "date-fns";
import Swal from "sweetalert2";


export default function App({ onClose, isOpen, handleCustom,currentTime , time}) {
  const [customtTime, setCustomtTime] = useState("");
const formattedTime = format(currentTime, "EEE MMM d yyyy");



const handleSubmit = ()=> {
    handleCustom(customtTime)
    Swal.fire(
        "Success",
        "successfully Change time \n Lets start to time log!",
        "success"
      ).then(()=> onClose());

    
}

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
            
              <ModalHeader className="flex flex-col gap-1">
                Time Logs
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center justify-center gap-5 pt-5 pb-10">
                 {
                    customtTime &&  (
                        <div>
                        <p>{ format(customtTime, 'hh:mm:a')}</p>
                        <small>{"( set Time )"}</small>
                        </div>
                    )
                 }
                
                  <Input
                    size="lg"
                    type="time"
                    onChange={(e) => setCustomtTime(new Date(`${formattedTime} ${e.target.value}`))}
                  />
                  <Button
                    onClick={handleSubmit}
                    color="primary"
                    size="lg"
                    className="w-[150px] font-medium tracking-wide"
                  >
                    Set
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
