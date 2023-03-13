import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import { tableCellClasses } from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from "@material-ui/core/Button";


import { MDBBtn } from 'mdb-react-ui-kit';

import ANavbar from './ANavbar';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function createData(uname, leaveType, noOfDays, startDate, hodStatus, adminStatus) {
  return { uname, leaveType, noOfDays, startDate, hodStatus, adminStatus };
}

// const rows = [
//   createData('Gaurav', "Medical Leave", 8, "25/10/23", "Accept", "Reject"),
//   createData('Romin', "Causel Leave", 5, "25/10/23", "Reject", "Accept"),
//   createData('Gaurav', "Medical Leave", 4, "25/10/23", "Accept", "Reject"),
//   createData('Romin', "Causel Leave", 2, "25/10/23", "Reject", "Accept"),
//   createData('Gaurav', "Medical Leave", 5, "25/10/23", "Accept", "Reject"),
//   createData('Romin', "Causel Leave", 6, "25/10/23", "Reject", "Accept"),
//   createData('Gaurav', "Medical Leave", 7, "25/10/23", "Accept", "Reject"),
//   createData('Romin', "Causel Leave", 12, "25/10/23", "Reject", "Accept"),
//   createData('Gaurav', "Medical Leave", 4, "25/10/23", "Accept", "Reject"),
//   createData('Romin', "Causel Leave", 5, "25/10/23", "Reject", "Accept"),
//   createData('Gaurav', "Medical Leave", 9, "25/10/23", "Accept", "Reject"),
//   createData('Romin', "Causel Leave", 1, "25/10/23", "Reject", "Accept"),
//   createData('Gaurav', "Medical Leave", 2, "25/10/23", "Accept", "Reject"),
//   createData('Romin', "Causel Leave", 5, "25/10/23", "Reject", "Accept"),
//   createData('Gaurav', "Medical Leave", 3, "25/10/23", "Accept", "Reject"),
//   createData('Romin', "Causel Leave", 8, "25/10/23", "Reject", "Accept"),

// ];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const ARejectedLeave = () => {
  const navigate = useNavigate();

  const [leaves, setLeaves] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(async () => {
    const res = await fetch('/api/leave/rejectedLeavesByAdmin', {
      method: "GET",
      headers: {
        "content-type": "application/json",
      }
    });

    const data = await res.json();
    console.log(data);
    if (data.Error) {
      window.location.href = '/login';
    }


    const reverseData = data.map((item, index) => data[data.length - index - 1]);
    setLeaves(reverseData);


    // console.log(leaves);


  }, []);

  console.log(leaves);

  const rows = leaves.map((leave) => {
    return createData(
      leave.username,
      leave.leaveTypeName,
      leave.rest.numOfDays,
      leave.rest.leaveStartDate,
      leave.rest.hodStatus,
      leave.rest.adminStatus
    );
  });

  console.log(rows);


  return (
    <>
      <ANavbar />
      <Box component="main" sx={{flexGrow: 1, p: 3, boxShadow: 5, mr: "2em", ml: "2em", mt: "2em"}}>
        {/* <DrawerHeader /> */}
        <Typography gutterBottom variant="h5" component="div" fontWeight={700} sx={{ color: "#007bff", textAlign: "center" }}>
          Rejected Leave
        </Typography>
        <Box sx={{ height: 3 + "vh" }} />
        <form className='d-flex input-group w-auto col-md-4'>
                        <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
                        <MDBBtn color='info'>Search</MDBBtn>
        </form>
        <Box sx={{ height: 3 + "vh" }} />
        <Box sx={{ width: '100%', align: "center", mr: '10em' }}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{maxHeight: 500}} component={Paper}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow sx={{ background: "yellow" }}>
                    <StyledTableCell>Username</StyledTableCell>
                    <StyledTableCell align="center">Leave Type</StyledTableCell>
                    <StyledTableCell align="center">No of Days</StyledTableCell>
                    <StyledTableCell align="center">Start Date</StyledTableCell>
                    <StyledTableCell align="center">HOD Status</StyledTableCell>
                    <StyledTableCell align="center">Admin Status</StyledTableCell>
                    <StyledTableCell align="center" sx={{minWidth: 160}}>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          key={row.name}
                          tableIndex={-1}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.uname}
                          </TableCell>
                          <TableCell align="center">{row.leaveType}</TableCell>
                          <TableCell align="center">{row.noOfDays}</TableCell>
                          <TableCell align="center">{row.startDate}</TableCell>
                          {row.hodStatus === "Pending" && <TableCell align="center" sx={{ color: 'blue' }}>{row.hodStatus}</TableCell>}
                          {row.hodStatus === "Approved" && <TableCell align="center" sx={{ color: 'green' }}>{row.hodStatus}</TableCell>}
                          {row.hodStatus === "Rejected" && <TableCell align="center" sx={{ color: 'red' }}>{row.hodStatus}</TableCell>}
                          {row.adminStatus === "Pending" && <TableCell align="center" sx={{ color: 'blue' }}>{row.adminStatus}</TableCell>}
                          {row.adminStatus === "Approved" && <TableCell align="center" sx={{ color: 'green' }}>{row.adminStatus}</TableCell>}
                          {row.adminStatus === "Rejected" && <TableCell align="center" sx={{ color: 'red' }}>{row.adminStatus}</TableCell>}
                          <TableCell align="center">
                            <Button aria-label="edit" onClick={() => window.alert("Edit")}>
                              <EditIcon />
                            </Button>
                            <Button aria-label="delete" onClick={() => window.alert("Delete")}>
                              <DeleteIcon />
                            </Button>
                          </TableCell>

                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              sx={{ mt: 1, mr:5}}
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Box>
    </>
  )
}

export default ARejectedLeave