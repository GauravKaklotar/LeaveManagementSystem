import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { MDBCol, MDBBtn, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './Settings.css';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const TrackLeave = () => {

  const {id} = useParams();

  const [formValues, setFormValues] = useState({
    leaveType: '',
    numOfDays: '',
    leaveStartDate: '',
    leaveDetails: '',
    hodStatus: '',
    hodRemark: '',
    adminStatus: '',
    adminRemark: '',
  });

  const [plainTextContent1, setPlainTextContent1] = useState("");
    const [plainTextContent2, setPlainTextContent2] = useState("");
    const [plainTextContent3, setPlainTextContent3] = useState("");

  useEffect(async () => {
    const res = await fetch(`/api/leave/getLeave/${id}`, {
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

    // setLeaves(data.Leave);
    setFormValues({
      leaveType: data.leaveTypeName,
      numOfDays: data.rest.numOfDays,
      leaveStartDate: data.rest.leaveStartDate,
      leaveDetails: data.rest.leaveDetails,
      hodStatus: data.rest.hodStatus,
      hodRemark: data.rest.hodRemark,
      adminRemark: data.rest.adminRemark,
      adminStatus: data.rest.adminStatus
    })

    const msg1 = data.rest.leaveDetails;
    const temp1 = msg1.replace(/<[^>]+>/g, "");
    setPlainTextContent1(temp1);

    const msg2 = data.rest.hodRemark;
    const temp2 = msg2.replace(/<[^>]+>/g, "");
    setPlainTextContent2(temp2);

    const msg3 = data.rest.adminRemark;
    const temp3 = msg3.replace(/<[^>]+>/g, "");
    setPlainTextContent3(temp3);
  }, []);

  return (
    <>
      <Navbar />
      {/* <Box height={3 + "vh"} /> */}
      <Box sx={{ display: 'flex' }}>
        <Box component="main" alignItems={'center'} sx={{ flexGrow: 1, p: 3, boxShadow: 5, mr: "2em", ml: "2em", mt: "2em" }}>
          <section style={{ backgroundColor: '#f4f5f7' }}> {/* className="vh-100" */}
            <MDBContainer className="py-5 h-100">
              <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol lg="6" className="mb-4 mb-lg-0">
                  <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                    <MDBRow className="g-0">
                      <MDBCol md="12">
                        <MDBCardBody className="p-4">
                          <MDBTypography tag="h6">Leave Information</MDBTypography>
                          <hr className="mt-0 mb-3" />

                          <MDBRow className="pt-1">
                            <MDBCol className="col-md-12 col-sm-12">
                              <MDBTypography tag="h6" className='mb-0'>Leave Type</MDBTypography>
                              <MDBCardText className="text-muted mb-3">{formValues.leaveType}</MDBCardText>
                            </MDBCol>
                            <MDBCol className="col-md-12 col-sm-12">
                              <MDBTypography tag="h6" className='mb-0'>No Of Days</MDBTypography>
                              <MDBCardText className="text-muted mb-3">{formValues.numOfDays}</MDBCardText>
                            </MDBCol>
                            <MDBCol className="col-md-12 col-sm-12">
                              <MDBTypography tag="h6" className='mb-0'>Start Date</MDBTypography>
                              <MDBCardText className="text-muted mb-3">{formValues.leaveStartDate}</MDBCardText>
                            </MDBCol>
                            <MDBCol className="col-md-12 col-sm-12">
                              <MDBTypography tag="h6" className='mb-0'>Leave Details</MDBTypography>
                              <MDBCardText className="text-muted mb-3">{plainTextContent1}</MDBCardText>
                            </MDBCol>
                            <MDBCol className="col-md-12 col-sm-12">
                              <MDBTypography tag="h6" className='mb-0'>Manager Status</MDBTypography>
                              <MDBCardText className="text-muted mb-3">{formValues.hodStatus}</MDBCardText>
                            </MDBCol>
                            <MDBCol className="col-md-12 col-sm-12">
                              <MDBTypography tag="h6" className='mb-0'>Manager Remark</MDBTypography>
                              <MDBCardText className="text-muted mb-3">{plainTextContent2}</MDBCardText>
                            </MDBCol>
                            <MDBCol className="col-md-12 col-sm-12">
                              <MDBTypography tag="h6" className='mb-0'>HR Status</MDBTypography>
                              <MDBCardText className="text-muted mb-3">{formValues.adminStatus}</MDBCardText>
                            </MDBCol>
                            <MDBCol className="col-md-12 col-sm-12">
                              <MDBTypography tag="h6" className='mb-0'>HR Remark</MDBTypography>
                              <MDBCardText className="text-muted mb-3">{plainTextContent3}</MDBCardText>
                            </MDBCol>
                          </MDBRow>

                          <center>
                            <MDBBtn onClick={() => {
                              window.history.back();
                            }} rounded className='mb-4 col-md-4' color='info'>
                              Back
                            </MDBBtn>
                          </center>
                        </MDBCardBody>
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </Box>
      </Box>
    </>
  )
}

export default TrackLeave
