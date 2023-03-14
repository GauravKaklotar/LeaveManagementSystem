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
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
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

export default function ForgetPassword() {
  const {email, otp} = useParams(); 
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

  const onSubmit = async (e) => {
    console.log(e);

    const {password, cPassword} = e
    const res = await fetch(`/api/resetPassword/${email}/${otp}`, {
      method : "post",
      headers: { 
        "content-type": "application/json",
      },
      body: JSON.stringify({
        password, cPassword
      })
    });

    const data = await res.json();
    console.log(data);
    if(data.message)
    {
      toast.success(data.message);
      navigate("/login");
    }
    else
    {
      toast.error(data.error);
      navigate(`/verifyOTP/${email}`);
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
                      <Typography sx={{ml:"-35px", mt:"5px", mb:'10px'}} component="h1" variant="h5">
                        New Password
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            fullWidth
                            {...register("password", { required: true })}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                          />
                          {errors.password && (
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
                            {...register("cPassword", { required: true })}
                            name="cPassword"
                            label="Confirm Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                          />
                          {errors.cPassword && (
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
                            Submit
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
