import React from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { MDBCol, MDBBtn, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './ASettings.css';
import ANavbar from './ANavbar';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const ASettings = () => {
  return (
    <>
      <ANavbar />
      {/* <Box height={3 + "vh"} /> */}
      <Box sx={{ display: 'flex' }}>
        <Box component="main" alignItems={'center'} sx={{ flexGrow: 1, p: 3, boxShadow: 5, mr: "2em", ml: "2em", mt: "2em" }}>
          <section style={{ backgroundColor: '#f4f5f7' }}> {/* className="vh-100" */}
            <MDBContainer className="py-5 h-100">
              <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol lg="6" className="mb-4 mb-lg-0">
                  <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                    <MDBRow className="g-0">
                      <MDBCol md="4" className="gradient-custom text-center text-white"
                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                        <MDBTypography tag="h5">John</MDBTypography>
                        <MDBCardText>ADMIN</MDBCardText>
                        <MDBIcon onClick={()=>window.alert("Edit")} far icon="edit mb-5" />
                      </MDBCol>
                      <MDBCol md="8">
                        <MDBCardBody className="p-4">
                          <MDBTypography tag="h6">Information</MDBTypography>
                          <hr className="mt-0 mb-4" />
                          <MDBRow className="pt-1">
                            <MDBCol size="12" className="mb-4">
                              <MDBTypography tag="h6">Username</MDBTypography>
                              <MDBCardText className="text-muted">John</MDBCardText>
                            </MDBCol>
                            <MDBCol size="12" className="mb-4">
                              <MDBTypography tag="h6">Email</MDBTypography>
                              <MDBCardText className="text-muted">info@example.com</MDBCardText>
                            </MDBCol>
                            <MDBCol size="12" className="mb-4">
                              <MDBTypography tag="h6">Phone</MDBTypography>
                              <MDBCardText className="text-muted">123 456 789</MDBCardText>
                            </MDBCol>
                            <MDBCol size="12" className="mb-4">
                              <MDBTypography tag="h6">Role</MDBTypography>
                              <MDBCardText className="text-muted">ADMIN</MDBCardText>
                            </MDBCol>
                          </MDBRow>

                          <MDBBtn onClick={()=>window.alert("Change Password")} rounded className='mb-4' color='info'>
                            Change Password
                          </MDBBtn>

                          <div className="d-flex justify-content-start">
                            <a href="#!"><MDBIcon fab icon="facebook me-4" size="lg" /></a>
                            <a href="#!"><MDBIcon fab icon="twitter me-4" size="lg" /></a>
                            <a href="#!"><MDBIcon fab icon="instagram me-4" size="lg" /></a>
                          </div>
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

export default ASettings
