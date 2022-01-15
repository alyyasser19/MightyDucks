import { React, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
} from "@mui/material";
import { PersonOutlineOutlined, HttpsOutlined } from "@mui/icons-material/";
import IMG from "../../assets/Ticket.png";
import "./styles.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authorizedUser, setAuthorizedUser] = useState(false);
  const [authorizedAdmin, setAuthorizedAdmin] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post("http://localhost:8000/user/login", {
        Username: username,
        Password: password,
      })
      .then((res) => {
        if (res.data) {
          localStorage.setItem("token", res.data.token);
          console.log(res.data.user);
          setUserInfo(res.data.user);

          setError(false);
          if (res.data.user.Type === "A") setAuthorizedAdmin(true);
          else setAuthorizedUser(true);
          console.log(authorizedAdmin, authorizedUser);
          setLoading(false);
        } else {
          setLoading(false);
          setError(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };
  const handleForget = () => {};

  if (localStorage.getItem("token"))
    return <Navigate to="/home" replace={true} />;

  if (loading)
    return (
      <Grid container sx={{ mt: "10em", placeContent: "center" }}>
        <CircularProgress size={100} />
      </Grid>
    );

  if (authorizedAdmin)
    return <Navigate to='/admin' state={{ user: "admin" }} />;

  if (authorizedUser) {
    return <Navigate to='/home' state={{ user: userInfo }} />;
  }

  if (!loading && !authorizedUser && !authorizedAdmin)
    return (
      <Grid
        container
        direction='row'
        sx={{
          backgroundColor: "primary.main",
          height: "93.1vh",
          ml: "-1em",
          width: { m: "102%", xs: "104%" },
        }}>
        <Grid
          sx={{
            display: { xs: "none", md: "block" },
            width: { xl: "auto", md: "44%" },
            position: "relative",
            paddingLeft: "16em",
            paddingTop: "2em",
            backgroundColor: "#d9d9d9",
            backgroundImage:
              "linear-gradient(315deg, #d9d9d9 0%, #f6f2f2  74%)",
            height: "93.1vh",
          }}>
          <img
            src={IMG}
            alt='logo'
            id='img'
            style={{
              position: "relative",
              right: "10em",
              top: "4em",
            }}
          />
        </Grid>
        <Grid
          sx={{
            ml: { md: 15, xs: 6 },
            mt: { xl: 30, xs: 10, l: 10 },
            width: { xs: "85%", md: "auto" },
          }}>
          <Typography
            variant='subtitle1'
            sx={{
              color: "white.main",
              fontSize: "1.5em",
              textAlign: "left",
              paddingTop: "2em",
            }}>
            LOGIN
          </Typography>
          <Typography
            variant='h4'
            sx={{
              color: "white.main",
              textAlign: "left",
              fontWeight: 700,
              mt: -1,
            }}>
            YOUR ACCOUNT
          </Typography>
          <form>
            <TextField
              label='Email :'
              value={username}
              onChange={handleUsername}
              type='email'
              variant='standard'
              color='white'
              size='normal'
              sx={{
                color: "white.main !important",
                width: "100%",
                mt: "1em",
                pt: "0.5em",
                "& input": {
                  color: "white.main",
                  fontSize: "1.2em",
                },
                "& label": {
                  color: "white.main",
                  fontSize: "1.4em",
                  fontWeight: 100,
                  p5: "1em",
                },
                fontSize: "1em",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <PersonOutlineOutlined sx={{ color: "white.main" }} />
                  </InputAdornment>
                ),
              }}
              focused
            />
            <TextField
              label='Password :'
              value={password}
              type='password'
              onChange={handlePassword}
              variant='standard'
              color='white'
              size='normal'
              sx={{
                color: "white.main !important",
                width: "100%",
                pt: "0.5em",
                mt: "2em",
                "& input": {
                  color: "white.main",
                  fontSize: "1.2em",
                },
                "& label": {
                  color: "white.main",
                  fontSize: "1.4em",
                  fontWeight: 100,
                  p5: "1em",
                },
                fontSize: "1em",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <HttpsOutlined sx={{ color: "white.main" }} />
                  </InputAdornment>
                ),
              }}
              focused
            />
            <Grid
              container
              direction='row'
              sx={{
                mt: "2em",
                justifyContent: "space-between",
              }}>
              <Button
                variant='contained'
                color='white'
                type='submit'
                size='medium'
                sx={{
                  color: "primary.main",
                }}
                onClick={handleSubmit}>
                LOGIN
              </Button>

              <Button
                variant='text'
                color='white'
                size='medium'
                sx={{
                  color: "white.main",
                }}
                onClick={handleForget}>
                FORGOT PASSWORD?
              </Button>
            </Grid>
          </form>
          <Grid
            container
            direction='row'
            sx={{
              mt: "2em",
              alignItems: "baseline",
            }}>
            <Typography
              variant='subtitle1'
              sx={{
                color: "white.main",
                textAlign: "left",
                fontSize: "1em",
                mt: "2em",
              }}>
              Don't have an account?
            </Typography>
            <Button
              variant='text'
              onClick={() => {
                navigate("/register");
              }}
              sx={{
                color: "secondary.lighter",
                textAlign: "left",
                fontSize: "1em",
                mt: "0.5em",
                fontWeight: 500,
              }}>
              Sign up!
            </Button>
          </Grid>
          {error && (
            <Typography
              variant='subtitle1'
              sx={{
                color: "secondary.lighter",
                textAlign: "left",
                fontSize: "1em",
                mt: "2em",
              }}>
              Wrong username or password
            </Typography>
          )}
        </Grid>
      </Grid>
    );
}

export default Login;
