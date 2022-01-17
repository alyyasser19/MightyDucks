import React from "react";
import ConfirmFlightModal from "../../components/ConfirmBookingModal";

import { Grid, Paper, Typography, Divider,Button } from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import formatDate from '../../API/formatDate'
import moment from 'moment'
import axios from "axios";
import ViewSeats from "../ViewSeats";






function Booking() {
  console.log("Booking")
  const flights = JSON.parse(localStorage.getItem("flight"));
  const cabinClass = localStorage.getItem("cabinClass");
  const passengerNo = localStorage.getItem("passengerNo");

  const departureFlight = flights.departureFlight;
  const returnFlight = flights.returnFlight;



  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({})
  const [flightInfo, setFlightInfo] = React.useState({})
  const [baggageLimit, setBaggageLimit] = React.useState(0);
  const [cabin, setCabin] = React.useState("");
  const [fees, setFees] = React.useState(0);
  const [seats, setSeats] = React.useState(false);
  
  
  let departureFlightNumber = departureFlight.flightNumber;
  let departureFrom = departureFlight.from;
  let departureTo = departureFlight.to;
  let departureDepartureDate = departureFlight.departureTime;
  let departureArrivalDate = departureFlight.arrivalTime;
  let departureDuration = departureFlight.duration;


  let returnFlightNumber = returnFlight.flightNumber;
  let returnFrom = returnFlight.from;
  let returnTo = returnFlight.to;
  let returnDepartureDate = returnFlight.departureTime;
  let returnArrivalDate = returnFlight.arrivalTime;
  let returnDuration = returnFlight.duration;


  let baggage;
  if (cabinClass === "Eco")
  {
    baggage = 1
  }
  else if (cabinClass === "Bus")
  {
    baggage = 2;
  }
  else if (cabinClass === "First")
  {
    baggage = 3;
  }

  let fullClass;
  if (cabinClass === "Eco")
  {
    fullClass = "Economy"
  }
  else if (cabinClass === "Bus")
  {
    fullClass = "Business"
  }
  else if (cabinClass === "First")
  {
    fullClass = "First Class"
  }
  

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

  React.useEffect( () => {
    axios.post("http://localhost:8000/user/getUserByID", {
    }, {
      headers: {
        "x-auth-token": localStorage.getItem("token")
      }
          })
          .then((res) => {
              if(res.data){
                setUserInfo(res.data);
              }}
          ).catch((error) => {
            console.log(error)
          })
    setFlightInfo(flights);
    setBaggageLimit(baggage)
    setCabin(fullClass)
    setFees(price * passengerNo)
  },[])


  
  
  const handleCloseConfirm = () => setOpenConfirm(false);
  return (
    <>
      {!seats ? (
        <Grid container direction='row' wrap='nowrap' sx={{ mt: 10 }}>
          <Grid
            container
            direction='column'
            wrap='nowrap'
            marginLeft='3em'
            width='180%'>
            <Paper
              elevation={24}
              variant='outlined'
              sx={{ width: "90%", height: "7em", backgroundColor: "#327089" }}>
              <Grid container direction='row'>
                <Typography
                  variant='h5'
                  sx={{
                    color: "#ffffff",
                    textAlign: "left",
                    gap: "2em",
                    mt: "1em",
                    ml: "1em",
                  }}>
                  {departureFrom}
                </Typography>
                <ArrowRightAltIcon
                  sx={{
                    fontSize: "5em",
                    color: "#ffffff",
                  }}
                />
                <Typography
                  variant='h5'
                  sx={{
                    color: "#ffffff",
                    textAlign: "right",
                    gap: "2em",
                    mt: "1em",
                  }}>
                  {departureTo}
                </Typography>
                <Grid container direction='column' wrap='nowrap'>
                  <Typography
                    variant='h5'
                    sx={{
                      fontSize: "0.75em",
                      color: "#d3d3d3",
                      textAlign: "left",
                      gap: "2em",
                      mt: "-0.5em",
                      ml: "2em",
                    }}>
                    {formatDate(departureDepartureDate)} -{" "}
                    {formatDate(departureArrivalDate)})}, round trip ticket
                  </Typography>
                </Grid>
                <Typography
                  variant='h5'
                  sx={{
                    fontSize: "1.75em",
                    color: "#ffffff",
                    ml: "25em",
                    mt: "1.25em",
                  }}>
                  RESERVED
                </Typography>
              </Grid>
            </Paper>
            <Paper
              elevation={24}
              variant='outlined'
              sx={{ width: "90%", height: "3em" }}>
              <Typography
                variant='h6'
                sx={{
                  fontSize: "1em",
                  color: "#000000",
                  textAlign: "left",
                  gap: "2em",
                  mt: "0.75em",
                  ml: "1.5em",
                }}>
                Confirmation number: {Date.now()}
              </Typography>
            </Paper>
            <Paper
              elevation={24}
              variant='outlined'
              sx={{ width: "90%", height: "3em", backgroundColor: "#327089" }}>
              <Grid container direction='row' wrap='nowrap'>
                <Typography
                  variant='h6'
                  sx={{
                    fontSize: "1em",
                    color: "#ffffff",
                    textAlign: "left",
                    gap: "2em",
                    mt: "0.75em",
                    ml: "1.5em",
                  }}>
                  Flight: {departureFlightNumber}
                </Typography>
                <Typography
                  variant='h6'
                  sx={{
                    fontSize: "1em",
                    color: "#ffffff",
                    textAlign: "left",
                    gap: "2em",
                    mt: "0.75em",
                    ml: "1.5em",
                  }}>
                  {formatDate(departureDepartureDate)}
                </Typography>
                <Typography
                  variant='h6'
                  sx={{
                    fontSize: "0.85em",
                    color: "#d3d3d3",
                    textAlign: "left",
                    gap: "2em",
                    mt: "1.1em",
                    ml: "1.5em",
                  }}>
                  Departure, non-stop
                </Typography>
              </Grid>
            </Paper>
            <Paper
              elevation={24}
              variant='outlined'
              sx={{ width: "90%", height: "11em" }}>
              <Grid container direction='row' wrap='nowrap'>
                <Grid container direction='column' wrap='nowrap'>
                  <Typography
                    variant='h6'
                    sx={{
                      fontSize: "1em",
                      color: "#000000",
                      textAlign: "left",
                      gap: "2em",
                      mt: "0.75em",
                      ml: "1.5em",
                    }}>
                    {departureFrom}
                  </Typography>
                  <Typography
                    variant='h6'
                    sx={{
                      fontSize: "0.85em",
                      color: "#636363",
                      textAlign: "left",
                      gap: "2em",
                      mt: "1.1em",
                      ml: "1.9em",
                    }}>
                    {formatDate(departureDepartureDate).slice(11, 20)}
                  </Typography>
                </Grid>
                <Grid container direction='column' wrap='nowrap'>
                  <Typography
                    variant='h6'
                    sx={{
                      fontSize: "1em",
                      color: "#000000",
                      textAlign: "left",
                      gap: "2em",
                      mt: "0.75em",
                      ml: "2.5em",
                    }}>
                    {departureTo}
                  </Typography>
                  <Typography
                    variant='h6'
                    sx={{
                      fontSize: "0.85em",
                      color: "#636363",
                      textAlign: "left",
                      gap: "2em",
                      mt: "1.1em",
                      ml: "2.9em",
                    }}>
                    {formatDate(moment(departureArrivalDate)).slice(11, 20)}
                  </Typography>
                </Grid>
                <Grid container direction='column' wrap='nowrap'>
                  <Typography
                    variant='h6'
                    sx={{
                      fontSize: "1em",
                      color: "#000000",
                      textAlign: "left",
                      gap: "2em",
                      mt: "0.75em",
                      ml: "5em",
                    }}>
                    Flight duration: {departureDuration} Hours
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction='column' wrap='nowrap'>
                <Divider
                  orientation='horizontal'
                  flexItem
                  sx={{
                    opacity: "30%",
                    mt: "1.4em",
                    borderBottom: "solid 2.5px",
                    ml: "2em",
                    mr: "2em",
                  }}
                />
                <Typography
                  variant='h6'
                  sx={{
                    fontSize: "1em",
                    color: "#000000",
                    textAlign: "left",
                    gap: "2em",
                    mt: "1.3em",
                    ml: "1.5em",
                  }}>
                  {fullClass} | {baggage} Bag(s) / Person | 23KG/Bag
                </Typography>
              </Grid>
            </Paper>
            <Paper
              elevation={24}
              variant='outlined'
              sx={{ width: "90%", height: "3em", backgroundColor: "#327089" }}>
              <Grid container direction='row' wrap='nowrap'>
                <Typography
                  variant='h6'
                  sx={{
                    fontSize: "1em",
                    color: "#ffffff",
                    textAlign: "left",
                    gap: "2em",
                    mt: "0.75em",
                    ml: "1.5em",
                  }}>
                  Flight: {returnFlightNumber}
                </Typography>
                <Typography
                  variant='h6'
                  sx={{
                    fontSize: "1em",
                    color: "#ffffff",
                    textAlign: "left",
                    gap: "2em",
                    mt: "0.75em",
                    ml: "1.5em",
                  }}>
                  {formatDate(returnDepartureDate)}
                </Typography>
                <Typography
                  variant='h6'
                  sx={{
                    fontSize: "0.85em",
                    color: "#d3d3d3",
                    textAlign: "left",
                    gap: "2em",
                    mt: "1.1em",
                    ml: "1.5em",
                  }}>
                  Return, non-stop
                </Typography>
              </Grid>
            </Paper>
            <Paper
              elevation={24}
              variant='outlined'
              sx={{ width: "90%", height: "11em" }}>
              <Grid container direction='row' wrap='nowrap'>
                <Grid container direction='column' wrap='nowrap'>
                  <Typography
                    variant='h6'
                    sx={{
                      fontSize: "1em",
                      color: "#000000",
                      textAlign: "left",
                      gap: "2em",
                      mt: "0.75em",
                      ml: "1.5em",
                    }}>
                    {returnTo}
                  </Typography>
                  <Typography
                    variant='h6'
                    sx={{
                      fontSize: "0.85em",
                      color: "#636363",
                      textAlign: "left",
                      gap: "2em",
                      mt: "1.1em",
                      ml: "1.9em",
                    }}>
                    {formatDate(returnDepartureDate).slice(11, 20)}
                  </Typography>
                </Grid>
                <Grid container direction='column' wrap='nowrap'>
                  <Typography
                    variant='h6'
                    sx={{
                      fontSize: "1em",
                      color: "#000000",
                      textAlign: "left",
                      gap: "2em",
                      mt: "0.75em",
                      ml: "2.5em",
                    }}>
                    {returnFrom}
                  </Typography>
                  <Typography
                    variant='h6'
                    sx={{
                      fontSize: "0.85em",
                      color: "#636363",
                      textAlign: "left",
                      gap: "2em",
                      mt: "1.1em",
                      ml: "2.9em",
                    }}>
                    {formatDate(moment(returnArrivalDate)).slice(11, 22)}
                  </Typography>
                </Grid>
                <Grid container direction='column' wrap='nowrap'>
                  <Typography
                    variant='h6'
                    sx={{
                      fontSize: "1em",
                      color: "#000000",
                      textAlign: "left",
                      gap: "2em",
                      mt: "0.75em",
                      ml: "5em",
                    }}>
                    Flight duration: {returnDuration} Hours
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction='column' wrap='nowrap'>
                <Divider
                  orientation='horizontal'
                  flexItem
                  sx={{
                    opacity: "30%",
                    mt: "1.4em",
                    borderBottom: "solid 2.5px",
                    ml: "2em",
                    mr: "2em",
                  }}
                />
                <Typography
                  variant='h6'
                  sx={{
                    fontSize: "1em",
                    color: "#000000",
                    textAlign: "left",
                    gap: "2em",
                    mt: "1.3em",
                    ml: "1.5em",
                  }}>
                  {fullClass}| {baggage} Bag(s) | 23KG/Bag
                </Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid container direction='column' wrap='nowrap'>
            <Paper
              elevation={24}
              variant='outlined'
              sx={{ width: "90%", height: "3em", backgroundColor: "#327089" }}>
              <Grid container direction='row' wrap='nowrap'>
                <Typography
                  variant='h6'
                  sx={{
                    fontSize: "1em",
                    color: "#ffffff",
                    textAlign: "left",
                    gap: "2em",
                    mt: "0.75em",
                    ml: "1.5em",
                  }}>
                  Price Summary
                </Typography>
              </Grid>
            </Paper>
            <Paper
              elevation={24}
              variant='outlined'
              sx={{ width: "90%", height: "12em" }}>
              <Grid container direction='column' wrap='nowrap'>
                <Typography
                  variant='h6'
                  sx={{
                    fontSize: "1.5em",
                    color: "#000000",
                    textAlign: "left",
                    gap: "2em",
                    mt: "0.75em",
                    ml: "1.5em",
                  }}>
                  {passengerNo === 1 ? "1 Ticket" : passengerNo + " Tickets"}
                </Typography>
                <Typography
                  variant='h6'
                  sx={{
                    fontSize: "1.2em",
                    color: "#636363",
                    textAlign: "left",
                    gap: "2em",
                    mt: "1em",
                    ml: "1.9em",
                  }}>
                  Flight fee: {price * passengerNo}$
                </Typography>
                <Typography
                  variant='h6'
                  sx={{
                    fontSize: "0.7em",
                    color: "#C8655D",
                    textAlign: "left",
                    gap: "2em",
                    mt: "3em",
                    ml: "1.9em",
                  }}>
                  *All prices are in USD. <br />
                  *Taxes and Fees are included.
                </Typography>
              </Grid>
            </Paper>
            <Button
              variant='contained'
              sx={{
                width: "40%",
                backgroundColor: "#C8655D",
                fontSize: "1em",
                mt: "2em",
              }}
              onClick={() => {
                setSeats(true);
              }}>
              Select Seats
            </Button>
            <ConfirmFlightModal
              openConfirm={openConfirm}
              handleCloseConfirm={handleCloseConfirm}
              flight={flightInfo}
              user={userInfo}
              cabin={cabin}
              price={fees}
              baggage={baggageLimit}
              tickets={passengerNo}
            />
          </Grid>
        </Grid>
      ) : (
        <ViewSeats
          baggage={baggage}
          price={fees}
          N={passengerNo}
          classCabin={cabinClass}
          flights={flights}
          type={"roundtrip"}
        />
      )}
    </>
  );
}

export default Booking
