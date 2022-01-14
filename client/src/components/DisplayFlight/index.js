import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

//MUI
import { Grid, Paper, Table, TableRow, TableCell, TableContainer, TableHead, TableBody, CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

//Modals
import DeleteModal from "./../DeleteModal";
import UpdateModal from "./../UpdateModal";

//helper
import {formatDate} from "../../API/formatDate";

function DisplayFlight() {
    //states
  const [flights, setFlights] = useState([]);
  const [curFlight, setCurFlight] = useState({});
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = (flight) => {setOpenEdit(true); setCurFlight(flight);};
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenDelete = (flight) => {setOpenDelete(true); setCurFlight(flight);};
  const handleCloseDelete = () => setOpenDelete(false);

    //fetching Flights
  useEffect(() => {
    console.log('displayFlight')
    axios
      .get("http://localhost:8000/flight/")
      .then(function (response) {
        setFlights(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [flights, openDelete, openEdit]);

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
                <TableCell align='center'>Departure Time</TableCell>
                <TableCell align='center'>Arrival Time</TableCell>
                <TableCell align='center'>from</TableCell>
                <TableCell align='center'>to</TableCell>
                <TableCell align='center'>Seats Available Economy</TableCell>
                <TableCell align='center'>Seats Available Business</TableCell>
                <TableCell align='center'>Seats Available First</TableCell>
                <TableCell align='center'>Price Economy</TableCell>
                <TableCell align='center'>Price Business</TableCell>
                <TableCell align='center'>Price First</TableCell>
                <TableCell align='center'>Duration</TableCell>
                <TableCell align='center'>Delete</TableCell>
                <TableCell align='center'>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flights.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align='center'>{row.flightNumber}</TableCell>
                  <TableCell align='center'>
                    {formatDate(row.departureTime)}
                  </TableCell>
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
                  <TableCell align='center'>
                    <IconButton
                      aria-label='delete'
                      size='large'
                      color='secondary'
                      onClick={() => {
                        handleOpenDelete(row);
                      }}>
                      <DeleteIcon fontSize='inherit' />
                    </IconButton>
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton
                      aria-label='edit'
                      size='large'
                      color='primary'
                      onClick={() => {
                        handleOpenEdit(row);
                      }}>
                      <EditIcon fontSize='inherit' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <UpdateModal
        openEdit={openEdit}
        handleCloseEdit={handleCloseEdit}
        flight={curFlight}
      />
      <DeleteModal
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        flight={curFlight}
      />
    </Grid>
  );
}

export default DisplayFlight;
