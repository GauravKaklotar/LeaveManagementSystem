import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import {cookie} from 'react-cookie';

import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
} from 'mdb-react-ui-kit';

export default function Navbar() {
    const [showBasic, setShowBasic] = useState(false);

    const navigate = useNavigate();

    const handleLogout = async () => {
        const res = await fetch('/api/logout', {
            method: "POST",
            headers: {
              "content-type": "application/json",
            }
          });
      
          const data = await res.json();
        //   console.log(data);
        if(data.error) {
            toast.error(data.error);
        }
        else
        {
            toast.success(data.message);
        }

        window.location.href='/login';
    };

    return (
        <MDBNavbar sticky expand='lg' dark bgColor='primary'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='/dashboard'>
                    <img
                        src='employee.png'
                        height='30'
                        alt=''
                        loading='lazy'
                    />
                </MDBNavbarBrand>

                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowBasic(!showBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar show={showBasic}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                            <MDBNavbarLink active aria-current='page' href='/dashboard'>
                                Dashboard
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag='a' active aria-current='page' className='nav-link' role='button'>
                                    Leave
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem link href="/leave">Leave</MDBDropdownItem>
                                    <MDBDropdownItem link href='/new-leave'>New Leave</MDBDropdownItem>
                                    <MDBDropdownItem link href='/accepted-leave'>Approved Leave</MDBDropdownItem>
                                    <MDBDropdownItem link href='/pending-leave'>Pending Leave</MDBDropdownItem>
                                    <MDBDropdownItem link href='/rejected-leave'>Rejected Leave</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink active aria-current='page' href='/settings'>Settings</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink active aria-current='page' onClick={handleLogout}>Logout</MDBNavbarLink>
                            {/* <MDBIcon onClick={()=>navigate('/login')} fas icon="sign-out ml-2 mt-3 lg" /> */}
                        </MDBNavbarItem>
                    </MDBNavbarNav>

                    <form className='d-flex input-group w-auto'>
                        <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
                        <MDBBtn color='info'>Search</MDBBtn>
                    </form>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}