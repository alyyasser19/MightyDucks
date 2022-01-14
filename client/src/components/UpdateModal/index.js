import React from 'react'
import { useEffect, useState } from "react";

import axios from "axios";
import moment from "moment";
import DateAdapter from "@mui/lab/AdapterMoment";

import { Modal, Box, Typography, Button,TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";


function UpdateModal({flight, openEdit, handleCloseEdit}) {
        
    //Flight ID passed from parent component
    const _id = flight._id;

    //states
    const [departureTime, setDepartureTime] = useState(moment());
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [seatsAvailableBus, setSeatsAvailableBus] = useState("");
    const [seatsAvailableEco, setSeatsAvailableEco] = useState("");
  const [seatsAvailableFirst, setSeatsAvailableFirst] = useState("");
  const [priceBus, setPriceBus] = useState("");
  const [priceEco, setPriceEco] = useState("");
  const [priceFirst, setPriceFirst] = useState("");
  const [duration, setDuration] = useState("");



    //update methods
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

    
    //update flight
    const handleUpdate = () => {
                        axios
                          .post("http://localhost:8000/flight/update", {
                            _id: _id,
                            arrivalTime: moment(departureTime).add(duration, "hours"),
                            departureTime: departureTime,
                            from: from,
                            to: to,
                            seatsAvailableBus: seatsAvailableBus,
                            seatsAvailableEco: seatsAvailableEco,
                            seatsAvailableFirst: seatsAvailableFirst,
                            priceBus: priceBus,
                            priceEco: priceEco,
                            priceFirst: priceFirst,
                            duration: duration,
                          })
                          .then(function (response) {
                            handleCloseEdit();
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
    }

//set initial values
  useEffect(() => {
        setDepartureTime(flight.departureTime);
        setFrom(flight.from);
        setTo(flight.to);
        setSeatsAvailableBus(flight.seatsAvailableBus);
        setSeatsAvailableEco(flight.seatsAvailableEco);
    setSeatsAvailableFirst(flight.seatsAvailableFirst);
    setPriceBus(flight.priceBus);
    setPriceEco(flight.priceEco);
    setPriceFirst(flight.priceFirst);
    setDuration(flight.duration);
    }, [flight]);


    return (
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box
          container
          direction='column'
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            gap: "1em",
          }}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Typography variant='h4' gutterBottom color='primary'>
              Modify Flight
            </Typography>
            <DateTimePicker
              label='Departure Time'
              value={departureTime}
              onChange={handleChangeDepartureTime}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "40%", mb: "1em", mr: "1em" }}
                />
              )}
            />
            <TextField
              label='From'
              value={from}
              onChange={handleChangeFrom}
              defaultValue={flight.from}
              sx={{ width: "40%", mb: "1em", mr: "1em" }}
            />
            <TextField
              label='To'
              value={to}
              onChange={handleChangeTo}
              defaultValue={flight.to}
              sx={{ width: "40%", mb: "1em", mr: "1em" }}
            />
            <TextField
              label='Seats Available Economy'
              value={seatsAvailableEco}
              onChange={handleChangeSeatsAvailableEco}
              defaultValue={flight.seatsAvailableEco}
              sx={{ width: "40%", mb: "1em", mr: "1em" }}
            />
            <TextField
              label='Seats Available Business'
              value={seatsAvailableBus}
              onChange={handleChangeSeatsAvailableBus}
              defaultValue={flight.seatsAvailableBus}
              sx={{ width: "40%", mb: "1em", mr: "1em" }}
            />
            <TextField
              label='Seats Available First Class'
              value={seatsAvailableFirst}
              onChange={handleChangeSeatsAvailableFirst}
              defaultValue={flight.seatsAvailableFirst}
              sx={{ width: "40%", mb: "1em", mr: "1em" }}
            />
            <TextField
              label='Price Economy'
              value={priceEco}
              onChange={handleChangePriceEco}
              defaultValue={flight.priceEco}
              sx={{ width: "40%", mb: "1em", mr: "1em" }}
            />
            <TextField
              label='Price Business'
              value={priceBus}
              onChange={handleChangePriceBus}
              defaultValue={flight.priceBus}
              sx={{ width: "40%", mb: "1em", mr: "1em" }}
            />
            <TextField
              label='Price First Class'
              value={priceFirst}
              onChange={handleChangePriceFirst}
              defaultValue={flight.priceFirst}
              sx={{ width: "40%", mb: "1em", mr: "1em" }}
            />
            <TextField
              label='Duration'
              value={duration}
              onChange={handleChangeDuration}
              defaultValue={flight.duration}
              sx={{ width: "40%", mb: "1em", mr: "1em" }}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                handleUpdate();
              }}
              sx={{ mb: "1em", mr: "1em" }}>
              Modify Flight
            </Button>
          </LocalizationProvider>
        </Box>
      </Modal>
    );
}

export default UpdateModal;
