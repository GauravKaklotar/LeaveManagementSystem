import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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

import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import { MDBSelect } from 'mdb-react-ui-kit';

import { Typography } from '@mui/material';
import ANavbar from './ANavbar';
import { useParams } from 'react-router-dom';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


export default function AEditLeave() {

    const [selectedOption, setSelectedOption] = useState('');

    const { id } = useParams();
    console.log(id);

    const navigate = useNavigate();

    const [editorContent, setEditorContent] = useState("");

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };

    const handleSubmit = () => {
        // Use editorContent as a string in your submit handler
        console.log("Editor content:", editorContent);
    };

    // const config = useMemo(
    // 	{
    // 		readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    // 		placeholder: placeholder || 'Start typings...'
    // 	},
    // 	[placeholder]
    // );

        const handleChangeForHOD = (event) => {
        // errors.position = event.target.value;
        // formValue.hodStatus = event.target.value;
        setFormValue({...formValue, hodStatus: event.target.value});
      };

      const handleChangeForAdmin = (event) => {
        // errors.position = event.target.value;
        // formValue.adminStatus = event.target.value;
        setFormValue({...formValue, adminStatus: event.target.value});
      };


    const [formValue, setFormValue] = useState({
        username: '',
        password: '',
        LeaveType: '',
        noOfDays: '',
        startDate: '',
        leaveReason: '',
        hodRemark: '',
        adminRemark: '',
        adminStatus: '',
        hodStatus: '',
    });

    const [formattedStartDate, setFormattedStartDate] = useState("");

    
    const [plainTextContents, setPlainTextContents] = useState("");
    const [plainTextContentsOfHod, setPlainTextContentsOfHod] = useState("");

    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    formValue.adminRemark = editorContent;


    useEffect(async () => {
        try {
            const res = await fetch('/api/getRole', {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            });

            const data = await res.json();

            if (data.Error) {
                window.location.href = "/login";
                // navigate('/login');
            }

            //   setusername(data.username);

        }
        catch (err) {
            console.log(err);
        }

    }, []);


    useEffect(async () => {
        try {
            const res = await fetch(('/api/leave/getLeave/' + id), {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            });

            const data = await res.json();
            console.log(data);

            if (data.Error) {
                window.location.href = "/login";
                // navigate('/login');
            }

            const dateString = data.rest.leaveStartDate;
            const dateObj = new Date(dateString);
            const formattedDate = dateObj.toLocaleDateString("en-GB");
            console.log(formattedDate);
            setFormattedStartDate(formattedDate);
            setFormValue({
                username: data.username,
                noOfDays: data.rest.numOfDays,
                LeaveType: data.leaveTypeName,
                startDate: formattedDate,
                adminStatus: data.rest.adminStatus,
                adminRemark: data.rest.adminRemark,
                hodRemark: data.rest.hodRemark,
                hodStatus: data.rest.hodStatus,
            });

            const msg = data.rest.leaveDetails;
            setEditorContent(data.rest.adminRemark);

            const plainTextContent = msg.replace(/<[^>]+>/g, "");
            console.log(plainTextContent);
            setPlainTextContents(plainTextContent);

            const msg1 = data.rest.hodRemark;
            const plainTextContent1 = msg1.replace(/<[^>]+>/g, "");
            setPlainTextContentsOfHod(plainTextContent1);



        }
        catch (err) {
            console.log(err);
        }
    }, []);

    const onSubmit = async () => {

        console.log(formValue);

        const res = await fetch(("/api/leave/updateStatusByAdmin/" + id), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                password: formValue.password, leaveType: formValue.LeaveType, numOfDays: formValue.noOfDays, leaveStartDate: formValue.startDate, hodStatus: formValue.hodStatus, hodRemark: formValue.hodRemark, adminRemark: formValue.adminRemark, adminStatus: formValue.adminStatus
            })
        });

        const data = await res.json();

        if (data.error) {
            // window.alert(data.error);
            toast.error(data.error);
        }
        else {
            toast.success(data.message);
        }
        console.log(data);
    }


    return (
        <>
            <ANavbar />
            {/* <Box height={10 + "vh"} /> */}
            <Box sx={{ display: 'flex' }}>
                <Box component="main" alignItems={'center'} sx={{ flexGrow: 1, p: 3, boxShadow: 5, mr: "2em", ml: "2em", mt: "2em" }}>
                    <Typography gutterBottom variant="h5" component="div" fontWeight={700} sx={{ color: "#007bff", textAlign: "center" }}>
                        Edit Leave
                    </Typography>
                    <DrawerHeader />
                    <MDBValidation className='row g-3'>
                        <MDBValidationItem tooltip feedback='Username is required' invalid className='col-md-4'>
                            <MDBInput
                                value={formValue.username}
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
                                disabled={true}
                                onChange={onChange}
                                type="number"
                                id='validationCustom04'
                                required
                                label='Number Of Days'
                            />
                        </MDBValidationItem>
                        <MDBValidationItem tooltip feedback='Please Select Leave Type.' invalid className='col-md-6'>
                            <MDBInput
                                disabled={true}
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
                        <MDBValidationItem tooltip feedback='Start Date is required' invalid className='col-md-6'>
                            <MDBInput
                                value={formValue.startDate}
                                name='startDate'
                                className='mt-sm-2'
                                // onChange={onChange}
                                id='validationCustom01'
                                required
                                disabled={true}
                                label='startDate'
                            />
                        </MDBValidationItem>
                        <MDBValidationItem tooltip feedback='Leave Reason is required' invalid className='col-md-6'>
                            <MDBInput
                                value={plainTextContents}
                                name='leaveReason'
                                className='mt-sm-2'
                                type="textarea"
                                id='validationCustom01'
                                required
                                disabled={true}
                                label='Leave Reason'
                            />
                        </MDBValidationItem>
                        <MDBValidationItem tooltip feedback='Leave Reason is required' invalid className='col-md-6'>
                            <MDBInput
                                value={plainTextContentsOfHod}
                                name='hodRemark'
                                className='mt-sm-2'
                                type="textarea"
                                id='validationCustom01'
                                required
                                disabled={true}
                                label='Manager Remark'
                            />
                        </MDBValidationItem>
                        <MDBValidationItem tooltip feedback='Admin Status is required' invalid className='col-md-6'>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" className='col-md-6'>
                                    HR Status
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formValue.adminStatus}
                                    label="Choose Status"
                                    size="small"
                                    onChange={handleChangeForAdmin}
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Rejected">Rejected</MenuItem>
                                    <MenuItem value="Approved">Approved</MenuItem>
                                </Select>
                            </FormControl>
                        </MDBValidationItem>
                        <MDBValidationItem tooltip feedback='Admin Status is required' invalid className='col-md-6'>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" className='col-md-6'>
                                    Manager Status
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formValue.hodStatus}
                                    label="Choose Status"
                                    size="small"
                                    disabled={true}
                                    onChange={handleChangeForHOD}
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Rejected">Rejected</MenuItem>
                                    <MenuItem value="Approved">Approved</MenuItem>
                                </Select>
                            </FormControl>
                        </MDBValidationItem>
                        <MDBValidationItem tooltip feedback='Please enter a leave reason.' invalid className='col-md-12'>
                            <JoditEditor
                                value={editorContent}
                                // config={{ readonly: false }}
                                tabIndex={1}
                                // onBlur={(newContent) => setEditorContent(newContent)}
                                onChange={(newContent) => setEditorContent(newContent)}
                            />
                        </MDBValidationItem>
                        <div className='col-12 mt-sm-6'>
                            <center><MDBBtn type='submit' onClick={onSubmit}>Submit</MDBBtn></center>
                        </div>
                    </MDBValidation>
                </Box>
            </Box>
        </>
    );
}