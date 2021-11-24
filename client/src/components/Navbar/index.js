import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Logo from "../Logo";

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
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, height: "5em" }}>
      <ElevationScroll {...props}>
        <AppBar color='offWhite' position='fixed'>
          <Toolbar>
            <Logo />
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
                  sx={{
                    width: "20em",
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}>
                  Book & Manage
                </Button>
                <Button
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
                  Prepare & Travel
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
                  Manage Flights
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
                  <Menu
                    id='menu-appbar'
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                  </Menu>
                </div>
              )}
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={auth}
                      onChange={handleChange}
                      aria-label='login switch'
                    />
                  }
                  label={auth ? "User" : "Admin"}
                />
              </FormGroup>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
}
