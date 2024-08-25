

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { TextField, Typography, Box, MenuItem, Grid } from "@mui/material";
import axios from 'axios';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export default function EditTax() {
    const { policyId } = useParams();
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

    const [errors, setErrors] = useState({});

    const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format

    const onInputChange = (e) => {
        setPolicy({ ...policy, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        const now = new Date();
        const effectiveFrom = new Date(policy.effectiveFrom);
        const effectiveTo = new Date(policy.effectiveTo);

        if (!policy.policyName) newErrors.policyName = "Policy Name is required.";
        if (!policy.effectiveFrom) newErrors.effectiveFrom = "Effective From Date is required.";
        if (effectiveFrom < now) newErrors.effectiveFrom = "Effective From Date cannot be in the past.";
        if (!policy.effectiveTo) newErrors.effectiveTo = "Effective To Date is required.";
        if (effectiveTo < now) newErrors.effectiveTo = "Effective To Date cannot be in the past.";
        if (effectiveFrom > effectiveTo) {
            newErrors.effectiveFrom = "Effective From Date cannot be after Effective To Date.";
            newErrors.effectiveTo = "Effective To Date cannot be before Effective From Date.";
        }
        if (!policy.description) newErrors.description = "Description is required.";
        if (!policy.policyType) newErrors.policyType = "Policy Type is required.";
        if (policy.incomeFrom === "" || parseFloat(policy.incomeFrom) < 0) newErrors.incomeFrom = "Income From is required and must be a non-negative number.";
        if (policy.incomeTo === "" || parseFloat(policy.incomeTo) < 0) newErrors.incomeTo = "Income To is required and must be a non-negative number.";
        if (policy.taxRates === "" || parseFloat(policy.taxRates) < 0) newErrors.taxRates = "Tax Rates are required and must be a non-negative number.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.put(`http://localhost:7737/taxpolicies/doPolicyDetailsUpdate`, policy)
                .then(() => {
                    navigate('/adminViewPolicy');
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const loadPolicy = async () => {
            try {
                const res = await axios.get(`http://localhost:7737/taxpolicies/GetPolicyId/${policyId}`);
                setPolicy(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        loadPolicy();
    }, [policyId]);

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

            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
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
                    <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <b>UPDATE POLICY DETAILS <AppRegistrationIcon /></b>
                    </Typography>

                    <form onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Policy Id"
                                    name="policyId"
                                    fullWidth
                                    margin="normal"
                                    size="medium"
                                    value={policy.policyId}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label="Enter Effective From"
                                    name="effectiveFrom"
                                    fullWidth
                                    margin="normal"
                                    type="date"
                                    size="medium"
                                    value={policy.effectiveFrom}
                                    onChange={onInputChange}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ min: today }}  // Prevent past dates
                                    error={!!errors.effectiveFrom}
                                    helperText={errors.effectiveFrom}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label="Enter Effective To"
                                    name="effectiveTo"
                                    size="medium"
                                    type="date"
                                    fullWidth
                                    margin="normal"
                                    value={policy.effectiveTo}
                                    onChange={onInputChange}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ min: today }}  // Prevent past dates
                                    error={!!errors.effectiveTo}
                                    helperText={errors.effectiveTo}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Enter Description"
                                    name="description"
                                    size="medium"
                                    fullWidth
                                    margin="normal"
                                    value={policy.description}
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
                                    value={policy.policyType}
                                    onChange={onInputChange}
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.policyType}
                                    helperText={errors.policyType}
                                >
                                    <MenuItem value="Budget">Budget</MenuItem>
                                    <MenuItem value="Other source income tax">Other Source Income Tax</MenuItem>
                                    <MenuItem value="service tax">Service Tax</MenuItem>
                                    <MenuItem value="Property & sales tax">Property & Sales Tax</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label="Enter Income From"
                                    name="incomeFrom"
                                    type="number"
                                    inputProps={{ min: 0 }}  // Prevent negative numbers
                                    fullWidth
                                    margin="normal"
                                    size="medium"
                                    value={policy.incomeFrom}
                                    onChange={onInputChange}
                                    error={!!errors.incomeFrom}
                                    helperText={errors.incomeFrom}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label="Enter Income To"
                                    name="incomeTo"
                                    type="number"
                                    inputProps={{ min: 0 }}  // Prevent negative numbers
                                    fullWidth
                                    margin="normal"
                                    value={policy.incomeTo}
                                    onChange={onInputChange}
                                    error={!!errors.incomeTo}
                                    helperText={errors.incomeTo}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label="Enter Tax Rates"
                                    name="taxRates"
                                    type="number"
                                    inputProps={{ min: 0 }}  // Prevent negative numbers
                                    fullWidth
                                    margin="normal"
                                    size="medium"
                                    value={policy.taxRates}
                                    onChange={onInputChange}
                                    error={!!errors.taxRates}
                                    helperText={errors.taxRates}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                    <button type='submit' className='btn btn-dark' style={{ marginRight: '1rem' }}>
                                        SUBMIT
                                    </button>
                                    <Link className='btn btn-danger' to="/adminViewPolicy">CANCEL</Link>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </div>
        </>
    );
}
