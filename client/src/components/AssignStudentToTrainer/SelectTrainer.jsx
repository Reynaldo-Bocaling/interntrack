import React, { useState } from 'react'
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
function SelectTrainer(props) {
    const {options,selectItem , removeSlected} = props;
    const [selectedValue, setSelectedValue] = useState(null);


    const handleSelectChange = (event, newValue) => {
      setSelectedValue(newValue);
    };

    const handleAssign = () => {
      alert("sucessd")
       removeSlected()
        setSelectedValue(null)
    }
  return (
    <div>
      <div className="w-full p-3 pr-7 flex items-center gap-5">
        <div className='w-full'>
          <Autocomplete
            id="name-select-demo"
            className="w-full mt-5"
            options={options}
            autoHighlight
            getOptionLabel={(option) => option.name}
            value={selectedValue}
            onChange={handleSelectChange}

            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Avatar>{option.avatar}</Avatar>
                <h1 className="pl-3 text-gray-700 text-sm ">{option.name}</h1>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a Trainer"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        </div>


        <button
          disabled={selectItem.length === 0 || selectedValue === null}
          onClick={handleAssign}
          className={`${
            selectItem.length === 0|| selectedValue === null? "bg-slate-300 cursor-not-allowed" : "bg-blue-500"
          } flex items-center gap-1 text-xs text-white  px-4 py-2 rounded-full`}
        >
          <AiOutlineUsergroupAdd size={17} />
          <span className="font-semibold tracking-wider">Assign</span>
        </button>
      </div>
    </div>
  );
}

export default SelectTrainer
