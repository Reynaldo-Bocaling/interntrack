import React, { useState } from 'react'
import Modal from '../Modals/Modal'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import PhoneNumber from '../forms/InputText/PhoneNumber';
import SelectCompany from '../SelectCompany/SelectCompany';

const AddTrainer = (props) =>  {

    const { closeModal, isOpen } = props;
    const [age, setAge] = React.useState('');
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
      };





      const trainerList = [
        { id: 1, name: "Neust", totalStudent: "20 Students" },
        { id: 2, name: "7Eleven", totalStudent: "18 Students" },
        { id: 3, name: "SM", totalStudent: "23 Students" },
        { id: 4, name: "Pacific", totalStudent: "16 Students" },
        { id: 5, name: "Newsstar", totalStudent: "14 Students" },
      ];



      companies: [
        {
          id: 1,
          name: "7-Eleven",
          areasOfAssignment: [
            { id: 1, name: "Cashier", slots: 5 },
            { id: 2, name: "OAR", slots: 3 },
          ],
        },
        {
          id: 2,
          name: "SM",
          areasOfAssignment: [
            { id: 1, name: "Guard", slots: 3 },
            { id: 2, name: "Office", slots: 7 },
          ],
        },
      ];




      const [selectedCompany, setSelectedCompany] = useState(null);
      const [selectedAreaOfAssignment, setSelectedAreaOfAssignment] = useState(null);
      const [trainerName, setTrainerName] = useState('');
      const [trainerContact, setTrainerContact] = useState('');
      const [trainerEmail, setTrainerEmail] = useState('');


const filteredAreasOfAssignment =
    selectedCompany ? selectedCompany.areasOfAssignment : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCompany && selectedAreaOfAssignment && trainerName && trainerContact && trainerEmail) {
      // Mag-collect ng impormasyon ng trainer
      const newTrainer = {
        company: selectedCompany.name,
        area: selectedAreaOfAssignment.name,
        name: trainerName,
        contact: trainerContact,
        email: trainerEmail,
      };

      // I-output ang collected na data sa console log
      console.log('New Trainer Data:', newTrainer);

      // Dapat dito ay isasave mo ito sa iyong backend o database
    } else {
      console.error('Please fill in all fields.');
    }
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
                <div className="w-[270px]">
                <small className="text-gray-400 tracking-wider">
                    Full Name
                  </small>

                  <SelectCompany
                    options={trainerList}
                    placeholder={"Select company"}
                  />
                </div>

                <div className="mt-5 flex flex-col gap-4">
                  <small className="text-gray-400 tracking-wider">
                    Full Name
                  </small>

                  <div className="flex items-center gap-4">
                    <TextField
                      className="max-w-full w-full bg-white border-none rounded-lg"
                      label="Firstname"
                      id="outlined-size-small"
                      size="small"
                    />
                    <TextField
                      className="max-w-full w-full bg-white border-none rounded-lg"
                      label="Middle"
                      id="outlined-size-small"
                      size="small"
                    />
                    <TextField
                      className="max-w-full w-full bg-white border-none rounded-lg"
                      label="Lastname"
                      id="outlined-size-small"
                      size="small"
                    />
                  </div>
                </div>

                {/* <div className='mt-5'>
                            <TextField
                                className='max-w-full w-full bg-white border-none rounded-lg'
                                label="Email"
                                id="outlined-size-small"
                                size="small"
                            />
                        </div> */}
                <div className="mt-5">
                  <div className=" flex items-center gap-3 mt-3">
                    <div className="max-w-1/2 w-full flex flex-col gap-3">
                      <small className="text-gray-400 tracking-wider">
                        Email
                      </small>
                      <TextField
                        className="max-w-full w-full bg-white border-none rounded-lg "
                        label="Email"
                        id="outlined-size-small"
                        size="small"
                      />{" "}
                    </div>
                    <div className="max-w-1/2 w-full  flex flex-col gap-3">
                      <small className="text-gray-400 tracking-wider">
                        Contact
                      </small>
                      <PhoneNumber />{" "}
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  <small className="text-gray-400 tracking-wider">
                    Address
                  </small>
                  <div className="flex items-center gap-4">
                    <TextField
                      className="max-w-full w-full bg-white border-none rounded-lg"
                      label="Address"
                      id="outlined-size-small"
                      size="small"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
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

                {/* <div className="mt-7">
                  <FormControl className="w-full" size="small">
                    <InputLabel className="bg-white">Department</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>CICT Office</MenuItem>
                    </Select>
                  </FormControl>
                </div> */}

                <div className="my-5 h-14 flex items-center gap-5 justify-end">
                  <button className="text-white font-medium tracking-wide bg-blue-500 py-2 px-7 rounded-lg">
                    Cancel
                  </button>
                  <button className="text-white font-medium tracking-wide bg-blue-500 py-2 px-7 rounded-lg">
                    Submit
                  </button>
                </div>
              </div>
            }
          />
        )}
      </>
    );
}

export default AddTrainer
