import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import { Stack } from '@mui/material';
import './bg/Dashboard.css';
// import { margin } from '@mui/system';

import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Available", 10],
  ["Rejected", 3],
  ["Approved", 8],
  ["Pending", 2],
];

export const dataForColumnChart = [
  ["Element", "Count", { role: "style" }],
  ["Available", 10, "#2caaa5"], // RGB value
  ["Rejected", 3, "#bd5263"], // English color name
  ["Approved", 8, "#34de75"],
  ["Pending", 2, "color: #168bd0"], // CSS-style declaration
];

export const options = {
  // title: "My Daily Activities",
  is3D: true,
};

const Dashboard = () => {
  return (
    <>
      <Box height={80} />
      <Box sx={{ display: 'flex', marginRight: 6 }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <Card sx={{ maxWidth: 400 }} className="gradient2">
                <CardContent sx={{ p: 4 }}>
                  <div>
                    <EventAvailableIcon sx={{ color: "white" }} />
                  </div>
                  <Typography gutterBottom variant="h5" component="div" fontWeight={500} sx={{ color: "whitesmoke" }}>
                    10
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    fontWeight={4}
                    sx={{ color: '#ccd1d1' }}
                  >
                    Available Leave
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
                    2
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
                    8
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
                    3
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

          <Box height={30} />
          <Grid container spacing={5} >
            <Grid item xs={12} md={6}>
              <Card sx={{ maxWidth: 650 }}>
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
              <Card sx={{ maxWidth: 700 }}>
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

export default Dashboard
