import React, { useState } from "react";
import { Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  Button, 
  Input ,
  Select, 
  SelectItem
} from "@nextui-org/react";

import { getCampus } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";

const CustomModal = ({onSubmit , AddIsOpen, AddOnClose   }) => {

  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);


  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    contact: "",
  });

  const { data: CampusList } = useQuery({
    queryKey: ["getCampus"],
    queryFn: getCampus,
  });


  const campus = CampusList;
  const college = selectedCampus
    ? campus.find((college) => college.id === parseInt(selectedCampus))
    : [];
  const program = selectedCollege
    ? college.college.find(
        (program) => program.id === parseInt(selectedCollege)
      )
    : [];
  const major = selectedCollege
    ? program.program.find(
        (major) => major.id === parseInt(selectedProgram)
      )
    : [];


  const handleCampusChange = (e) => {
    setSelectedCampus(e.target.value);
    setSelectedCollege(null);
    setSelectedProgram(null);
    setSelectedMajor(null);
  };
  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
    setSelectedProgram(null);
    setSelectedMajor(null);
  };
  const handleProgramChange = (e) => {
    setSelectedProgram(e.target.value);
    setSelectedMajor(null);
  };
  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
  };


    

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


      const handleSubmit = (e) => {
        e.preventDefault();

        const campus = {
          campus: college.campus_Location,
          college: program.college_description,
          program: major.program_description,
          major: selectedMajor
        };

        onSubmit({...formData, ...campus})
      }
   
  return (
    <>
      <Modal
        isOpen={AddIsOpen}
        onOpenChange={AddOnClose}
        placement="top-center"
        className="max-w-[800px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-base font-semibold flex flex-col gap-1">
                Add Teacher Form
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-4 px-2">
                  <div className="flex items-center gap-4">
                    <Input
                      type="text"
                      label="First Name"
                      name="firstname"
                      onChange={handleChange}
                      size="sm"
                      isRequired
                      className="w-[40%]"
                    />

                     <Input
                      type="text"
                      label="Last Name"
                      name="lastname"
                      onChange={handleChange}
                      size="sm"
                      isRequired
                      className="w-[40%]"
                    />

                    <Input
                      type="text"
                      label={<p>MI <span className="text-[#a8a9a9]">(Optional)</span></p>}
                      name="middlename"
                      onChange={handleChange}
                      size="sm"
                      className="w-[20%]"
                    />
                   
                  </div>
                  <div className="flex items-center gap-4">
                    <Input
                      type="text"
                      label="Email"
                      name="email"
                      onChange={handleChange}
                      size="sm"
                      isRequired
                      className="w-[60%]"
                    />
                    <Input
                      type="text"
                      label="Contact no."
                      name="contact"
                      onChange={handleChange}
                      size="sm"
                      isRequired
                      className="w-[40%]"
                    />
                  </div>
                  
                    
                  <div className="flex items-center gap-3">
                    <Select
                      label="Campus"
                      className="max-w-xs"
                      size="sm"
                      isRequired
                      onChange={handleCampusChange}
                    >
                      {campus &&
                        campus.map(({ id, campus_Location }) => (
                          <SelectItem key={id}>{campus_Location}</SelectItem>
                        ))
                       }
                    </Select>

                    <Select
                      label=" College"
                      className="max-w-xs"
                      size="sm"
                      isRequired
                      onChange={handleCollegeChange}
                      isDisabled={!selectedCampus}
                    >
                      {selectedCampus &&
                        college.college.map(({ id, college_description }) => (
                          <SelectItem key={id}>
                            {college_description}
                          </SelectItem>
                        ))}
                    </Select>

                    <Select
                      label=" Program"
                      className="max-w-xs"
                      size="sm"
                      isRequired
                      onChange={handleProgramChange}
                      isDisabled={!selectedCollege}
                    >
                      {selectedCollege &&
                        program.program.map(({id, program_description }) => (
                          <SelectItem key={id}>
                            {program_description}
                          </SelectItem>
                        ))}
                    </Select>

                    <Select
                      label="Major"
                      className="max-w-xs"
                      size="sm"
                      isRequired
                      onChange={handleMajorChange}
                      isDisabled={!selectedCollege}
                    >
                      {selectedProgram &&
                        major.major.map(({ major_description }) => (
                          <SelectItem key={major_description}>
                            {major_description}
                          </SelectItem>
                        ))}
                    </Select>
                  </div>

                  <div className="mt-5 mb-2 flex items-center gap-3 justify-end">
                    <Button color="danger" variant="flat" onPress={AddOnClose} className="font-medium tracking-wide px-2">
                      Cancel
                    </Button>
                    <Button type="submit" color="primary" className="font-medium tracking-wide px-8">
                      Submit
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
