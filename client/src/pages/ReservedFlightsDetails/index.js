import {React,useState,useEffect} from "react";
import axios from "axios";
import moment from "moment";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import formatDate from "../../API/formatDate";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import UpdateSeats from "../UpdateSeats"

function FlightDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [flight, setFlight] = useState(null);
  const [baggage, setBaggage] = useState(0);
  const [cabinClass, setCabinClass] = useState("");
  const [price, setPrice] = useState(0);
  const [seats, setSeats] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [duration, setDuration] = useState("");
  const [fullClass, setFullClass] = useState("empty");
  const [seatString, setSeatString] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [seatUpdate, setSeatUpdate] = useState(false);






  useEffect(() => {
    if (!flight) {
      let token = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:8000/user/getFlights",
          {},
          {
            headers: {
              "x-auth-token": token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          console.log(
            location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
          );
          for (let i = 0; i < res.data.length; i++) {
            if (
              res.data[i].flightNumber ===
              location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
            ) {
              console.log(res.data[i]);
              setFlight(res.data[i]);
              // setBaggage(res.data[i].curBaggage);
              // setPrice(res.data[i].curPrice);
              // setSeats(res.data[i].curSeats);
              // setFrom(res.data[i].from);
              // setTo(res.data[i].to);
              // setDepartureDate(res.data[i].departureTime);
              // setArrivalDate(res.data[i].arrivalTime);
              // setFlightNumber(res.data[i].flightNumber);
              // setDuration(res.data[i].duration);

              // setTimeout(() => {
              //   console.log(flight)
              // }, 1000)
            
              // for (i = 0; i < seats.length; i++) {
              //   console.log(seats[i]);
              //   let seat = seats[i].split(",");
              //   setCabinClass(seat[1]);
              //   setSeatString(seatString.concat(seat[0] + " "));
              // }

              // if (cabinClass === "Eco")
              //   setFullClass("Economy");
              // else if (cabinClass === "Bus")
              //   setFullClass("Business");
              // else if (cabinClass === "First")
              //   setFullClass("First Class");
              
              
            
            }
            
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/error");
        });
    }
    else {
      if (!flight || baggage === 0 || price === 0 || seats.length === 0 || from === "" || to === "" || departureDate === "" || arrivalDate === "" || flightNumber === "" || duration === "" || fullClass === "empty" || seatString === "" || email === "" || name === "") {
        console.log(flight);
        setBaggage(flight.curBaggage);
        setPrice(flight.curPrice);
        setSeats(flight.curSeats);
        setFrom(flight.from);
        setTo(flight.to);
        setDepartureDate(flight.departureTime);
        setArrivalDate(flight.arrivalTime);
        setFlightNumber(flight.flightNumber);
        setDuration(flight.duration);
        setEmail(flight.email);
        setName(flight.name);

        console.log("gere");
        let curString = "";
        let curClass = "";
        for (let i = 0; i < seats.length; i++) {
          console.log(seats[i]);
          let seat = seats[i].split(",");
          curClass = seat[1];
          curString = curString.concat(seat[0] + " ");
        }
        setCabinClass(curClass);
        setSeatString(curString);

        if (cabinClass === "Eco")
          setFullClass("Economy");
        else if (cabinClass === "Bus")
          setFullClass("Business");
        else if (cabinClass === "First")
          setFullClass("First Class");
        
      }
      else
        setLoading(false);
    }

  }, [flight,baggage,price,seats,from,to,departureDate,arrivalDate,flightNumber,duration,cabinClass,fullClass,seatString,email,name,navigate,location]);

  if (loading) {
    return (
      <Grid container direction='column' justify='center' alignItems='center'>
        <CircularProgress
          size={100}
          style={{ alignSelf: "center", marginTop: "20%" }}
        />
      </Grid>
    );
  }
  return (
    <>
      {!seatUpdate ?
      (  <Grid container direction='row' wrap='nowrap' sx={{ mt: 10 }}>
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
                {from}
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
                {to}
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
                  {formatDate(departureDate)} - {formatDate(arrivalDate)},
                  Single trip ticket
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
              Seats : {seatString}
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
                Flight: {flightNumber}
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
                {formatDate(departureDate)}
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
                  {from}
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
                  {formatDate(departureDate).slice(11, 20)}
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
                  {to}
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
                  {formatDate(moment(arrivalDate)).slice(11, 20)}
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
                  Flight duration: {duration} Hours
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
                {fullClass} | {flight.curBaggage}{" "}
                {flight.curBaggage === 1 ? "Bag" : "Bags"} / Person | 23KG/Bag
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
                Price Summary:
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
                Total Price: {flight.curPrice}$
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
            endIcon={<SendIcon />}
            sx={{ width: "70%", placeSelf: "center", mt: "1em" }}
            onClick={() => {
              axios
                .post("http://localhost:8000/mail/Itinerary", {
                  from,
                  to,
                  departureDate,
                  arrivalDate,
                  duration,
                  fullClass,
                  price: flight.curPrice,
                  email,
                  name,
                  flightNumber,
                  seats: seats.toString(),
                })
                .then((res) => {
                  toast.success("Email sent successfully!");
                });
            }}>
            Mail itinerary
          </Button>
          <Button
            variant='contained'
            endIcon={<AirplaneTicketIcon />}
            sx={{ width: "70%", placeSelf: "center", mt: "1em" }}
            onClick={() => {
              setSeatUpdate(true)
            }}>
            update Seats
          </Button>
          <Button
            variant='contained'
            color='secondary'
            endIcon={<DeleteIcon />}
            sx={{ width: "70%", placeSelf: "center", mt: "1em" }}
            onClick={() => {
              axios
                .post(
                  "http://localhost:8000/user/deleteSingleFlight",
                  {
                    flightNumber: flightNumber,
                    seats: seats,
                  },
                  {
                    headers: {
                      "x-auth-token": localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  console.log(res.data);
                  toast.success("Flight deleted successfully!");
                  navigate("/user/flights");
                })
                .catch((err) => {
                  console.log(err);
                  toast.error("Flight failed to delete!");
                });
            }}>
            Delete Flight
          </Button>
        </Grid>
        </Grid>):
     ( <UpdateSeats flight={flight} seatsSelected={seats} classCabin={cabinClass} N={seats.length}  />
      )
      }
    </>
  );
}

export default FlightDetails;
