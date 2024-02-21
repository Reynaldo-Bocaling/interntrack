import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { format, set } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { EditTimesheet } from "../../api/Api";
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";


function CustomizeTimesheet({ isOpen, onClose, id, formData, handleInputChange ,isDateMatch}) {
    
    const navigate = useNavigate();
  
    const { mutate } = useMutation({
      mutationFn: EditTimesheet,
      onSuccess: () => {
        Swal.fire(
            "Success",
            "Successfully Customized!",
            "success"
          ).then(() => {
            onClose()
            // navigate('/timeSheet')
          });
        
      },
      onError: () => {
        Swal.fire(
            "Error",
            "Invalid date range or wrong information provided. Please correct and try once more.",
            "error"
          );
      },
    });
  
    const handleEditTimesheet = () => {
    //   mutate({ id: items?.id, ...formData });
    mutate({id, ...formData});
    };
  

    
    return (
      <div>
        <Modal isOpen={isOpen} onOpenChange={onClose}>
          <ModalContent>
            {() => (
              <>
                <ModalHeader className=" text-base px-7">
                  <span>Customize Time</span>
                  
                </ModalHeader>
                <ModalBody>
                  <form className="flex flex-col items-center gap-3">
                    <Input
                      size="lg"
                      className="text-xs"
                      type="datetime-local"
                      name="timeIn"
                      value={formData.timeIn}
                      onChange={(e) =>
                        handleInputChange("timeIn", e.target.value)
                      }
                    />
                    <Input
                      size="lg"
                      className="text-xs"
                      type="datetime-local"
                      name="timeOut"
                      value={formData.timeOut}
                      onChange={(e) =>
                        handleInputChange("timeOut", e.target.value)
                      }
                    />
                    <Input
                      size="lg"
                      className="text-xs"
                      type="text" // Change to "text" for now to allow input of any characters
                      name="totalHours"
                      value={formData.totalHours}
                      onChange={(e) =>
                        handleInputChange("totalHours", e.target.value)
                      }
                    />
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" isDisabled={!isDateMatch} onPress={handleEditTimesheet}>
                    Update
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
  
  export default CustomizeTimesheet;