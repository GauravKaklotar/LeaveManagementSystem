// import { React} from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "./bg/otp.svg";
import bgimg from "./bg/backimg.jpg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, forwardRef, useRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styled from 'styled-components';

import OTPInput, { ResendOTP } from "otp-input-react";


import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';


// import { MuiOtpInput } from 'mui-one-time-password-input'

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});


const OtpInput = styled.input`
  border: none;
  border-bottom: 2px solid #ccc;
  font-size: 24px;
  margin: 0 8px;
  padding: 8px;
  text-align: center;
  width: 50px;

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }


  &:focus {
    outline: none;
    border-color: #00c3ff;
  }
`;

const OtpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px;
`;



const boxstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    height: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
};

const center = {
    position: "relative",
    top: "50%",
    left: "30%",
};

export default function OTP() {

    const [otp, setOtp] = useState('');

    const inputs = useRef([]);

    const handleOtpChange = (index, event) => {
        const { value } = event.target;
        const inputLength = inputs.current.length;
        const nextIndex = index + 1;
        const prevIndex = index - 1;

        if (value.length === 1 && index < inputLength - 1) {
            inputs.current[nextIndex].focus();
        } else if (value.length === 0 && index > 0) {
            inputs.current[prevIndex].focus();
        }

        const otp = inputs.current.map(input => input.value).join('');
        setOtp(otp);
        console.log('OTP:', otp);
    };

    const handleOtpKeyDown = (index, event) => {
        const { key } = event;

        if (key === 'Backspace' && index > 0 && !inputs.current[index].value) {
            inputs.current[index - 1].focus();
        }
    };

    const handleVerifyClick = () => {
        console.log('OTP:', otp);
        // Do the verification logic here using the otp state
      };    





    const [open, setOpen] = useState(false);
    // const [remember, setRemember] = useState(false);
    const vertical = "top";
    const horizontal = "right";
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
    }


    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                TransitionComponent={TransitionLeft}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                    OTP has been sent to your email.
                </Alert>
            </Snackbar>
            <div
                style={{
                    backgroundImage: `url(${bgimg})`,
                    backgroundSize: "cover",
                    height: "100vh",
                    color: "#f5f5f5",
                }}
            >
                <Box sx={boxstyle}>
                    <Grid container>
                        <Grid item xs={12} sm={12} lg={6}>
                            <Box
                                style={{
                                    backgroundImage: `url(${bg})`,
                                    backgroundSize: "cover",
                                    marginTop: "40px",
                                    marginLeft: "15px",
                                    marginRight: "15px",
                                    height: "63vh",
                                    color: "#f5f5f5",
                                }}
                            ></Box>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <Box
                                style={{
                                    backgroundSize: "cover",
                                    height: "70vh",
                                    minHeight: "500px",
                                    backgroundColor: "#3b33d5",
                                }}
                            >
                                <ThemeProvider theme={darkTheme}>
                                    <Container>
                                        <Box height={35} />
                                        <Box sx={center}>
                                            <Typography component="h1" variant="h4">
                                                Verify OTP
                                            </Typography>
                                        </Box>
                                        <Box sx={{ mt: 2 }} />
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                                                    <OtpContainer>
                                                        {[...Array(4)].map((_, index) => (
                                                            <OtpInput
                                                                key={index}
                                                                ref={el => inputs.current[index] = el}
                                                                type="tel"
                                                                inputMode="numeric"
                                                                maxLength="1"
                                                                onChange={event => handleOtpChange(index, event)}
                                                                onKeyDown={event => handleOtpKeyDown(index, event)}
                                                            />
                                                            
                                                        ))}
                                                    </OtpContainer>


                                                </Grid>
                                                <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        fullWidth="true"
                                                        size="large"
                                                        // onClick={toggleShow} 
                                                        onClick={handleVerifyClick}
                                                        sx={{
                                                            mt: "15px",
                                                            mr: "20px",
                                                            borderRadius: 28,
                                                            color: "#ffffff",
                                                            minWidth: "170px",
                                                            backgroundColor: "#FF9A01",
                                                        }}
                                                    >
                                                        Verify OTP
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                                                    <Stack direction="row" spacing={2}>
                                                        <Typography
                                                            variant="body1"
                                                            component="span"
                                                            style={{ marginTop: "10px" }}
                                                        >
                                                            Login to your Account.
                                                            <span
                                                                style={{ color: "#beb4fb", cursor: "pointer" }}
                                                                onClick={() => {
                                                                    navigate("/login");
                                                                }}
                                                            >
                                                                {" "}
                                                                Sign In
                                                            </span>
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Container>
                                </ThemeProvider>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </div>

        </>
    );
}
