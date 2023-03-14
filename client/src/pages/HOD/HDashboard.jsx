import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import './HDashboard.css';


import HNavbar from './HNavbar';

import { Chart } from "react-google-charts";

const HDashboard = () => {
  const navigate = useNavigate();

  const [total, setTotal] = React.useState(0);
  const [pending, setPending] = React.useState(0);
  const [approved, setApproved] = React.useState(0);
  const [rejected, setRejected] = React.useState(0);

  const data = [
    ["Task", "Hours per Day"],
    ["Total", total],
    ["Rejected", rejected],
    ["Pending", pending],
    ["Approved", approved],
  ];
  
   const dataForColumnChart = [
    ["Element", "Count", { role: "style" }],
    ["Total", total, "#2caaa5"], // RGB value
    ["Rejected", rejected, "#bd5263"], // English color name
    ["Approved", approved, "#34de75"],
    ["Pending", pending, "color: #168bd0"], // CSS-style declaration
  ];
  
   const options = {
    // title: "My Daily Activities",
    is3D: true,
  };

  useEffect(async () => {
    try{
      const res = await fetch('/api/leave/getAllLeaveCountsByHOD', {
        method : "GET",
        headers: { 
          "content-type": "application/json",
        },
      }); 
  
      const data = await res.json();

      console.log(data);
  
      if(data.Error)
      {
        window.location.href = "/login";
        // navigate('/login');
      }

      setApproved(data.approved);
      setPending(data.pending);
      setRejected(data.rejected);
      setTotal(data.total);
    }
    catch(err)
    {
      console.log(err);
    }
    
  }, []);

  return (
    <>
      <HNavbar />
      {/* <Box height={80} /> */}
      <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <Card sx={{ maxWidth: 400 }} className="gradient2">
                <CardContent sx={{ p: 4 }}>
                  <div>
                    <EventAvailableIcon sx={{ color: "white" }} />
                  </div>
                  <Typography gutterBottom variant="h5" component="div" fontWeight={500} sx={{ color: "whitesmoke" }}>
                    {total}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    fontWeight={4}
                    sx={{ color: '#ccd1d1' }}
                  >
                    Total Leave
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ maxWidth: 400 }} className="gradient1">
                <CardContent sx={{ p: 4 }}>
                  <div>
                    <PendingActionsIcon sx={{ color: "white" }} />
                  </div>
                  <Typography gutterBottom variant="h5" component="div" fontWeight={500} sx={{ color: "whitesmoke" }}>
                    {pending}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    fontWeight={4}
                    sx={{ color: "#ccd1d1" }}
                  >
                    Pending Leave
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ maxWidth: 400 }} className="gradient3">
                <CardContent sx={{ p: 4 }}>
                  <div>
                    <DoneAllIcon sx={{ color: "white" }} />
                  </div>
                  <Typography gutterBottom variant="h5" component="div" fontWeight={500} sx={{ color: "whitesmoke" }}>
                    {approved}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    fontWeight={4}
                    sx={{ color: "#ccd1d1" }}
                  >
                    Approved Leave
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ maxWidth: 400 }} className="gradient4">
                <CardContent sx={{ p: 4 }}>
                  <div>
                    <ThumbDownIcon sx={{ color: "white" }} />
                  </div>
                  <Typography gutterBottom variant="h5" component="div" fontWeight={500} sx={{ color: "whitesmoke" }}>
                    {rejected}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    fontWeight={4}
                    sx={{ color: "#ccd1d1" }}
                  >
                    Rejected Leave
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box height={50} />
          <Grid container spacing={5} >
            <Grid item xs={12} md={6}>
              <Card sx={{ maxWidth: 750 }}>
                <CardContent >
                  <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"400px"}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ maxWidth: 750 }}>
                <CardContent>
                  <Chart chartType="ColumnChart" width="100%" height="400px" data={dataForColumnChart} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default HDashboard
