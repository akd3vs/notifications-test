import React, { useState, memo } from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container, { ContainerProps } from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import AppBar from "@/components/UI/molecules/AppBar";
import Drawer from "@/components/UI/molecules/Drawer";

import ListItems from './ListItems';

interface AppLayoutProps {
  children?: React.ReactNode;
  drawerWidth?: number;
  pageTitle: string;
  maxWidth?: ContainerProps['maxWidth'];
}

function AppLayout({ children, pageTitle, drawerWidth = 240, maxWidth = 'sm' }: AppLayoutProps) {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} pageTitle={pageTitle} />
      <Drawer open={open} toggleDrawer={toggleDrawer} listItems={<ListItems />} drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth={maxWidth} sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default memo(AppLayout);
