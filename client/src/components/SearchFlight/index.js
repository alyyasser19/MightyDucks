import React from "react";
import { useState } from "react";

import {
  Grid,
  Paper,
  Button,
  Typography,
  TextField,
  Checkbox,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";

import axios from "axios";
import moment from "moment";
import DateAdapter from "@mui/lab/AdapterMoment";
import { formatDate } from "../../API/formatDate.js";

function SearchFlight() {
  //States
  const [flightNumber, setFlightNumber] = useState("");
  const [arrivalTime, setArrivalTime] = useState(moment());
  const [departureTime, setDepartureTime] = useState(moment());
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [seatsAvailableBus, setSeatsAvailableBus] = useState("");
  const [seatsAvailableEco, setSeatsAvailableEco] = useState("");
  const [seatsAvailableFirst, setSeatsAvailableFirst] = useState("");
  const [priceBus, setPriceBus] = useState("");
  const [priceEco, setPriceEco] = useState("");
  const [priceFirst, setPriceFirst] = useState("");
  const [arrival, setArrival] = useState(false);
  const [departure, setDeparture] = useState(false);
  const [load, setLoad] = useState(false);
  const [flights, setFlights] = useState([]);
  const [duration, setDuration] = useState("");

  //Change Functions
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
  const handleArrival = (event) => {
    setArrival(event.target.checked);
  };
  const handleDeparture = (event) => {
    setDeparture(event.target.checked);
  };
  const handleChangePriceBus = (event) => {
    setPriceBus(event.target.value);
  };
  const handleChangePriceEco = (event) => {
    setPriceEco(event.target.value);
  };
  const handleChangePriceFirst = (event) => {
    setPriceFirst(event.target.value);
  };
  const handleChangeDuration = (event) => {
    setDuration(event.target.value);
  };

  //Search Function
  const handleSubmit = () => {
    setLoad(true);
    const res = {};
    if (flightNumber !== "") {
      res.flightNumber = flightNumber;
    }
    if (arrival) {
      res.arrivalTime = arrivalTime;
    }
    if (departure) {
      res.departureTime = departureTime;
    }
    if (from !== "") {
      res.from = from;
    }
    if (to !== "") {
      res.to = to;
    }
    if (seatsAvailableBus !== "") {
      res.seatsAvailableBus = seatsAvailableBus;
    }
    if (seatsAvailableEco !== "") {
      res.seatsAvailableEco = seatsAvailableEco;
    }
    if (seatsAvailableFirst !== "") {
      res.seatsAvailableFirst = seatsAvailableFirst;
    }
    if (priceBus !== "") {
      res.priceBus = priceBus;
    }
    if (priceEco !== "") {
      res.priceEco = priceEco;
    }
    if (priceFirst !== "") {
      res.priceFirst = priceFirst;
    }
    if (duration !== "") {
      res.duration = duration;
    }

    axios
      .post("http://localhost:8000/flight/search", res)
      .then(function (response) {
        setFlights(response.data);
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
        setFlights([]);
        setLoad(false);
      });
  };

  return (
    <Grid
      container
      direction='column'
      sx={{ width: "95%", gap: "2em", alignItems: "center" }}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Typography variant='h4' gutterBottom color='primary'>
          Search Flight
        </Typography>
        <TextField
          label='Flight Number'
          value={flightNumber}
          onChange={handleChangeFlightNumber}
          sx={{ width: "40%" }}
        />
        <Grid container sx={{ alignItems: "center", justifyContent: "center" }}>
          <DateTimePicker
            label='Arrival Time'
            value={arrivalTime}
            onChange={handleChangeArrivalTime}
            disabled={!arrival}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ width: "25%" }}
                disabled={!arrival}
              />
            )}
            sx={{ width: "25%" }}
          />
          <Checkbox
            label='arrival'
            checked={arrival}
            onChange={handleArrival}
          />
          <DateTimePicker
            label='Departure Time'
            value={departureTime}
            onChange={handleChangeDepartureTime}
            disabled={!departure}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ width: "25%" }}
                disabled={!departure}
              />
            )}
          />
          <Checkbox
            label='arrival'
            checked={departure}
            onChange={handleDeparture}
          />
        </Grid>

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
        <TextField
          label='Price Economy'
          value={priceEco}
          onChange={handleChangePriceEco}
          sx={{ width: "40%" }}
        />
        <TextField
          label='Price Business'
          value={priceBus}
          onChange={handleChangePriceBus}
          sx={{ width: "40%" }}
        />

        <TextField
          label='Price First Class'
          value={priceFirst}
          onChange={handleChangePriceFirst}
          sx={{ width: "40%" }}
        />
        <TextField
          label='Duration'
          value={duration}
          onChange={handleChangeDuration}
          sx={{ width: "40%" }}
        />
        <Button
          variant='contained'
          sx={{ width: "10%" }}
          onClick={() => {
            handleSubmit();
          }}>
          Find
        </Button>
      </LocalizationProvider>
      <TableContainer component={Paper} sx={{ width: "95%" }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Flight Number</TableCell>
              <TableCell align='center'>Departure Time</TableCell>
              <TableCell align='center'>Arrival Time</TableCell>
              <TableCell align='center'>from</TableCell>
              <TableCell align='center'>to</TableCell>
              <TableCell align='center'>Seats Available Economy</TableCell>
              <TableCell align='center'>Seats Available Business</TableCell>
              <TableCell align='center'>Seats Available First Class</TableCell>
              <TableCell align='center'>Price Economy</TableCell>
              <TableCell align='center'>Price Business</TableCell>
              <TableCell align='center'>Price First Class</TableCell>
              <TableCell align='center'>Duration</TableCell>
            </TableRow>
          </TableHead>
          {load ? (
            <CircularProgress
              size={100}
              style={{ alignSelf: "center", marginTop: "20%" }}
            />
          ) : (
            <TableBody>
              {flights.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align='center'>{row.flightNumber}</TableCell>
                  <TableCell align='center'>
                    {formatDate(row.departureTime)}
                  </TableCell>{" "}
                  <TableCell align='center'>
                    {formatDate(row.arrivalTime)}
                  </TableCell>
                  <TableCell align='center'>{row.from}</TableCell>
                  <TableCell align='center'>{row.to}</TableCell>
                  <TableCell align='center'>{row.seatsAvailableEco}</TableCell>
                  <TableCell align='center'>{row.seatsAvailableBus}</TableCell>
                  <TableCell align='center'>
                    {row.seatsAvailableFirst}
                  </TableCell>
                  <TableCell align='center'>{row.priceEco}</TableCell>
                  <TableCell align='center'>{row.priceBus}</TableCell>
                  <TableCell align='center'>{row.priceFirst}</TableCell>
                  <TableCell align='center'>{row.duration}</TableCell>
                  <TableCell align='center'></TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default SearchFlight;
