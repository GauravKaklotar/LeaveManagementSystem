import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts(props) {
  console.log("It's working");
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">Faild! {props.e}</Alert>
      {/* <Alert severity={stack}>{error}</Alert>
      <Alert severity={stack}>{error}</Alert>
      <Alert severity={stack}>{error}</Alert> */}
    </Stack>
  );
}