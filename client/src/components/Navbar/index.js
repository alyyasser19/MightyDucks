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
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const [curUser, setCurUser] = React.useState({});
  React.useEffect(() => {
        if (location.pathname === "/") {
          setCurUser({ state: "not logged in" });
        } if(location.pathname === '/home') {
          setCurUser(location.state.user);
        }
    if (
      (location.pathname !== "/admin" &&
      location.pathname !== "/" )  &&
      localStorage.getItem("token")
    ) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [location]);



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <Box sx={{ flexGrow: 1, height: "5em" }}>
      <ElevationScroll {...props}>
        <AppBar color='offWhite' position='fixed'>
          <Toolbar>
            <Link to={"home"} state={{ user: curUser }}>
              <Logo />
            </Link>
            {auth && (
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
                  onClick={() => navigate("/", { replace: true })}
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
            {!auth && (
              <Grid
                container
                justify='flex-end'
                alignItems='center'
                sx={{ ml: 2 }}>
                <Button
                  onClick={() => navigate("/", { replace: true })}
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
                  LOGIN
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
                  <Link to='user' state={{ userID: curUser._id }}>
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
