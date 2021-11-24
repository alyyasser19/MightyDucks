import React from "react";
import { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";

function DisplayFlight() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const [flightNumber, setFlightNumber] = useState("");
  const [arrivalTime, setArrivalTime] = useState(moment());
  const [departureTime, setDepartureTime] = useState(moment());
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [seatsAvailableBus, setSeatsAvailableBus] = useState("");
  const [seatsAvailableEco, setSeatsAvailableEco] = useState("");
  const [seatsAvailableFirst, setSeatsAvailableFirst] = useState("");

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

  const handleDelete = (_id) => {
    axios
      .post("http://localhost:8000/flight/delete", {
        _id,
      })
      .then(function (response) {
        setDeleted(true);
        handleCloseDelete();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/flight/")
      .then(function (response) {
        setFlights(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [flights, deleted]);

  return (
    <Grid container direction='column'>
      {loading ? (
        <CircularProgress
          size={100}
          style={{ alignSelf: "center", marginTop: "20%" }}
        />
      ) : (
        <TableContainer component={Paper} sx={{ width: "95%" }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Flight Number</TableCell>
                <TableCell align='center'>Arrival Time</TableCell>
                <TableCell align='center'>Departure Time</TableCell>
                <TableCell align='center'>from</TableCell>
                <TableCell align='center'>to</TableCell>
                <TableCell align='center'>Seats Available Business</TableCell>
                <TableCell align='center'>Seats Available Economy</TableCell>
                <TableCell align='center'>
                  Seats Available First Class
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flights.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align='center'>{row.flightNumber}</TableCell>
                  <TableCell align='center'>{row.arrivalTime}</TableCell>
                  <TableCell align='center'>{row.departureTime}</TableCell>
                  <TableCell align='center'>{row.from}</TableCell>
                  <TableCell align='center'>{row.to}</TableCell>
                  <TableCell align='center'>{row.seatsAvailableBus}</TableCell>
                  <TableCell align='center'>{row.seatsAvailableEco}</TableCell>
                  <TableCell align='center'>
                    {row.seatsAvailableFirst}
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton
                      aria-label='delete'
                      size='large'
                      color='secondary'
                      onClick={handleOpenDelete}>
                      <DeleteIcon fontSize='inherit' />
                    </IconButton>
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton
                      aria-label='edit'
                      size='large'
                      color='primary'
                      onClick={() => {
                        setFlightNumber(row.flightNumber);
                        setArrivalTime(row.arrivalTime);
                        setDepartureTime(row.departureTime);
                        setFrom(row.from);
                        setTo(row.to);
                        setSeatsAvailableBus(row.seatsAvailableBus);
                        setSeatsAvailableEco(row.seatsAvailableEco);
                        setSeatsAvailableFirst(row.seatsAvailableFirst);

                        handleOpenEdit();
                      }}>
                      <EditIcon fontSize='inherit' />
                    </IconButton>
                  </TableCell>
                  <Modal
                    open={openDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "40%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                      }}>
                      <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'>
                        Are You Sure You Want To Delete This Flight?
                      </Typography>
                      <Button
                        variant='outlined'
                        color='error'
                        sx={{ m: 2 }}
                        onClick={() => handleDelete(row._id)}>
                        DELETE
                      </Button>
                      <Button
                        variant='outlined'
                        color='success'
                        sx={{ m: 2 }}
                        onClick={handleCloseDelete}>
                        CANCEL
                      </Button>
                    </Box>
                  </Modal>
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
                        <TextField
                          label='Flight Number'
                          value={flightNumber}
                          onChange={handleChangeFlightNumber}
                          defaultValue={row.flightNumber}
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
                          defaultValue={row.from}
                          sx={{ width: "40%" }}
                        />
                        <TextField
                          label='To'
                          value={to}
                          onChange={handleChangeTo}
                          defaultValue={row.to}
                          sx={{ width: "40%" }}
                        />
                        <TextField
                          label='Seats Available Business'
                          value={seatsAvailableBus}
                          onChange={handleChangeSeatsAvailableBus}
                          defaultValue={row.seatsAvailableBus}
                          sx={{ width: "40%" }}
                        />
                        <TextField
                          label='Seats Available Economy'
                          value={seatsAvailableEco}
                          onChange={handleChangeSeatsAvailableEco}
                          defaultValue={row.seatsAvailableEco}
                          sx={{ width: "40%" }}
                        />
                        <TextField
                          label='Seats Available First Class'
                          value={seatsAvailableFirst}
                          onChange={handleChangeSeatsAvailableFirst}
                          defaultValue={row.seatsAvailableFirst}
                          sx={{ width: "40%" }}
                        />
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() => {
                            axios
                              .post("http://localhost:8000/flight/update", {
                                _id: row._id,
                                flightNumber: flightNumber,
                                arrivalTime: arrivalTime,
                                departureTime: departureTime,
                                from: from,
                                to: to,
                                seatsAvailableBus: seatsAvailableBus,
                                seatsAvailableEco: seatsAvailableEco,
                                seatsAvailableFirst: seatsAvailableFirst,
                              })
                              .then(function (response) {
                                handleCloseEdit();
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                          }}>
                          Modify Flight
                        </Button>
                      </LocalizationProvider>
                    </Box>
                  </Modal>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Grid>
  );
}

function AddFlight() {
  const [open, setOpen] = React.useState(false);
  const [flightNumber, setFlightNumber] = useState("");
  const [arrivalTime, setArrivalTime] = useState(moment());
  const [departureTime, setDepartureTime] = useState(moment());
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [seatsAvailableBus, setSeatsAvailableBus] = useState("");
  const [seatsAvailableEco, setSeatsAvailableEco] = useState("");
  const [seatsAvailableFirst, setSeatsAvailableFirst] = useState("");

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
              });
          }}>
          Add Flight
        </Button>
      </LocalizationProvider>
    </Grid>
  );
}

function SearchFlight() {
  const [flightNumber, setFlightNumber] = useState("");
  const [arrivalTime, setArrivalTime] = useState(moment());
  const [departureTime, setDepartureTime] = useState(moment());
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [seatsAvailableBus, setSeatsAvailableBus] = useState("");
  const [seatsAvailableEco, setSeatsAvailableEco] = useState("");
  const [seatsAvailableFirst, setSeatsAvailableFirst] = useState("");
  const [arrival, setArrival] = useState(false);
  const [departure, setDeparture] = useState(false);
  const [flights, setFlights] = useState([]);
  

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
  const handleSubmit = () => {
    const res = {}
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
    
    axios
      .post("http://localhost:8000/flight/search", res)
      .then(function (response) {
        setFlights(response.data);
      }
    ).catch(function (error) {
      console.log(error);
      setFlights([]);
    }
    );
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
              <TableCell align='center'>Arrival Time</TableCell>
              <TableCell align='center'>Departure Time</TableCell>
              <TableCell align='center'>from</TableCell>
              <TableCell align='center'>to</TableCell>
              <TableCell align='center'>Seats Available Business</TableCell>
              <TableCell align='center'>Seats Available Economy</TableCell>
              <TableCell align='center'>Seats Available First Class</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align='center'>{row.flightNumber}</TableCell>
                <TableCell align='center'>{row.arrivalTime}</TableCell>
                <TableCell align='center'>{row.departureTime}</TableCell>
                <TableCell align='center'>{row.from}</TableCell>
                <TableCell align='center'>{row.to}</TableCell>
                <TableCell align='center'>{row.seatsAvailableBus}</TableCell>
                <TableCell align='center'>{row.seatsAvailableEco}</TableCell>
                <TableCell align='center'>{row.seatsAvailableFirst}</TableCell>
                <TableCell align='center'>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

function AdminDashboard() {
  const [add, setAdd] = useState(false);
  const [display, setDisplay] = useState(true);
  const [search, setSearch] = useState(false);

  const handleChange = (input) => {
    if (input === "add") {
      setAdd(true);
      setSearch(false);
      setDisplay(false);
    } else if (input === "edit") {
      setAdd(false);
      setDisplay(false);
      setSearch(false);
    } else if (input === "display") {
      setAdd(false);
      setDisplay(true);
      setSearch(false);
    } else if (input === "remove") {
      setAdd(false);
      setDisplay(false);
      setSearch(false);
    } else if (input === "search") {
      setAdd(false);
      setDisplay(false);
      setSearch(true);
    }
  };

  return (
    <Grid direction='row' container>
      <Grid
        direction='column'
        lg={2}
        md={2}
        sm={1}
        sx={{
          mt: {
            xs: 10,
            md: 5,
            lg: 10,
          },
          gap: "1em",
        }}
        container>
        <Typography variant='h4' color='secondary' align='center'>
          Admin Dashboard
        </Typography>
        <Button onClick={() => handleChange("add")}>Add Flight</Button>
        <Button onClick={() => handleChange("display")}>Display Flights</Button>
        <Button onClick={() => handleChange("search")}>Search Flights</Button>
      </Grid>
      <Grid
        direction='column'
        lg={10}
        md={10}
        sm={11}
        sx={{
          mt: {
            xs: 10,
            md: 5,
            lg: 10,
          },
          gap: "1em",
        }}
        container>
        {add && <AddFlight />}
        {display && <DisplayFlight />}
        {search && <SearchFlight />}
      </Grid>
    </Grid>
  );
}

export default AdminDashboard;
