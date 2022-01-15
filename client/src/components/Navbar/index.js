import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Logo from "../Logo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//fixing navbar as we scroll
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Navbar(props) {
  const navigate= useNavigate();
  const [auth, setAuth] = React.useState(true);
  const [admin, setAdmin] = React.useState(false);
  const [normal, setNormal] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [curUser, setCurUser] = React.useState({});

  const token = localStorage.getItem("token");

  React.useEffect(() => {
    console.log("token", token);
    if (token) {
      axios.post("http://localhost:8000/user/getUserByID", {
      }, {
        headers: {
          "x-auth-token": token,
        },
      })
        .then((res) => {
          setAuth(true);
          setCurUser(res.data);
          if (res.data.Type==="A") {
            setAdmin(true);
          }
          else {
            setNormal(true);
          }
        })
        .catch((err) => {
          setAuth(false);
        });
    } else {
      setAuth(false);
      setAdmin(false);
      setNormal(false);
    }
  }, [token,auth]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <Box sx={{ flexGrow: 1, height: "5em" }}>
      <ElevationScroll {...props}>
        <AppBar
          color='white'
          position='fixed'
          sx={{ height: "6em", borderBottom: "ridge" }}>
          <Toolbar>
            <Link to={admin ? "admin" : "home"}>
              <Logo />
            </Link>
            {normal && auth && (
              <Grid
                container
                justify='flex-end'
                alignItems='center'
                sx={{ ml: 2 }}>
                <Button
                  variant='text'
                  size='large'
                  color='menuItem'
                  onClick={() =>
                    navigate("/user/flights", {
                      replace: true,
                      state: { userID: curUser._id },
                    })
                  }
                  sx={{
                    width: "20em",
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}>
                  View Flights
                </Button>
                <Button
                  variant='text'
                  size='large'
                  color='menuItem'
                  onClick={() => {
                    localStorage.removeItem("token");
                    setAuth(false);
                    navigate("/", { replace: true });
                  }}
                  sx={{
                    width: "20em",
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}>
                  LOGOUT
                </Button>
              </Grid>
            )}
            {admin && auth && (
              <Grid
                container
                justify='flex-end'
                alignItems='center'
                sx={{ ml: 2 }}>
                <Button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setAuth(false);
                    navigate("/", { replace: true });
                  }}
                  variant='text'
                  size='large'
                  color='menuItem'
                  sx={{
                    width: "20em",
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}>
                  LOGOUT
                </Button>
              </Grid>
            )}
            <Grid
              container
              justify='flex-end'
              sx={{ justifyContent: "end", gap: "2em" }}
              alignItems='center'>
              {auth && (
                <div>
                  <Link to='user'>
                    <IconButton
                      size='large'
                      aria-label='account of current user'
                      aria-controls='menu-appbar'
                      aria-haspopup='true'
                      onClick={handleMenu}
                      color='black'
                      edge='end'>
                      <AccountCircle
                        sx={{
                          fontSize: { md: "1.5em" },
                        }}
                      />
                    </IconButton>
                  </Link>
                </div>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
}
