import React from 'react'
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import {
  MDBDatatables,
} from 'mdb-react-ui-kit';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const PendingLeave = () => {
  return (
    <>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <h2>Pending Leave</h2>
      </Box>
    </>
  )
}

export default PendingLeave
