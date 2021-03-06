import React from "react";
import TicketFromTo from "../TicketFromTo";
import { Grid, Paper, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";

function Ticket({ flights, cabinClass, onClick, passengerNo, userID }) {
  

  
  React.useEffect(() => {
    console.log(flights);
  }, [flights]);

  const departureFlight = flights.departureFlight;
  const departureFlightNumber = departureFlight.flightNumber;
  const departureFlightFrom = departureFlight.from;
  const departureFlightTo = departureFlight.to;
  const departureFlightDuration = departureFlight.duration;
  const departureFlightDate = departureFlight.departureTime;
  
  
  
  const returnFlight = flights.returnFlight;
  const returnFlightNumber = returnFlight.flightNumber;
  const returnFlightFrom = returnFlight.from;
  const returnFlightTo = returnFlight.to;
  const returnFlightDuration = returnFlight.duration;
  const returnFlightDate = returnFlight.departureTime;

  let price;


  if (cabinClass === "Eco")
  {
    price = parseFloat(departureFlight.priceEco) + parseFloat(returnFlight.priceEco);
  }
  else if (cabinClass === "Bus")
  {
    price = parseFloat(departureFlight.priceBus) + parseFloat(returnFlight.priceBus);
  }
  else if (cabinClass === "First")
  {
    price = parseFloat(departureFlight.priceFirst) + parseFloat(returnFlight.priceFirst);
  }
  

  return (
    <Grid
      container
      direction='row'
      wrap='nowrap'
      sx={{ mt: 1, mb: 5, alignItems: "center" }}>
      <Paper
        elevation={24}
        variant='outlined'
        sx={{ width: "70%", height: "auto" }}>
        <Grid container direction='column' sx={{ mt: "2em", ml: "0.5em" }}>
          <TicketFromTo
            from={departureFlightFrom}
            to={departureFlightTo}
            date={departureFlightDate}
            duration={departureFlightDuration}
            flightNumber={departureFlightNumber}
          />
        </Grid>
        <Grid container direction='column' sx={{ mt: "1em", ml: "0.5em" }}>
          <TicketFromTo
            from={returnFlightFrom}
            to={returnFlightTo}
            date={returnFlightDate}
            duration={returnFlightDuration}
            flightNumber={returnFlightNumber}
          />
        </Grid>
      </Paper>
      <Paper
        elevation={24}
        variant='outlined'
        sx={{ width: "28%", height: "20em" }}>
        <Grid
          container
          direction='column'
          sx={{ textAlign: "center", gap: "2em", mt: "3em" }}>
          <Typography variant='h4' sx={{ color: "secondary.main" }}>
            Price :
          </Typography>
          <Typography variant='h4'>{price * passengerNo}$</Typography>
          <Link
            to={`booking/roundtrip/${departureFlightNumber}-${returnFlightNumber}`}
            replace={true}
            onClick={() => {
              localStorage.setItem("flight", JSON.stringify(flights));
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
