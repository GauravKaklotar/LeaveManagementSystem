import { React, useState } from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
  MDBInputGroup,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { Typography } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// const NewLeave = () => {
//   return (
//     <>
//     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />
//         <h2>New Leave</h2>
//       </Box>
//     </>
//   )
// }

// export default NewLeave



export default function NewLeave() {

  const [formValue, setFormValue] = useState({
    fname: '',
    lname: '',
    email: '',
    title: '',
    state: '',
    noOfDays: '',
    startDate: '',
    endDate: '',
    leaveReason: '',
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box height={10 + "vh"} />
      <Box sx={{ display: 'flex' }}>
        <Box component="main" alignItems={'center'} sx={{ flexGrow: 1, p: 3, boxShadow: 5, mr: "2em", ml: "2em", mt: "5em" }}>
          <Typography gutterBottom variant="h5" component="div" fontWeight={700} sx={{ color: "grey", textAlign: "center", fontStyle: 'italic' }}>
            Apply For Leave
          </Typography>
          <DrawerHeader />
          <MDBValidation className='row g-3'>
            <MDBValidationItem feedback='First Name is required' invalid className='col-md-4'>
              <MDBInput
                value={formValue.fname}
                name='fname'
                onChange={onChange}
                id='validationCustom01'
                required
                label='First name'
              />
            </MDBValidationItem>
            <MDBValidationItem feedback='Last Name is required' invalid className='col-md-4'>
              <MDBInput
                value={formValue.lname}
                name='lname'
                onChange={onChange}
                id='validationCustom02'
                required
                label='Last name'
              />
            </MDBValidationItem>
            <MDBValidationItem feedback='Please choose a username.' invalid className='col-md-4'>
              <MDBInputGroup textBefore='@'>
                <input
                  type='text'
                  className='form-control'
                  id='validationCustomUsername'
                  placeholder='Username'
                  required
                />
              </MDBInputGroup>
            </MDBValidationItem>
            <MDBValidationItem className='col-md-6' feedback='Please provide a Title.' invalid>
              <MDBInput className='mt-sm-2'
                value={formValue.title}
                name='title'
                onChange={onChange}
                id='validationCustom03'
                required
                label='Title'
              />
            </MDBValidationItem>
            <MDBValidationItem className='col-md-6' feedback='This Field is requied.' invalid>
              <MDBInput className='mt-sm-2'
                value={formValue.noOfDays}
                name='noOfDays'
                onChange={onChange}
                type="number"
                id='validationCustom05'
                required
                label='Number Of Days'
              />
            </MDBValidationItem>
            <MDBValidationItem className='col-md-6' feedback='This Field is requied.' invalid>
              <MDBInput className='mt-sm-2'
                value={formValue.startDate}
                name='startDate'
                onChange={onChange}
                type="date"
                id='validationCustom05'
                required
                label='Start Date'
              />
            </MDBValidationItem>
            <MDBValidationItem className='col-md-6' feedback='This Field is requied.' invalid>
              <MDBInput className='mt-sm-2'
                value={formValue.endDate}
                name='endDate'
                onChange={onChange}
                type="date"
                id='validationCustom05'
                required
                label='End Date'
              />
            </MDBValidationItem>
            <MDBValidationItem feedback='Please enter a leave reason.' invalid className='col-md-12'>
              <MDBTextArea className='mt-sm-2'
                label='Leave Reason'
                value={formValue.leaveReason}
                name='leaveReason'
                onChange={onChange}
                id='textAreaExample'
                required
                rows={4}
              />
            </MDBValidationItem>
            <div className='col-12 mt-sm-4'>
              <center><MDBBtn type='submit'>Submit</MDBBtn></center>
            </div>
          </MDBValidation>
        </Box>
      </Box>
    </>
  );
}