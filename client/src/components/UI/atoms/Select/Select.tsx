import React, { memo, useMemo } from 'react';

import { useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MUISelect, { SelectChangeEvent } from '@mui/material/Select';
import Typography from "@mui/material/Typography";
import FormHelperText from '@mui/material/FormHelperText';

export interface OptionType {
  value: string | number;
  label: string;
}

interface SelectProps {
  name: string;
  label: string;
  options: Array<OptionType>;
  required?: boolean | string;
}

function Select({ name, label, options, required = false }: SelectProps) {
  const { register, formState } = useFormContext();

  const hasError = !!formState.errors[name];
  const errorMessage = formState.errors[name];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth error={hasError}>
        <InputLabel id={`${name}-label`}>
          {label}
          {required && (
            <Typography
              component="span"
            > *</Typography>
          )}
        </InputLabel>
        <MUISelect
          labelId={`${name}-label`}
          id={name}
          label={label}
          {...register(name, {
            required,
          })}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </MUISelect>
        {hasError && (
          <FormHelperText><>{errorMessage && errorMessage.message}</></FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}

export default memo(Select);
