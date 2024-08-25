


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { Box, MenuItem, TextField, Typography, Grid } from "@mui/material";
import axios from 'axios';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export default function AddPolicy() {
    let navigate = useNavigate();

    const [policy, setPolicy] = useState({
        policyId: "",
        policyName: "",
        effectiveFrom: "",
        effectiveTo: "",
        description: "",
        policyType: "",
        incomeFrom: "",
        incomeTo: "",
        taxRates: "",
    });

    const [errors, setErrors] = useState({}); // To track validation errors

    const onInputChange = (e) => {
        setPolicy({ ...policy, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        const today = new Date().toISOString().split("T")[0];

        if (!policy.policyName) newErrors.policyName = "Policy Name is required.";
        
        if (!policy.effectiveFrom) newErrors.effectiveFrom = "Effective From Date is required.";
        else if (policy.effectiveFrom < today) newErrors.effectiveFrom = "Effective From Date cannot be in the past.";
        
        if (!policy.effectiveTo) newErrors.effectiveTo = "Effective To Date is required.";
        else if (policy.effectiveTo < today) newErrors.effectiveTo = "Effective To Date cannot be in the past.";
        else if (policy.effectiveTo <= policy.effectiveFrom) newErrors.effectiveTo = "Effective To Date must be after Effective From Date.";
        
        if (!policy.description) newErrors.description = "Policy Description is required.";
        if (!policy.policyType) newErrors.policyType = "Policy Type is required.";
        if (!policy.incomeFrom || policy.incomeFrom < 0) newErrors.incomeFrom = "Income From is required and must be a non-negative number.";
        if (!policy.incomeTo || policy.incomeTo < 0) newErrors.incomeTo = "Income To is required and must be a non-negative number.";
        else if (policy.incomeTo <= policy.incomeFrom) newErrors.incomeTo = "Income To must be greater than Income From.";
        if (!policy.taxRates || policy.taxRates < 0) newErrors.taxRates = "Tax Rates are required and must be a non-negative number.";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Stop submission if validation fails

        try {
            await axios.post(`http://localhost:7737/taxpolicies/doPoliciesDetailsInsert`, policy);
            navigate('/adminViewPolicy');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <NavLink exact to="/" className="navbar-brand text-white">
                        E-Tax Calculator Management System
                    </NavLink>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink exact to="/adminhome" className="nav-link text-white">
                                <ArrowLeftIcon /> Back to Home
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <div style={{ padding: '2rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '900px',
                        padding: '2rem',
                        border: '1px solid grey',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        backgroundColor: '#fff',
                    }}
                >
                    <Typography variant="h5" gutterBottom style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <b>REGISTER YOUR POLICIES DETAILS <AppRegistrationIcon /></b>
                    </Typography>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label="Enter Policy Name"
                                    name="policyName"
                                    margin="normal"
                                    fullWidth
                                    onChange={onInputChange}
                                    error={!!errors.policyName}
                                    helperText={errors.policyName}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label="Enter Effective From Date"
                                    name="effectiveFrom"
                                    type="date"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                    value={policy.effectiveFrom}
                                    onChange={onInputChange}
                                    InputProps={{
                                        inputProps: { min: new Date().toISOString().split("T")[0] }
                                    }}
                                    error={!!errors.effectiveFrom}
                                    helperText={errors.effectiveFrom}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label="Enter Effective To Date"
                                    name="effectiveTo"
                                    type="date"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                    value={policy.effectiveTo}
                                    onChange={onInputChange}
                                    InputProps={{
                                        inputProps: { min: new Date().toISOString().split("T")[0] }
                                    }}
                                    error={!!errors.effectiveTo}
                                    helperText={errors.effectiveTo}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Enter Policy Description"
                                    name="description"
                                    fullWidth
                                    margin="normal"
                                    onChange={onInputChange}
                                    error={!!errors.description}
                                    helperText={errors.description}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    select
                                    label="Enter Policy Type"
                                    name="policyType"
                                    fullWidth
                                    margin="normal"
                                    onChange={onInputChange}
                                    error={!!errors.policyType}
                                    helperText={errors.policyType}
                                >
                                    <MenuItem value="Other source income tax">Other Source Income Tax</MenuItem>
                                    <MenuItem value="service tax">Service Tax</MenuItem>
                                    <MenuItem value="Property & sales tax">Property & Sales Tax</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label="Enter Income From Range"
                                    name="incomeFrom"
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    inputProps={{ min: 0 }}  // Prevent negative numbers
                                    onChange={onInputChange}
                                    error={!!errors.incomeFrom}
                                    helperText={errors.incomeFrom}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label="Enter Income To Range"
                                    name="incomeTo"
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    inputProps={{ min: 0 }}  // Prevent negative numbers
                                    onChange={onInputChange}
                                    error={!!errors.incomeTo}
                                    helperText={errors.incomeTo}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label="Enter Tax Rates Percentage"
                                    name="taxRates"
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    inputProps={{ min: 0 }}  // Prevent negative numbers
                                    onChange={onInputChange}
                                    error={!!errors.taxRates}
                                    helperText={errors.taxRates}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                    <button type='submit' className='btn btn-dark' style={{ marginRight: '1rem' }}>SUBMIT</button>
                                    <Link className='btn btn-danger' to="/adminhome">CANCEL</Link>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </div>
        </>
    );
}
