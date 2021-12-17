import React from "react";
import { useState } from "react";

import { Grid, Button, Typography, TextField, Box, Collapse, Alert, IconButton } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";
import moment from "moment";
import DateAdapter from "@mui/lab/AdapterMoment";

function formatDate(str){
  var formattedDate = moment(str).format('L');
  var formatted = formattedDate.split('/');
  formattedDate = formatted[1] + '/' + formatted[0] + '/' + formatted[2] + " " + moment(str).format('LT');
  
}
function AddFlight() {
//States 
  const [open, setOpen] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [flightNumber, setFlightNumber] = useState("");
  const [arrivalTime, setArrivalTime] = useState(moment());
  const [departureTime, setDepartureTime] = useState(moment());
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [seatsAvailableBus, setSeatsAvailableBus] = useState("");
  const [seatsAvailableEco, setSeatsAvailableEco] = useState("");
  const [seatsAvailableFirst, setSeatsAvailableFirst] = useState("");

//Change functions
  const handleChangeFlightNumber = (event) => {
    setFlightNumber(event.target.value);
  };
  const handleChangeArrivalTime = (newValue) => {
    setArrivalTime(moment.utc(moment.utc(newValue).format()));
  };
  const handleChangeDepartureTime = (newValue) => {
    setDepartureTime(moment.utc(moment.utc(newValue).format()));
  };
  const handleChangeFrom = (event) => {
    setFrom(event.target.value);
  };
  const handleChangeTo = (event) => {
    setTo(event.target.value);
  };
  const handleChangeSeatsAvailableBus = (event) => {
    setSeatsAvailableBus(event.target.value);
  };
  const handleChangeSeatsAvailableEco = (event) => {
    setSeatsAvailableEco(event.target.value);
  };
  const handleChangeSeatsAvailableFirst = (event) => {
    setSeatsAvailableFirst(event.target.value);
    };

//Submit function
  const handleSubmit = (event) => {
        axios
            .post("http://localhost:8000/flight/add", {
                flightNumber,
                arrivalTime,
                departureTime,
                from,
                to,
                seatsAvailableBus,
                seatsAvailableEco,
                seatsAvailableFirst,
              })
              .then(function (response) {
                setOpen(true);
              })
              .catch(function (error) {
                console.log(error);
                setErrorAlert(true);
              });
    }
    formatDate(departureTime); 
    formatDate(arrivalTime);  
  return (
    <Grid
      container
      direction='column'
      sx={{ gap: "1em", placeItems: "center" }}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Box sx={{ width: "100%", placeItems: "center" }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label='close'
                  color='inherit'
                  size='small'
                  onClick={() => {
                    setOpen(false);
                  }}>
                  <CloseIcon fontSize='inherit' />
                </IconButton>
              }
              sx={{ mb: 2 }}>
              Operation Successful!!
            </Alert>
          </Collapse>
        </Box>
        
<Box sx={{ width: "100%", placeItems: "center" }}>
        <Collapse in={errorAlert}>
            <Alert severity="error">
               action={
                <IconButton
                  aria-label='close'
                  color='inherit'
                  size='small'
                  onClick={() => {
                    errorAlert(false);
                  }}>
                  <CloseIcon fontSize='inherit' />
                </IconButton>
              }
              Operation Failed!!
            </Alert>
          </Collapse>
          </Box>

        <Typography variant='h4' gutterBottom color='primary'>
          Add Flight
        </Typography>
        <TextField
          label='Flight Number'
          value={flightNumber}
          onChange={handleChangeFlightNumber}
          sx={{ width: "40%" }}
        />
        <DateTimePicker
          label='Arrival Time'
          value={arrivalTime}
          onChange={handleChangeArrivalTime}
          renderInput={(params) => (
            <TextField {...params} sx={{ width: "40%" }} />
          )}
          sx={{ width: "40%" }}
        />
        <DateTimePicker
          label='Departure Time'
          value={departureTime}
          onChange={handleChangeDepartureTime}
          renderInput={(params) => (
            <TextField {...params} sx={{ width: "40%" }} />
          )}
        />
        <TextField
          label='From'
          value={from}
          onChange={handleChangeFrom}
          sx={{ width: "40%" }}
        />
        <TextField
          label='To'
          value={to}
          onChange={handleChangeTo}
          sx={{ width: "40%" }}
        />
        <TextField
          label='Seats Available Business'
          value={seatsAvailableBus}
          onChange={handleChangeSeatsAvailableBus}
          sx={{ width: "40%" }}
        />
        <TextField
          label='Seats Available Economy'
          value={seatsAvailableEco}
          onChange={handleChangeSeatsAvailableEco}
          sx={{ width: "40%" }}
        />
        <TextField
          label='Seats Available First Class'
          value={seatsAvailableFirst}
          onChange={handleChangeSeatsAvailableFirst}
          sx={{ width: "40%" }}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            handleSubmit();
          }}>
          Add Flight
        </Button>
      </LocalizationProvider>
    </Grid>
  );
}

export default AddFlight;
