import React from "react";
import {
  Grid,
  Typography,
  Button,
  Avatar,
  CircularProgress,
  Grow,
  TextField,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import { Link, useNavigate } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import { getCountry } from "../../API/countries";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";


function UserProfile(user) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [userInfo, setUserInfo] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [addPhone, setAddPhone] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [changePassword, setChangePassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };


  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };


  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  React.useEffect(() => {
    if (!token) {
      return navigate("/error");
    }
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
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, navigate, userInfo, setLoading ]);

  if (loading) {
    return (
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ height: "100vh", placeContent:"center" }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container align='center' sx={{ mt: 10 }}>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        sx={{ width: "100%" }}>
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          rowSpacing={2}
          wrap='nowrap'>
          <Grid item>
            <Avatar sx={{ bgcolor: "primary.main", width: 55, height: 55 }}>
              {userInfo.firstName &&
                userInfo.firstName.charAt(0) + userInfo.lastName.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item sx={{ mb: 10 }}>
            <Link to={"flights"} state={{ _id: userInfo._id }}>
              <Button variant='outlined' size='small'>
                My Flights
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid
          container
          direction='column'
          justifyContent='left'
          alignItems='left'
          rowSpacing={3}>
          <Grid container sx={{ ml: 40, mb: 5 }}>
            <PersonOutlineOutlinedIcon sx={{ mr: 1 }} />
            <Typography
              variant='body1'
              display='inline'
              color='primary.main'
              sx={{ fontWeight: 500 }}>
              Username:{" "}
            </Typography>
            <Typography variant='body1' display='inline' sx={{ ml: 2 }}>
              {userInfo.firstName && userInfo.Username}
            </Typography>
            <Typography
              variant='body1'
              display='inline'
              color='primary.main'
              sx={{ ml: 2, fontWeight: 500 }}>
              First Name:{" "}
            </Typography>
            <Typography variant='body1' display='inline' sx={{ ml: 2 }}>
              {userInfo.firstName && userInfo.firstName}
            </Typography>
            <Typography
              variant='body1'
              display='inline'
              color='primary.main'
              sx={{ ml: 2, fontWeight: 500 }}>
              Last Name:{" "}
            </Typography>
            <Typography display='inline' sx={{ ml: 2 }}>
              {userInfo.firstName && userInfo.lastName}
            </Typography>
          </Grid>
          <Grid container sx={{ ml: 40, mb: 5 }}>
            <EmailOutlinedIcon sx={{ mr: 1 }} />
            <Typography
              variant='body1'
              display='inline'
              color='primary.main'
              sx={{ fontWeight: 500 }}>
              Email:{" "}
            </Typography>
            <Typography variant='body1' display='inline' sx={{ ml: 2 }}>
              {userInfo.firstName && userInfo.Email}
            </Typography>
          </Grid>
          <Grid container sx={{ ml: 40, mb: 5 }}>
            <ContactPageOutlinedIcon sx={{ mr: 1 }} />
            <Typography
              variant='body1'
              display='inline'
              color='primary.main'
              sx={{ fontWeight: 500 }}>
              Passport Number:{" "}
            </Typography>
            <Typography variant='body1' display='inline' sx={{ ml: 2 }}>
              {userInfo.firstName && userInfo.passportNumber}
            </Typography>
          </Grid>
          <Grid container sx={{ ml: 40, mb: 5 }}>
            <DateRangeOutlinedIcon sx={{ mr: 1 }} />
            <Typography
              variant='body1'
              display='inline'
              color='primary.main'
              sx={{ fontWeight: 500 }}>
              Date of Birth:{" "}
            </Typography>
            <Typography variant='body1' display='inline' sx={{ ml: 2 }}>
              {userInfo.firstName && userInfo.dateOfBirth.substring(0, 10)}
            </Typography>
          </Grid>
          <Grid container sx={{ ml: 40, mb: 5 }}>
            <HomeOutlinedIcon sx={{ mr: 1 }} />
            <Typography
              variant='body1'
              display='inline'
              color='primary.main'
              sx={{ fontWeight: 500 }}>
              Address:{" "}
            </Typography>
            <Typography variant='body1' display='inline' sx={{ ml: 2 }}>
              {userInfo.firstName && userInfo.homeAddress}
            </Typography>
          </Grid>
          <Grid container sx={{ ml: 40, mb: 5,mt:-3, alignItems: "self-end" }}>
            <PhoneIcon sx={{ mr: 1 }} />
            <Typography
              variant='body1'
              display='inline'
              color='primary.main'
              sx={{ fontWeight: 500 }}>
              Phone Number(s):{" "}
            </Typography>
            <Typography
              variant='body1'
              display='inline'
              sx={{ ml: 2, display: "flex", gap: "0.2em" }}>
              {!addPhone &&
                userInfo.firstName &&
                userInfo.phoneNumber.map((phone) => (
                  <Typography>{phone},</Typography>
                ))}
            </Typography>
            {!addPhone && (
              <AddIcon
                sx={{ color: "primary.main", ml: 2, alignItems: "end" }}
                onClick={() => {
                  setAddPhone(true);
                }}
              />
            )}

            <Grow in={addPhone}>
              <Grid
                container
                direction='row'
                sx={{
                  ml: 2,
                  alignItems: "flex-end",
                  flexFlow: "row",
                  width: "auto",
                  gap: 2,
                }}>
                <TextField
                  id='standard-basic'
                  label='Number'
                  value={phone}
                  onChange={handlePhone}
                  variant='standard'
                  size='small'
                  sx={{
                    width: "80%",
                    alignItems: "flex-end",
                    fontSize: "1em",
                  }}
                />
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => {
                    setLoading(true);
                    axios
                      .post(
                        "http://localhost:8000/user/addPhone",
                        {
                          phoneNumber: phone,
                        },
                        {
                          headers: {
                            "x-auth-token": localStorage.getItem("token"),
                          },
                        }
                      )
                      .then((res) => {
                        toast.success("Phone Number Added");
                        setAddPhone(false);
                        setPhone("");
                        setLoading(false);
                      })
                      .catch((err) => {
                        toast.error("Error Adding Phone Number");
                      });
                  }}>
                  ADD
                </Button>
                {userInfo.phoneNumber.map((phone) => (
                  <Grid container direction='row'>
                    <Typography
                      variant='body1'
                      display='inline'
                      color='primary.main'
                      sx={{ fontWeight: 500, ml: 2 }}>
                      {phone}
                    </Typography>
                    <RemoveIcon
                      sx={{ color: "secondary.main", ml: 1 }}
                      onClick={() => {
                        setLoading(true);
                        axios
                          .post(
                            "http://localhost:8000/user/deletePhone",
                            {
                              phoneNumber: phone,
                            },
                            {
                              headers: {
                                "x-auth-token": localStorage.getItem("token"),
                              },
                            }
                          )
                          .then((res) => {
                            toast.success("Phone Number Removed");
                            setLoading(false);
                          })
                          .catch((err) => {
                            console.log(err);
                            toast.error("Error Removing Phone Number");
                          });
                      }}
                    />
                  </Grid>
                ))}
                <CloseIcon
                  sx={{ color: "secondary.main", ml: -2 }}
                  onClick={() => {
                    setAddPhone(false);
                  }}
                />
              </Grid>
            </Grow>
          </Grid>
          <Grid container sx={{ ml: 40, mb: 2 }}>
            <PublicOutlinedIcon sx={{ mr: 1 }} />
            <Typography
              variant='body1'
              display='inline'
              color='primary.main'
              sx={{ fontWeight: 500 }}>
              Country:{" "}
            </Typography>
            <Typography variant='body1' display='inline' sx={{ ml: 2 }}>
              {userInfo.firstName && getCountry(userInfo.countryCode)}
            </Typography>
          </Grid>
        </Grid>
        <Button variant='text' size='small' sx={{ mb: 2, color: "secondary.main" }} onClick={() => 
          setChangePassword(true)
        } >
          Change Password
        </Button>
        {changePassword && (
          <Grow in={changePassword}>
          <Grid
            container
            direction='row'
            sx={{
              ml: 2,
              alignItems: "center",
              flexFlow: "row",
              width: "auto",
              gap: 2,
              mb:4
            }}>
            <TextField
              id='standard-basic'
                label='Old Password'
                type='password'
              value={oldPassword}
              onChange={handleOldPassword}
              variant='standard'
              size='small'
              sx={{
                width: "80%",
                alignItems: "flex-end",
                fontSize: "1em",
              }}
            />
            <TextField
              id='standard-basic'
                label='New Password'
                type='password'
              value={newPassword}
              onChange={handleNewPassword}
              variant='standard'
              size='small'
              sx={{
                width: "80%",
                alignItems: "flex-end",
                fontSize: "1em",
              }}
            />
            <TextField
              id='standard-basic'
                label='Confirm Password'
                type='password'
              value={confirmPassword}
              onChange={handleConfirmPassword}
              variant='standard'
              size='small'
              sx={{
                width: "80%",
                alignItems: "flex-end",
                fontSize: "1em",
              }}
            />
            <Button
              variant='outlined'
              size='small'
              onClick={() => {
                setLoading(true);
                axios
                  .post(
                    "http://localhost:8000/user/changePassword",
                    {
                      oldPassword: oldPassword,
                      newPassword: newPassword,
                      confirmPassword: confirmPassword,
                    },
                    {
                      headers: {
                        "x-auth-token": localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((res) => {
                    toast.success("Password Changed");
                    setLoading(false);
                    setChangePassword(false);
                  })
                  .catch((err) => {
                    toast.error("Error Changing Password");
                  });
              }}>
              CHANGE
            </Button>
            <CloseIcon
              sx={{ color: "secondary.main", ml: -1 }}
              onClick={() => {
                setChangePassword(false);
              }}
            />
          </Grid>
          </Grow>
        )}
        <Link
          to={`/user/modify/${userInfo.firstName && userInfo.Username}`}
          state={{ _id: userInfo._id }}>
          <Button variant='contained' size='small'>
            EDIT PROFILE
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
