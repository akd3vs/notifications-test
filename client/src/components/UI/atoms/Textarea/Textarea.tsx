import React from 'react';

import { useFormContext } from "react-hook-form";

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";

interface TextareaProps {
  name: string;
  label: string;
  rows?: number;
  defaultValue?: string;
  required?: boolean | string;
  minLength?: number;
}

function Textarea({ name, label, rows = 4, defaultValue = '', required = false, minLength = 1 }: TextareaProps) {
  const { register, formState } = useFormContext();

  const hasError = !!formState.errors[name];
  const errorMessage = formState.errors[name];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <TextField
          id={name}
          label={label}
          rows={rows}
          defaultValue={defaultValue}
          required={!!required}
          error={hasError}
          helperText={<>{errorMessage && errorMessage.message}</>}
          multiline
          {...register(name, {
            required,
            minLength,
            validate: (value) => {
              if (required) {
                return !!value.trim() || (typeof required === 'string' ? required : false)
              }

              return true;
            },
          })}
        />
      </FormControl>
    </Box>
  );
}

export default Textarea;
