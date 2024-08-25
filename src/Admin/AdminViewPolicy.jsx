

import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Swal from "sweetalert2";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle } from "mdb-react-ui-kit";

const AdminViewPolicy = () => {
    const [policy, setPolicy] = useState([]);
    const win = sessionStorage.getItem("adminName");
    const [click, setClick] = React.useState(false);

    const handleClick = () => setClick(!click);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:7737/taxpolicies/getAllPoliciesList");
                setPolicy(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    const cancelPolicy = async (policyId) => {
        try {
            await axios.delete(`http://localhost:7737/taxpolicies/deletePolicy/${policyId}`);
            setPolicy(policy.filter(p => p.policyId !== policyId)); // Remove the deleted policy from the UI
        } catch (error) {
            if (error.response && error.response.status === 500) {
                Swal.fire({
                    title: 'Error',
                    text: 'Deleted',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                console.error(error);
            }
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
  <div className="container-fluid">
    <NavLink exact to="/" className="navbar-brand text-white">
      E-tax Calculator Management System
    </NavLink>
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink exact to="/adminhome" className="nav-link text-white">
          <ArrowLeftIcon /> BACK
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink exact className="nav-link text-white">
         Hi {win} <AccountCircleIcon />
        </NavLink>
      </li>
    </ul>
  </div>
</nav>

            <div className="container">
                <br />
                <div className="container-fluid my-2">
                    <div className="row justify-content-center">
                        {policy.map((policy) => (
                            <div className="col-md-4" key={policy.policyId}>
                                <div className="card" style={{ width: '18rem', marginBottom: '1rem' }}>
                                    <div className="card-header">
                                        <strong>Policy Name:</strong> {policy.policyName}
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <strong>Effective From:</strong> {policy.effectiveFrom}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Effective To:</strong> {policy.effectiveTo}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Description:</strong> {policy.description}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Policy Type:</strong> {policy.policyType}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Income Range From:</strong> {policy.incomeFrom}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Income Range To:</strong> {policy.incomeTo}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Tax Rates:</strong> {policy.taxRates}
                                        </li>
                                    </ul>
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <button 
                                            className="btn btn-danger" 
                                            style={{ fontSize: '0.75rem', padding: '0.5rem 1rem', marginRight: '0.5rem' }} 
                                            onClick={() => cancelPolicy(policy.policyId)}
                                        >
                                            DELETE POLICY
                                        </button>
                                        <NavLink to={`/editTax/${policy.policyId}`}>
                                            <button 
                                                className="btn btn-success" 
                                                style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                                            >
                                                UPDATE POLICY
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminViewPolicy;
