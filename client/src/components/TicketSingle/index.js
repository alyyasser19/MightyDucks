import React from "react";
import TicketFromTo from "../TicketFromTo";
import { Grid, Paper, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";

function Ticket({ flights, cabinClass, onClick, passengerNo, userID }) {
  React.useEffect(() => {
    console.log(flights);
  }, [flights]);

  const departureFlight = flights;
  const departureFlightNumber = departureFlight.flightNumber;
  const departureFlightFrom = departureFlight.from;
  const departureFlightTo = departureFlight.to;
  const departureFlightDuration = departureFlight.duration;
  const departureFlightDate = departureFlight.departureTime;

  let price;

  if (cabinClass === "Eco") {
    price = parseFloat(departureFlight.priceEco);
  } else if (cabinClass === "Bus") {
    price = parseFloat(departureFlight.priceBus);
  } else if (cabinClass === "First") {
    price = parseFloat(departureFlight.priceFirst);
  }

  return (
    <Grid
      container
      direction='row'
      wrap='nowrap'
      sx={{ mt: 1, mb: 5, alignItems: "center", ml: 5 }}>
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
        sx={{ width: "28%", height: "14em" }}>
        <Grid
          container
          direction='column'
          sx={{ textAlign: "center", gap: "0.7em", mt: "2em" }}>
          <Typography variant='h4' sx={{ color: "secondary.main" }}>
            Price :
          </Typography>
          <Typography variant='h4'>{price * passengerNo}$</Typography>
          <Link
            to={`booking/oneway/${departureFlightNumber}`}
            replace={true}
            onClick={() => {
              localStorage.setItem("flight", JSON.stringify(departureFlight));
              localStorage.setItem("cabinClass", cabinClass);
              localStorage.setItem("passengerNo", passengerNo);
            }}>
            <Button
              variant='contained'
              endIcon={<SendIcon />}
              sx={{ width: "27%", placeSelf: "center" }}>
              Book
            </Button>
          </Link>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Ticket;
