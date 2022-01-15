import React from "react";
import {
  Grid,
  Paper,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  TextField,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import DateAdapter from "@mui/lab/AdapterMoment";
import moment from "moment";

function UserSearch({ search, user, checked, handleChangeChecked }) {
  const [cabinClass, setCabinClass] = React.useState("");
  const [flightFrom, setFlightFrom] = React.useState("");
  const [flightTo, setFlightTo] = React.useState("");
  const [departure, setDeparture] = React.useState(moment());
  const [ret, setReturn] = React.useState(moment());
  const [passengers, setPassengers] = React.useState(1);

  const handleChangeCabinClass = (event) => {
    setCabinClass(event.target.value);
  };
  const handleChangeFlightFrom = (event) => {
    setFlightFrom(event.target.value);
  };
  const handleChangeFlightTo = (event) => {
    setFlightTo(event.target.value);
  };
  const handleChangeDeparture = (newValue) => {
    setDeparture(moment.utc(moment.utc(newValue).format()));
  };
  const handleChangeReturn = (newValue) => {
    setReturn(moment.utc(moment.utc(newValue).format()));
  };
  const handleChangePassengers = (event) => {
    setPassengers(event.target.value);
  };

  return (
    <Grid
      container
      direction='row'
      wrap='nowrap'
      justifyContent='center'
      alignItems='center'>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Paper
          elevation={24}
          variant='outlined'
          sx={{ width: "60%", height: "17em", mt: "1em" }}>
          <Grid
            container
            direction='column'
            sx={{ mt: "2em", ml: "12%" }}
            wrap='nowrap'>
            <Grid
              container
              direction='row'
              wrap='nowrap'
              sx={{ alignItems: "center" }}>
              <Grid item>
                <FormControl>
                  <InputLabel id='demo-simple-select-label'>
                    Cabin Class
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={cabinClass}
                    label='Cabin Class'
                    sx={{ mb: "2em", mr: "1em", width: "13.5em" }}
                    onChange={handleChangeCabinClass}>
                    <MenuItem value={"Eco"}>Economy</MenuItem>
                    <MenuItem value={"Bus"}>Business</MenuItem>
                    <MenuItem value={"First"}>First</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <InputLabel id='demo-simple-select-label'>
                    Passengers
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={passengers}
                    label='Cabin Class'
                    sx={{ mb: "2em", width: "13.5em" }}
                    onChange={handleChangePassengers}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={{ ml: 4 }}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeChecked}
                  icon={<LoopOutlinedIcon sx={{ fontSize: "1.7em" }} />}
                  checkedIcon={<LoopOutlinedIcon sx={{ fontSize: "1.7em" }} />}
                  sx={{ mb: "2em" }}
                />
              </Grid>
              <Grid item sx={{ ml: 0 }}>
                <Typography variant='body1' sx={{ mb: "2em" }}>
                  {checked ? "Round Trip" : "One Way"}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction='row' sx={{ mb: "2em" }} wrap='nowrap'>
              <TextField
                id='outlined-basic'
                label='From'
                variant='outlined'
                sx={{ mr: "1em" }}
                value={flightFrom}
                onChange={handleChangeFlightFrom}
              />
              <TextField
                id='outlined-basic'
                label='To'
                variant='outlined'
                sx={{ mr: "2em" }}
                value={flightTo}
                onChange={handleChangeFlightTo}
              />
              <DatePicker
                label='Departure'
                disablePast
                value={departure}
                onChange={handleChangeDeparture}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: "20%", mr: "1em" }} />
                )}
                sx={{ width: "20%", mr: "1em" }}
              />
              <DatePicker
                label='Return'
                value={ret}
                disablePast
                onChange={handleChangeReturn}
                disabled={!checked} 
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: "20%", mr: "2em" }} />
                )}
                sx={{ width: "20%", mr: "2em" }}
              />
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                onClick={() =>
                  search(
                    cabinClass,
                    passengers,
                    ret,
                    departure,
                    flightFrom,
                    flightTo
                  )
                }>
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </LocalizationProvider>
    </Grid>
  );
}

export default UserSearch;
