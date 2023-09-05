import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Box from '@mui/material/Box';









function SelectCompany(props) {
    const {options, placeholder} = props;
    const [selectedValue, setSelectedValue] = useState(null);


    const handleSelectChange = (event, newValue) => {
      setSelectedValue(newValue);
    };
  return (
    <div>
      <div className='w-full'>
          <Autocomplete
            id="name-select-demo"
            className="w-full mt-3 "
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
                label={placeholder}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        </div>
    </div>
  )
}

export default SelectCompany
