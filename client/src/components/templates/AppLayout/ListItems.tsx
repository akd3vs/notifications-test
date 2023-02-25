import React from 'react';
import Link from 'next/link'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';

function ListItems() {
  return (
    <React.Fragment>
      <ListItemButton component={Link} href="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Homepage (Form)" />
      </ListItemButton>
      <ListItemButton component={Link} href="/history">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="History" />
      </ListItemButton>
    </React.Fragment>
  );
}

export default ListItems;
