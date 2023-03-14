import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "./bg/forgetPassword.svg";
import bgimg from "./bg/backimg.jpg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, forwardRef, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
// import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const Alert = forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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
  left: "37%",
};

export default function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const [role, setRole] = useState('');

  useEffect(() => {
    axios.get('/api/getRole').then((res) => {
      console.log(res);
      setRole(res.data.role);
      console.log(res.data.role);
      if(res.data.Error)
      {
        navigate('/login');
      }
    }).catch((Error) => {
      // console.log(Error);
      // navigate('/login');
    });
    
  }, []);

  console.log(role);

  const onSubmit = async (e) => {
    // e.preventDefault();

    console.log(e);

    let res;

    const { previousPassword, newPassword, cNewPassword} = e;

    if(role === "ADMIN") {
      res = await fetch("/api/user/updatePasswordByAdmin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          previousPassword, newPassword, confirmPassword: cNewPassword 
        })
      });
    }
    else
    {
      res = await fetch("/api/user/updatePassword", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        previousPassword, newPassword, confirmPassword: cNewPassword 
      })
    });
  }
    
    const data = await res.json();
    console.log(data);

    if(data.error)
    {
      toast.error(data.error);
    }
    else
    {
      toast.success(data.message);
      window.location.href = '/';
    }
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
                      <Avatar
                        sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography sx={{ml:"-35px", mt:"5px"}} component="h1" variant="h5">
                        Update Password
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            fullWidth
                            {...register("previousPassword", { required: true })}
                            name="previousPassword"
                            label="Previous Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                          />
                          {errors.previousPassword && (
                            <span
                              style={{ color: "#f7d643", fontSize: "12px" }}
                            >
                              This field is required
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            fullWidth
                            {...register("newPassword", { required: true })}
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                          />
                          {errors.newPassword && (
                            <span
                              style={{ color: "#f7d643", fontSize: "12px" }}
                            >
                              This field is required
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            fullWidth
                            {...register("cNewPassword", { required: true })}
                            name="cNewPassword"
                            label="Confirm New Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                          />
                          {errors.cNewPassword && (
                            <span
                              style={{ color: "#f7d643", fontSize: "12px" }}
                            >
                              This field is required
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth={true}
                            size="large"
                            sx={{
                              mt: "10px",
                              mr: "20px",
                              borderRadius: 28,
                              color: "#ffffff",
                              minWidth: "170px",
                              backgroundColor: "#FF9A01",
                            }}
                          >
                            Update
                          </Button>
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
