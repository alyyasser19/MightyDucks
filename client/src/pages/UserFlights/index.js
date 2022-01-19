import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, CircularProgress } from "@mui/material";
import Ticket from "../../components/ReservedFlights";
import axios from "axios";

function UserFlightView() {
  const navigate = useNavigate();
  const [upcoming, setUpcoming] = React.useState({});
  const [past, setPast] = React.useState({});
  const [flights, setFlights] = React.useState({});
  const [noFlights, setNoflights] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  var pastFlights = [];
  var upcomingFlights = [];

  React.useEffect(() => {
    if (localStorage.getItem("token") === null) 
      navigate("/login");
    if (flights.length === 0) {
      setNoflights(true);
    } else {
      setNoflights(false);
    }
    axios
      .post("http://localhost:8000/user/getFlights", { 
      }, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        }
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          res.data.map((flight) => {
            if (new Date(flight.departureTime) > new Date()) {
              upcomingFlights.push(flight);
            } else if (new Date(flight.departureTime) < new Date()) {
              pastFlights.push(flight);
            }
          });
        }
        setFlights(res.data);
        setUpcoming(upcomingFlights);
        setPast(pastFlights);
        setLoading(false);
        setError(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
        setErrorMessage("No Flights Booked");
      });
  }, []);

  if (error || past === undefined || upcoming === undefined)
    return (
      <Grid
        container
        justify='center'
        alignItems='center'
        sx={{ mt: 10, color: "primary.main", placeContent: "center" }}>
        <Typography variant='h4'>{errorMessage}</Typography>
      </Grid>
    );
  else if (loading) {
    return (
      <Grid container direction='column' justify='center' alignItems='center'>
        <CircularProgress
          size={100}
          style={{ alignSelf: "center", marginTop: "20%" }}
        />
      </Grid>
    );
  } else
    return (
      <Grid
        container
        direction='column'
        sx={{ width: "90%", alignItems: "center", mt: 10, ml: 11 }}>
        {noFlights && (
          <Typography variant='h5' sx={{ color: "secondary.main" }}>
            No Flights Found
          </Typography>
        )}
        <Typography variant='h5' sx={{ color: "secondary.main" }}>
          Upcoming Flights
        </Typography>
        {upcoming.map((flight, index) => {
          return <Ticket flights={flight} key={index}  />;
        })}
        <Typography variant='h5' sx={{ color: "secondary.main", mt: 5 }}>
          Past Flights
        </Typography>
        {past.map((flight, index) => {
          return <Ticket flights={flight}  key={index}  />;
        })}
      </Grid>
    );
}

export default UserFlightView;
