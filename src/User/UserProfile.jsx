

import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { NavLink } from "react-router-dom";
import axios from 'axios';

export default function UserProfilePage() {

    const [form, setForm] = useState([]);

    const win = sessionStorage.getItem("userName");
    const winid = sessionStorage.getItem("userId");
    console.log(winid);

    const loadAllUsers = async () => {
        await axios
            .get(`http://localhost:7737/user/GetByUserId/${winid}`)
            .then((res) => setForm(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadAllUsers();
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark user-profile-navbar">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="#">E-Tax Calculator Management System</a>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/userhome"><ArrowLeftIcon /> Back to Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/userprofile">{win} <AccountCircleIcon /></a>
                        </li>
                    </ul>
                </div>
            </nav>
            
            <section style={{ backgroundColor: 'whitesmoke' }}>
                <MDBContainer className="py-3 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="6" className="mb-4 mb-lg-3">
                            <MDBCard className="mb-6" style={{ borderRadius: '.8rem' }}>
                                <MDBRow className="g-0">
                                    <MDBCol md="4" className="d-flex flex-column align-items-center justify-content-center text-center gradient-custom text-black" 
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <MDBCardImage 
                                            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                                            alt="Avatar" 
                                            className="my-3" 
                                            style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
                                            fluid 
                                        />
                                        <MDBTypography tag="h5" className="mt-2"><b>{form.userName}</b></MDBTypography>
                                        <MDBCardText className="mt-3">
                                            <NavLink 
                                                to={`/useredit/${form.formId}`} 
                                                className="btn btn-sm btn-primary" 
                                                style={{ display: 'inline-flex', alignItems: 'center' }}
                                            >
                                                <EditNoteIcon style={{ marginRight: '5px' }} />
                                                <b>Edit your Information</b>
                                            </NavLink>
                                        </MDBCardText>
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <MDBCardBody className="p-4">
                                            <MDBTypography tag="h6"><b>Personal Information</b></MDBTypography>
                                            <hr className="mt-0 mb-4" />
                                            <MDBRow className="pt-1">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6"><b>Email</b></MDBTypography>
                                                    <MDBCardText className="text-muted">{form.userEmail}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6"><b>Phone</b></MDBTypography>
                                                    <MDBCardText className="text-muted">{form.userMobile}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr className="mt-0 mb-3" />
                                            <MDBRow className="pt-1">
                                                <MDBCol size="12" className="mb-4">
                                                    <MDBTypography tag="h6"><b>User Location</b></MDBTypography>
                                                    <MDBCardText className="text-muted">{form.userAddress}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
}
