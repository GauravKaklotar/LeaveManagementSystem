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

import { toast } from 'react-toastify';


import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

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

function createData(userId, username, email, position, mobile) {
  return {userId, username, email, position, mobile};
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const AHODList = () => {
  const navigate = useNavigate();

  const [centredModal, setCentredModal] = useState(false);
  const [userId, setUserId] = useState('');
  const toggleShow = () => setCentredModal(!centredModal);

  const [users, setUsers] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/user/deleteUser/${userId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      }
    });

    const data = await res.json();
    console.log(data);
    if (data.error) {
      toast.error(data.error);
    }
    else {
      toast.success(data.message);
      window.location.reload();
    }

    toggleShow();
  };

  useEffect(async () => {
    const res = await fetch('/api/user/allhod', {
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
    setUsers(reverseData);

  }, []);

  console.log(users);

  const rows = users.map((user) => {
    return createData(
      user._id,
      user.username,
      user.email,
      user.position,
      user.mobile
    );
  });

  console.log(rows);


  return (
    <>
      <ANavbar />
      <Box component="main" sx={{flexGrow: 1, p: 3, boxShadow: 5, mr: "2em", ml: "2em", mt: "2em"}}>
        {/* <DrawerHeader /> */}
        <Typography gutterBottom variant="h5" component="div" fontWeight={700} sx={{ color: "#007bff", textAlign: "center" }}>
          All Managers
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
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Position</StyledTableCell>
                    <StyledTableCell align="center">Mobie No</StyledTableCell>
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
                            {row.username}
                          </TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">{row.position}</TableCell>
                          <TableCell align="center">{row.mobile}</TableCell>
                          <TableCell align="center">
                            <Button aria-label="delete" onClick={() => {
                              toggleShow();
                              setUserId(row.userId);;
                            }}>
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


      {/* Delete */}
      <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Delete Leave</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>
                Are you sure you want to delete this user?
              </p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn color='danger' onClick={() => handleDelete(userId)}>Delete</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}

export default AHODList