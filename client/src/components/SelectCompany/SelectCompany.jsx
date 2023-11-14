import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

const CustomAutocomplete = (props) => {
  const {
    isOptionEqualToValue,
    options,
    label,
    value,
    onChange,
    size,
    getOptionLabel,
  } = props;
  return (
    <Autocomplete
      className={size}
      options={options}
      getOptionLabel={getOptionLabel}
      value={value}
      isOptionEqualToValue={isOptionEqualToValue}
      onChange={onChange}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Avatar>{option.avatar}</Avatar>
          <h1 className="pl-3 text-gray-700 text-sm">
            {getOptionLabel(option)}
          </h1>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
};

export default CustomAutocomplete;
