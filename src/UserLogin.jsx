import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { NavLink, useNavigate } from "react-router-dom";
import Person2Icon from '@mui/icons-material/Person2';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { IoMdJet } from "react-icons/io";
import axios from 'axios';


const defaultTheme = createTheme();


export default function UserLogin() {
  let navigate = useNavigate();

  const [userName, setuserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userNameError, setUserNameError] = React.useState("");
  const [userPasswordError, setUserPasswordError] = React.useState("");

  const handleUserNameBlur = () => {
    if (userName.trim().length === 0) {
      setUserNameError("Username is required");
    } else if (/\d/.test(userName)) {
      setUserNameError("Username cannot contain digits");
    } else {
      setUserNameError("");
    }
  };

  const handleUserPasswordBlur = () => {
    if (userPassword.trim().length === 0) {
      setUserPasswordError("Password is required");
    } else if (userPassword.length === 0) {
      setUserPasswordError("Password is reqired");
    }  else {
      setUserPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("userPassword", userPassword);

    console.log({
      userName: data.get("userName"),
      userPassword: data.get("userPassword"),
    });


    await axios
   .get(
        `http://localhost:7737/user/loginUser/${data.get("userName")}/${data.get(
          "userPassword"
        )}`
      )
   .then((res) => {
        if (res.data) {
          console.log(userName);
          console.log(userPassword);
          console.log(res.data);
          sessionStorage.setItem("userName", res.data.userName);
          // sessionStorage.setItem("userPassword", res.data("userPassword"));
          sessionStorage.setItem("userId", res.data.userId);

          navigate("/userhome");
        } else {

        //    alert("Login Failed");

        }
      })
   .catch((err) => console.log(err));
  };

  return (
    <>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark login-navbar">
  <div class="container-fluid">
    <a class="navbar-brand text-white" href="#">E-Tax Calculator Management System</a>
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link text-white" href="/"><ArrowLeftIcon /> Back to Home</a>
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
              <Person2Icon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User - Sign in
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="username"
                  value={userName}
                  label="Enter Username"
                  name="userName"
                  onChange={(e) => setuserName(e.target.value)}
                  onBlur={handleUserNameBlur}
                  error={userNameError!== ""}
                  helperText={userNameError}
                  autoComplete="email"
                  autoFocus
                />
              <TextField
                  margin="normal"
                  fullWidth
                  value={userPassword}
                  name="userPassword"
                  label="Enter Password"
                  type="password"
                  onChange={(e) => setUserPassword(e.target.value)}
                  onBlur={handleUserPasswordBlur}
                  error={userPasswordError!== ""}
                  helperText={userPasswordError}
                  autoComplete="current-password"
                  id='password'
                />

                <Button

                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: 'black' }}
                  id='submit'
                >
                  Sign In
                </Button>
                <Grid container>

                  <Grid item>
                    <NavLink to={'/register'} variant="body2" id='register'>
                      {"Don't have an account? Sign Up"}
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

