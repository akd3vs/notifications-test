import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Box from '@mui/material/Box';

interface FormProps {
  onSubmit: (formData: any) => void;
  children: React.ReactNode;
  formRef: React.MutableRefObject<HTMLFormElement | undefined>,
}

function Form({ onSubmit, children, formRef }: FormProps) {
  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{
      paddingTop: 3,
      width: '100%'
    }} ref={formRef}>
      <FormProvider {...methods}>
        {children}
      </FormProvider>
    </Box>
  );
}

export default Form;
