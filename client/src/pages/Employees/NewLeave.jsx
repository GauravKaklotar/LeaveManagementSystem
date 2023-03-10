import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { Typography } from '@mui/material';
import Navbar from './Navbar';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function NewLeave() {

  const navigate = useNavigate();
  

  // Jodit Editors
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const [value, setValue] = React.useState('');

  // const config = useMemo(
  // 	{
  // 		readonly: false, // all options from https://xdsoft.net/jodit/doc/,
  // 		placeholder: placeholder || 'Start typings...'
  // 	},
  // 	[placeholder]
  // );

  const [formValue, setFormValue] = useState({
    // uname: '',
    password: '',
    LeaveType: '',
    noOfDays: '',
    startDate: '',
    leaveReason: '',
  });

  const [username, setusername] = useState('');

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  formValue.leaveReason = content;

  useEffect(async () => {
    try{
      const res = await fetch('/api/getRole', {
        method : "GET",
        headers: { 
          "content-type": "application/json",
        },
      }); 
  
      const data = await res.json();
  
      if(data.Error)
      {
        window.location.href = "/login";
        // navigate('/login');
      }

      setusername(data.username);
  
    }
    catch(err)
    {
      console.log(err);
    }

  },[]);

  const onSubmit = async () => {

    console.log(formValue);

    const res = await fetch("/api/leave/createLeave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password : formValue.password, leaveType: formValue.LeaveType, numOfDays : formValue.noOfDays, leaveDetails : formValue.leaveReason, leaveStartDate : formValue.startDate
      })
    });
    
    const data = await res.json();

    if(data.error)
    {
      // window.alert(data.error);
      toast.error(data.error);
    }
    else
    {
      toast.success(data.message);
    }
    console.log(data);
  }


  return (
    <>
      <Navbar />
      {/* <Box height={10 + "vh"} /> */}
      <Box sx={{ display: 'flex' }}>
        <Box component="main" alignItems={'center'} sx={{ flexGrow: 1, p: 3, boxShadow: 5, mr: "2em", ml: "2em", mt: "2em" }}>
          <Typography gutterBottom variant="h5" component="div" fontWeight={700} sx={{ color: "#007bff", textAlign: "center" }}>
            Apply For Leave
          </Typography> 
          <DrawerHeader />
          <MDBValidation className='row g-3'>
            <MDBValidationItem tooltip feedback='Username is required' invalid className='col-md-4'>
              <MDBInput
                value={username}
                name='uname'
                // onChange={onChange}
                id='validationCustom01'
                required
                disabled={true}
                label='Username'
              />
            </MDBValidationItem>
            <MDBValidationItem tooltip feedback='Password is required' invalid className='col-md-4'>
              <MDBInput
                value={formValue.password}
                name='password'
                onChange={onChange}
                label='Password'
                id='validationCustom02'
                type='password'
                required

              />
            </MDBValidationItem>
            <MDBValidationItem className='col-md-4' tooltip feedback='This Field is requied.' invalid>
              <MDBInput
                value={formValue.noOfDays}
                name='noOfDays'
                onChange={onChange}
                type="number"
                id='validationCustom04'
                required
                label='Number Of Days'
              />
            </MDBValidationItem>
            <MDBValidationItem tooltip feedback='Please Select Leave Type.' invalid className='col-md-6'>
              {/* <MDBInput className='mt-sm-2'
                value={formValue.title}
                name='title'
                onChange={onChange}
                id='select'
                required
                label='Title'
              /> */}
              <MDBInput
                className='mt-sm-2'
                value={formValue.LeaveType}
                name='LeaveType'
                list='Leave Type'
                label="Leave Type"
                id='validationCustom03'
                onChange={onChange}
                required
              />
              <datalist id='Leave Type'>
                <option>Casual Leave</option>
                <option>Medical Leave</option>
                <option>Other</option>
              </datalist>
            </MDBValidationItem>
            <MDBValidationItem className='col-md-6' tooltip feedback='This Field is requied.' invalid>
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
            {/* <MDBValidationItem className='col-md-6' tooltip feedback='This Field is requied.' invalid>
              <MDBInput className='mt-sm-2'
                value={formValue.endDate}
                name='endDate'
                onChange={onChange}
                type="date"
                id='validationCustom06'
                required
                label='End Date'
              />
            </MDBValidationItem> */}
            <MDBValidationItem tooltip feedback='Please enter a leave reason.' invalid className='col-md-12'>
              {/* <div data-color-mode="light">
                <MDEditor required height={200} id='validationCustom07' value={formValue.leaveReason} onChange={setValue} />
              </div> */}
              {/* <MDBValidationItem tooltip feedback='Please enter a leave reason.' invalid className='col-md-12'> */}
              <JoditEditor
                ref={editor}
                name='leaveReason'
                value={formValue.leaveReason}
                // config={config}
                tabIndex={1} // tabIndex of textarea
                id='validationCustom07'
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => setContent(newContent)}
                required
              />
            </MDBValidationItem>
            <div className='col-12 mt-sm-6'>
              <center><MDBBtn type='submit' onClick={ onSubmit }>Submit</MDBBtn></center>
            </div>
          </MDBValidation>
        </Box>
      </Box>
    </>
  );
}