"use client";
import React, { useMemo } from 'react';
import useSWR from "swr";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import AppLayout from "@/components/templates/AppLayout/AppLayout";
import Table from '@/components/UI/atoms/Table';

interface LogType {
  queue_id: number;
  message: string;
  date: string;
  log: string;
  status: string;
  user_id: number;
  user_name: string;
  user_email: string;
  user_phone_number: string;
  category_id: number;
  category_name: string;
  notification_id: number;
  notification_friendly_name: string;
  notification_name: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const cells = [
  {
    label: 'User',
    accessor: 'user_name',
  },
  {
    label: 'Date',
    accessor: 'date',
    format: (value: string | number) => new Intl.DateTimeFormat('default', {
      dateStyle: "short",
      timeStyle: "short"
    }).format(new Date(value)),
  },
  {
    label: 'Message',
    accessor: 'message',
  },
  {
    label: 'Log',
    accessor: 'log'
  },
  {
    label: 'Category',
    accessor: 'category_name',
  },
  {
    label: 'Notification',
    accessor: 'notification_name',
  },
  {
    label: 'Actions',
    render: () => (
      <>
        <Button>Resend</Button>
        <Button>Open details</Button>
      </>
    ),
  }
];
export default function HistoryPage() {
  const { data, error, isLoading } = useSWR<Array<LogType>>(
    "http://127.0.0.1:3001/v1/queue/history",
    fetcher
  );

  return (
    <AppLayout pageTitle="History" maxWidth="lg">
      <Grid item xs={6}>
        <Typography variant="h4">History log</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Here you can check the log of previous sent messages</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading && (
          <div>Loading...</div>
        )}
        {error && (
          <div>There was an error getting the log</div>
        )}
        {data && (
          <Table cells={cells} rows={data} idAccessor="queue_id" />
        )}
      </Grid>
    </AppLayout>
  )
}
