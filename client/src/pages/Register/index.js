import React from "react";
import { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Box,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import { countries } from "../../API/countries";
import axios from "axios";
import moment from "moment";
import DateAdapter from "@mui/lab/AdapterMoment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  // states initialization
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, SetCountry] = useState();
  const [passport, setPassport] = useState("");
  const [dob, setDob] = useState(moment());

  // State for the form
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleCountry = (e, newValue) => {
    SetCountry(newValue.code);
    console.log(newValue.code);
    console.log(e);
  };
  const handlePassport = (e) => {
    setPassport(e.target.value);
  };
  const handleDob = (newValue) => {
    setDob(moment.utc(moment.utc(newValue).format()));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/add", {
        firstName: firstName,
        lastName: lastName,
        Username: username,
        Password: password,
        Email: email,
        phoneNumber: phone,
        homeAddress: address,
        countryCode: country.toUpperCase().substring(0, 3),
        passportNumber: passport,
        dateOfBirth: dob,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        console.log(localStorage.getItem("token"));
        toast.success("User registered successfully");
        setTimeout(function () {
          navigate("/home", {
            replace: true,
          });
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("User Already Exists!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      <Paper
        sx={{ mt: 5, p: 3, width: "35%", textAlign: "center" }}
        variant='outlined'
        elevation={10}>
        <Grid
          container
          direction='column'
          sx={{ textAlign: "center", m: "auto" }}>
          <Typography variant='h4'>Welcome to Mighty Ducks</Typography>
          <Typography variant='body1' sx={{ mt: 1 }}>
            Please fill in this form to create an account.
          </Typography>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                direction='column'
                width='60%'
                sx={{ m: "auto", mt: 2, alignSelf: "center" }}>
                <TextField
                  id='firstName'
                  label='First Name'
                  variant='outlined'
                  value={firstName}
                  onChange={handleFirstName}
                  margin='normal'
                  required
                />
                <TextField
                  id='lastName'
                  label='Last Name'
                  variant='outlined'
                  value={lastName}
                  onChange={handleLastName}
                  margin='normal'
                  required
                />
                <TextField
                  id='username'
                  label='Username'
                  variant='outlined'
                  value={username}
                  onChange={handleUsername}
                  margin='normal'
                  required
                />
                <TextField
                  id='password'
                  label='Password'
                  variant='outlined'
                  type='password'
                  value={password}
                  onChange={handlePassword}
                  margin='normal'
                  required
                />
                <TextField
                  id='email'
                  label='Email'
                  variant='outlined'
                  value={email}
                  onChange={handleEmail}
                  margin='normal'
                  required
                />
                <TextField
                  id='phone'
                  label='Phone'
                  variant='outlined'
                  value={phone}
                  onChange={handlePhone}
                  margin='normal'
                  required
                />
                <TextField
                  id='address'
                  label='Address'
                  variant='outlined'
                  value={address}
                  onChange={handleAddress}
                  margin='normal'
                  required
                />
                <Autocomplete
                  id='country'
                  label='Country'
                  variant='outlined'
                  value={country}
                  inputValue={country}
                  onInputChange={handleCountry}
                  ListboxProps={{
                    style: { maxHeight: "10rem" },
                    position: "bottom-start",
                  }}
                  onChange={handleCountry}
                  required
                  options={countries}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component='li'
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}>
                      {country ? (
                        <img
                          loading='lazy'
                          width='20'
                          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                          alt=''
                        />
                      ) : null}
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin='normal'
                      label='Choose a country'
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                      }}
                    />
                  )}
                />
                <TextField
                  id='passport'
                  label='Passport'
                  variant='outlined'
                  value={passport}
                  onChange={handlePassport}
                  margin='normal'
                  required
                />
                <DatePicker
                  label='Date of Birth'
                  value={dob}
                  onChange={handleDob}
                  disableFuture
                  renderInput={(params) => (
                    <TextField {...params} id='dob' margin='normal' required />
                  )}
                />
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  sx={{ width: "35%", alignSelf: "center", m: 2 }}>
                  Register
                </Button>
              </Grid>
            </form>
          </LocalizationProvider>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Register;
