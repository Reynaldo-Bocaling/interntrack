import React, { useState } from "react";
import Modal from "../Modals/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import CustomAutocomplete from "../SelectCompany/SelectCompany";


const AddTrainer = (props) => {
  const { closeModal, isOpen, companies, onFormSubmit, isLoading } = props;

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState('')

  const handleCompanyChange = (event, newValue) => {
    setSelectedCompany(newValue);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

const trainerData = {
  company_id: selectedCompany ? selectedCompany.id : 0,
  companyName: selectedCompany ? selectedCompany.companyName : '',
  firstname: firstname,
  middlename: middleName,
  lastname: lastname,
  email: email,
  address: address,
  contact: contact,
  gender: gender,
}

const handleFormSubmit = async (e) => {
    e.preventDefault();
    onFormSubmit(trainerData);
  };
  return (
    <>
      {isOpen && (
        <Modal
          title={"Add New Trainer"}
          size=""
          closeModal={closeModal}
          content={
            <div className="mt-5 px-5">
              <div className="w-[270px] flex flex-col ">
                <small className="text-gray-400 tracking-wider mb-3 pl-1">
                  Company
                </small>

                <CustomAutocomplete
                  size={"w-[300px]"}
                  options={companies}
                  label="Choose a Company"
                  value={selectedCompany}
                  onChange={handleCompanyChange}
                  getOptionLabel={(option) => option.companyName}
                />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <small className="text-gray-400 tracking-wider">
                  Full Name
                </small>

                <div className="flex items-center gap-4">
                  <TextField
                    className="max-w-full w-full bg-white border-none rounded-lg"
                    label="Firstname"
                    id="outlined-size-small"
                    size="medium"
                    onChange={(e)=> setFirstname(e.target.value)}
                  />
                  <TextField
                    className="max-w-full w-full bg-white border-none rounded-lg"
                    label="Middle"
                    id="outlined-size-small"
                    size="medium"
                    onChange={(e)=> setMiddleName(e.target.value)}
                  />
                  <TextField
                    className="max-w-full w-full bg-white border-none rounded-lg"
                    label="Lastname"
                    id="outlined-size-small"
                    size="medium"
                    onChange={(e)=> setLastname(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className=" flex  gap-3 mt-3">
                  <div className="max-w-[60%] w-full">
                    <TextField
                      className="max-w-full w-full bg-white border-none rounded-lg "
                      label="Email"
                      placeholder="ex. Juan@gmail.com"
                      id="outlined-size-small"
                      size="medium"
                      onChange={(e)=> setEmail(e.target.value)}
                    />
                    
                  </div>
                  <div className="max-w-[40%] w-full">
                    
                    <TextField
                      className="max-w-full w-full bg-white border-none rounded-lg "
                      label="Contact No."
                      placeholder="ex. 09xxxxxxxxx"
                      id="outlined-size-small"
                      size="medium"
                      onChange={(e)=> setContact(e.target.value)}
                    />
                    
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-4">
                  <TextField
                    className="max-w-full w-full bg-white border-none rounded-lg"
                    label="Address"
                    placeholder="Brgy, City, Province"
                    id="outlined-size-small"
                    size="medium"
                    onChange={(e)=> setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={gender} // Ito ang nagdadala ng halaga ng RadioGroup
                    onChange={handleGenderChange}
                  >
                    <FormControlLabel
                      value="female"
                      className="text-gray-500"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      className="text-gray-500"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      className="text-gray-500"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="my-5 h-14 flex items-center gap-5 justify-end">
                <button className="text-white font-medium tracking-wide bg-blue-500 py-2 px-7 rounded-lg">
                  Cancel
                </button>
                <button
                  onClick={handleFormSubmit}
                  className="text-white font-medium tracking-wide bg-blue-500 py-2 px-7 rounded-lg"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default AddTrainer;
