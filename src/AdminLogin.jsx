

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { NavLink, useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import './AdminLogin.css';

const defaultTheme = createTheme();

export default function AdminLogin() {
  let navigate = useNavigate();

  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminNameError, setAdminNameError] = useState("");
  const [adminPasswordError, setAdminPasswordError] = useState("");

  const handleAdminNameBlur = () => {
    if (adminName.trim().length === 0) {
      setAdminNameError("Username is required");
    } else if (/\d/.test(adminName)) {
      setAdminNameError("Username cannot contain digits");
    } else {
      setAdminNameError("");
    }
  };

  const handleAdminPasswordBlur = () => {
    if (adminPassword.trim().length === 0) {
      setAdminPasswordError("Password is required");
    } else if (adminPassword.length < 8) {
      setAdminPasswordError("Password must be at least 8 characters");
    } else {
      setAdminPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (adminNameError || adminPasswordError) return; // Prevent submission if there are errors

    const data = new FormData(event.currentTarget);

    try {
      const response = await axios.get(
        `http://localhost:7737/admin/loginadmin/${data.get("adminName")}/${data.get("adminPassword")}`
      );

      if (response.data) {
        sessionStorage.setItem("adminName", data.get("adminName"));
        // sessionStorage.setItem("adminPassword", data.get("adminPassword"));
        alert("Login Successful");
        navigate("/adminhome");
      } else {
        // alert("Login Failed");
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <NavLink exact to="/" className="navbar-brand text-white">
            E-TAX CALCULATOR Management System
          </NavLink>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link text-white">
                <ArrowLeftIcon /> Back to Home
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'black' }}>
              <AdminPanelSettingsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin - Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Username"
                  name="adminName"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  onBlur={handleAdminNameBlur}
                  error={!!adminNameError}
                  helperText={adminNameError}
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="adminPassword"
                  label="Password"
                  type="password"
                  id="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onBlur={handleAdminPasswordBlur}
                  error={!!adminPasswordError}
                  helperText={adminPasswordError}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: 'black' }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      {/* Add any additional links if needed */}
                    </Link>
                  </Grid>
                  <Grid item>
                    <NavLink exact to="/" className="nav-link text-white">
                      <ArrowLeftIcon /> Back to Home
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
