"use client";
import React, { useCallback, useMemo, useState, useRef } from "react";
import useSWR from "swr";

import AppLayout from "@/components/templates/AppLayout/AppLayout";

import From from '@/components/UI/atoms/Form';
import Textarea from '@/components/UI/atoms/Textarea';
import Select, { OptionType } from '@/components/UI/atoms/Select';

import CategoryType from '@/types/CategoryType';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface FormDataType {
  category: number;
  message: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [isSubmitLoading, submitLoading] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>();
  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };
  const { data: categories, error: categoriesError, isLoading: categoriesAreLoading } = useSWR<Array<CategoryType>>(
    "http://127.0.0.1:3001/v1/categories",
    fetcher
  );
  const optionsCategories = useMemo<Array<OptionType>>(() => {
    const output: Array<{ value: string | number, label: string}> = [];

    if (!categoriesAreLoading && !categoriesError && categories && categories.length > 0) {
      categories.forEach((category) => {
        output.push({
          value: category.id,
          label: category.name,
        });
      });
    }

    return output;
  }, [categoriesAreLoading, categoriesError, categories]);

  const onSubmit = useCallback(async (formData: FormDataType) => {
    submitLoading(true);
    const { category, message } = formData;
    const response = await fetch("http://localhost:3001/v1/queue/message", {
      method: "PUT",
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category,
        message,
      }),
    });

    if (response.status === 201) {
      submitLoading(false);
      setAlertOpen(true);
      if (formRef && formRef.current && formRef.current.reset) {
        formRef.current.reset();
      }
    }
  }, []);

  return (
    <AppLayout pageTitle="Homepage">
      <Typography variant="h4">Notifications test</Typography>
      <Typography variant="h5">Here you can send a notification to the specified category and all users that are subscribed to said category will receive the message on the channel specified by them</Typography>
      <From onSubmit={onSubmit} formRef={formRef}>
        <Grid container spacing={3} columnSpacing={{ xs: 3 }}>
          <Grid item xs={12}>
            <Select name="category" label="Category" options={optionsCategories} required="Must select a category" />
          </Grid>
          <Grid item xs={12}>
            <Textarea name="message" label="Message" required="Must specify a message" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" disabled={isSubmitLoading}>Submit</Button>
          </Grid>
        </Grid>
      </From>

      <Snackbar open={isAlertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          Message sent successfully!
        </Alert>
      </Snackbar>
    </AppLayout>
  )
}
