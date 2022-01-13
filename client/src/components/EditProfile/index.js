import React from "react";
import { useState } from "react";
import {
  Grid,
  Avatar,
  Button,
  TextField,
  Autocomplete,
  Box,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import { countries, getCountry, getCountryObject } from "../../API/countries";
import moment from "moment";
import DateAdapter from "@mui/lab/AdapterMoment";
import axios from "axios";
import UpdateUserModal from "./../UpdateUserModal";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(moment());
  const [homeAddress, setHomeAddress] = useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [valueCountry, setValueCountry] = React.useState("");
  const [inputValueCountry, setInputValueCountry] = React.useState("");

  React.useEffect(() => {
    console.log("Edit Profile");
    axios
      .post(
        "http://localhost:8000/user/getUserByID",
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          setUserInfo(res.data);
          setUsername(res.data.Username);
          setEmail(res.data.Email);
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setPassportNumber(res.data.passportNumber);
          setDateOfBirth(res.data.dateOfBirth);
          setHomeAddress(res.data.homeAddress);
          setValueCountry(getCountryObject(res.data.countryCode));
          setInputValueCountry(getCountry(res.data.countryCode));
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  //handle
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleChangePassportNumber = (event) => {
    setPassportNumber(event.target.value);
  };
  const handleDateOfBirth = (newValue) => {
    setDateOfBirth(moment.utc(moment.utc(newValue).format()));
  };
  const handleChangeHomeAddress = (event) => {
    setHomeAddress(event.target.value);
  };

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      sx={{ width: "100%", mt: 10 }}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 55,
            height: 55,
            mb: 10,
            mt: 2,
          }}>
          {firstName && firstName.charAt(0) + lastName.charAt(0)}
        </Avatar>
        <Grid
          container
          direction='column'
          justifyContent='left'
          alignItems='left'
          rowSpacing={3}>
          <Grid container sx={{ ml: 40, mb: 5 }}>
            <PersonOutlineOutlinedIcon sx={{ mr: 1, mt: 2 }} />
            <TextField
              id='standard-basic'
              label='Username'
              value={Username}
              onChange={handleChangeUsername}
              variant='standard'
              size='small'
              sx={{ mr: 2, width: "17%" }}
            />
            <TextField
              id='ostandard-basic'
              label='First Name'
              value={firstName}
              onChange={handleChangeFirstName}
              variant='standard'
              size='small'
              sx={{ mr: 2, width: "17%" }}
            />
            <TextField
              id='standard-basic'
              label='Last Name'
              value={lastName}
              onChange={handleChangeLastName}
              variant='standard'
              size='small'
              sx={{ width: "17%" }}
            />
          </Grid>
          <Grid container sx={{ ml: 40, mb: 5 }}>
            <EmailOutlinedIcon sx={{ mr: 1, mt: 2 }} />
            <TextField
              id='standard-basic'
              label='Email'
              value={Email}
              onChange={handleChangeEmail}
              variant='standard'
              size='small'
              sx={{ width: "17%" }}
            />
          </Grid>
          <Grid container sx={{ ml: 40, mb: 5 }}>
            <ContactPageOutlinedIcon sx={{ mr: 1, mt: 2 }} />
            <TextField
              id='standard-basic'
              label='Passport Number'
              value={passportNumber}
              onChange={handleChangePassportNumber}
              variant='standard'
              size='small'
              sx={{ width: "17%" }}
            />
          </Grid>
          <Grid container sx={{ ml: 40, mb: 5 }}>
            <DateRangeOutlinedIcon sx={{ mr: 1, mt: 1.75 }} />
            <DatePicker
              label='Date of Birth'
              value={dateOfBirth}
              onChange={handleDateOfBirth}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "17%" }}
                  variant='standard'
                />
              )}
              sx={{ width: "17%" }}
            />
          </Grid>
          <Grid container sx={{ ml: 40, mb: 5 }}>
            <HomeOutlinedIcon sx={{ mr: 1, mt: 2 }} />
            <TextField
              id='standard-basic'
              label='Address'
              value={homeAddress}
              onChange={handleChangeHomeAddress}
              variant='standard'
              size='small'
              sx={{ width: "17%" }}
            />
          </Grid>
          <Grid container sx={{ ml: 40, mb: 2 }}>
            <PublicOutlinedIcon sx={{ mr: 1, mt: 2 }} />
            <Autocomplete
              id='country'
              label='Country'
              variant='outlined'
              sx={{ width: "17%" }}
              inputValue={inputValueCountry}
              value={valueCountry}
              onChange={(event, newValue) => {
                if (newValue) {
                  setValueCountry(newValue);
                  console.log(valueCountry);
                }
              }}
              onInputChange={(event, newInputValue) => {
                setInputValueCountry(newInputValue);
                console.log(newInputValue);
              }}
              ListboxProps={{
                style: { maxHeight: "10rem" },
                position: "bottom-start",
              }}
              required
              InputLabelProps={{ shrink: !!valueCountry }}
              options={countries}
              getOptionLabel={(option) => {
                return option.label;
              }}
              isOptionEqualToValue={(option, value) => {
                return option.code === value.code;
              }}
              renderOption={(props, option) => (
                <Box
                  component='li'
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}>
                  <img
                    loading='lazy'
                    width='20'
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=''
                  />
                  {option.label}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin='normal'
                  label='Choose a country'
                />
              )}
            />
          </Grid>
        </Grid>
        <Button
          variant='contained'
          size='small'
          onClick={() => {
            handleOpenEdit();
          }}>
          SAVE CHANGES
        </Button>
        <Button
          variant='contained'
          size='small'
          color='secondary'
          sx={{ mt: 2 }}
          onClick={() => {
            navigate("/user");
          }}>
          Cancel
        </Button>
      </LocalizationProvider>
      <UpdateUserModal
        openEdit={openEdit}
        handleCloseEdit={handleCloseEdit}
        newUsername={Username}
        newEmail={Email}
        newFirst={firstName}
        newLast={lastName}
        newPassport={passportNumber}
        newDob={dateOfBirth}
        newHome={homeAddress}
        newCountry={valueCountry.code}
        _id={userInfo._id}
      />
    </Grid>
  );
}

export default EditProfile;
