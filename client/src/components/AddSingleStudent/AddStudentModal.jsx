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

const AddStudentModal = (props) =>  {

    const { closeModal, isOpen } = props;
    const [age, setAge] = React.useState('');
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
      };


    return (
    <>
      {
        isOpen && (
            <Modal 
                title={'Add New Student'} 
                size=""
                closeModal={closeModal}
                content={
                    <div className='px-5 py-3'>
                        <div>
                            <TextField
                                className='max-w-[250px] w-full bg-white border-none rounded-lg'
                                label="Student no."
                                id="outlined-size-small"
                                size="small"
                                placeholder='ex. ( SUM2020-02837 )'
                            />
                        </div>

                        <div className='mt-5 flex flex-col gap-4'>
                            <small className='text-gray-400 tracking-wider'>Full Name</small>

                            <div className='flex items-center gap-4'>
                                <TextField
                                    className='max-w-full w-full bg-white border-none rounded-lg'
                                    label="Firstname"
                                    id="outlined-size-small"
                                    size="small"
                                />
                                <TextField
                                    className='max-w-full w-full bg-white border-none rounded-lg'
                                    label="Middle"
                                    id="outlined-size-small"
                                    size="small"
                                />
                                <TextField
                                    className='max-w-full w-full bg-white border-none rounded-lg'
                                    label="Lastname"
                                    id="outlined-size-small"
                                    size="small"
                                />
                            </div>
                        </div>

                        <div className='mt-5'>
                            <TextField
                                className='max-w-full w-full bg-white border-none rounded-lg'
                                label="Email"
                                id="outlined-size-small"
                                size="small"
                            />
                        </div>

                        <div className='mt-5 flex flex-col gap-3'>
                            <small className='text-gray-400 tracking-wider'>Address</small>
                            <div className='flex items-center gap-4'>
                                <TextField
                                    className='max-w-full w-full bg-white border-none rounded-lg'
                                    label="Province"
                                    id="outlined-size-small"
                                    size="small"
                                />
                                <TextField
                                    className='max-w-full w-full bg-white border-none rounded-lg'
                                    label="City"
                                    id="outlined-size-small"
                                    size="small"
                                />
                                <TextField
                                    className='max-w-full w-full bg-white border-none rounded-lg'
                                    label="Barangay"
                                    id="outlined-size-small"
                                    size="small"
                                />
                            </div>
                        </div>

                        <div className='mt-5'>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="female" className='text-gray-500' control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" className='text-gray-500' control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" className='text-gray-500' control={<Radio />} label="Other" />
                                   
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className='mt-5'>
                                <PhoneNumber  />                      
                        </div>


                        <div className='mt-5 flex flex-col gap-3'>
                            <small className='text-gray-400 tracking-wider'>Birthday</small>
                            <div className='flex items-center gap-3'>
                                <TextField
                                    className='max-w-[65%] w-full bg-white border-none rounded-lg'
                                    label="Birthday"
                                    id="outlined-size-small"
                                    size="small"
                                    placeholder='ex. ( 09489946337 )'
                                />
                                <TextField
                                    disabled
                                    className='max-w-[35%] w-full bg-white border-none rounded-lg'
                                    
                                    id="outlined-size-small"
                                    size="small"
                                    value={'age: 21'}
                                />

                            </div>
                        </div>

                        <div className='mt-7'>
                            <FormControl className='w-full' size="small">
                                <InputLabel className='bg-white'>Department</InputLabel>
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
                        </div>


                        <div className='mt-5 h-14 flex items-center gap-5 justify-end'>
                            <button className='text-white font-medium tracking-wide bg-blue-500 py-2 px-7 rounded-lg'>Cancel</button>
                            <button className='text-white font-medium tracking-wide bg-blue-500 py-2 px-7 rounded-lg'>Submit</button>
                        </div>
                    </div>
                }
            />
        )
      }
    </>
  )
}

export default AddStudentModal
