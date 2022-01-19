import {React, useEffect, useState} from "react";
import { Grid, Paper , Button} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import TicketFromTo from "../TicketFromTo";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Ticket({ flights }) {

  const [reload, setReload] = useState(false);
  const departureFlight = flights;
  const departureFlightNumber = departureFlight.flightNumber;
  const departureFlightFrom = departureFlight.from;
  const departureFlightTo = departureFlight.to;
  const departureFlightDuration = departureFlight.duration;
  const departureFlightDate = departureFlight.departureTime;
  const seats = departureFlight.curSeats;

  console.log(seats);

    useEffect(() => {
      console.log(flights);
    }, [flights, reload]);
  
  return (
    <Grid
      container
      direction='row'
      wrap='nowrap'
      sx={{
        mt: 1,
        mb: 5,
        alignItems: "center",
        ml: 1,
        placeContent: "center",
      }}>
      <Paper
        elevation={24}
        variant='outlined'
        sx={{ width: "70%", height: "auto" }}>
        <Grid container direction='column' sx={{ mt: "1em", ml: "0.5em" }}>
          <TicketFromTo
            from={departureFlightFrom}
            to={departureFlightTo}
            date={departureFlightDate}
            duration={departureFlightDuration}
            flightNumber={departureFlightNumber}
          />
        </Grid>
      </Paper>
      <Paper
        elevation={24}
        variant='outlined'
        sx={{ width: "15%", height: "13em" }}>
        <Grid
          container
          direction='column'
          sx={{ textAlign: "center", gap: "0.7em", mt: "2em" }}>
          <Link to={`/itinerary/${departureFlightNumber}`} replace={true} >
            <Button
              variant='contained'
              endIcon={<SendIcon />}
              sx={{ width: "70%", placeSelf: "center", mt: "10%" }}>
              View Flight
            </Button>
          </Link>
            <Button
            variant='contained'
            color='secondary'
              endIcon={<DeleteIcon />}
            sx={{ width: "70%", placeSelf: "center" }}
            onClick={() => {
              axios
                .post("http://localhost:8000/user/deleteSingleFlight", {
                  flightNumber: departureFlightNumber,
                  seats: seats,
                }
                ,
                  {
                    headers: {
                      "x-auth-token": localStorage.getItem("token"),
                    }
                  }
              ).then((res) => {
                console.log(res.data);
                toast.success("Flight Deleted");
                setReload(!reload);
              }).catch((err) => {
                console.log(err);
                toast.error("Error Deleting Flight");
              });
            }}>
              Delete Flight
            </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Ticket;

