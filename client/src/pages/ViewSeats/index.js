import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import ConfirmFlightModal from "../../components/ConfirmBookingModal";
import SeatGrid from "../../components/seatsGrid";

function ViewSeats({ _id, flights, classCabin, N, price, baggage, type }) {
  console.log(flights, classCabin, N, price, baggage, type);

  const navigate = useNavigate();

  //Construct the seat map
  const seats = [];
  const seatsR = [];
  let flight;
  let flightR;
  if (type === "oneway") flight = flights;
  if (type === "roundtrip") {
    flight = flights.departureFlight;
    flightR = flights.returnFlight;

    for (let i = 0; i < flightR.seats.length; i++) {
      seatsR.push(flightR.seats[i].split(","));
    }
  }

  for (let i = 0; i < flight.seats.length; i++) {
    seats.push(flight.seats[i].split(","));
  }
  //First Class
  const [first, setFirst] = useState(
    seats.filter((seat) => {
      return seat[1] === "First";
    })
  );
  const [firstR, setFirstR] = useState(
    seatsR.filter((seat) => {
      return seat[1] === "First";
    })
  );
  console.log(seatsR)
  console.log(seats)
  //Economy Class
  const [economy, setEconomy] = useState(
    seats.filter((seat) => {
      return seat[1] === "Eco";
    })
  );
  const [economyR, setEconomyR] = useState(
    seatsR.filter((seat) => {
      return seat[1] === "Eco";
    })
  );

  //Business Class
  const [business, setBusiness] = useState(
    seats.filter((seat) => {
      return seat[1] === "Bus";
    })
  );
  const [businessR, setBusinessR] = useState(
    seatsR.filter((seat) => {
      return seat[1] === "Bus";
    })
  );

  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedR, setSelectedR] = useState([]);
  const [isBook, setBook] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setConfirm(false);
    console.log(isConfirm);
  };

  let f = [[]];
  let fR = [[]];
  let e = [[]];
  let eR = [[]];
  let b = [[]];
  let bR = [[]];

  const handleSemiConfirm = () => {
    setOpenConfirm(true);
  };

  const handleConfirm = () => {
    if (selected.length < parseInt(N)) {
      toast.warn("Not enough seats selected", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      // axios
      //   .post(
      //     "http://localhost:8000/user/addSingleFlight",
      //     {
      //       flightNumber: flight.flightNumber,
      //       seats: selected,
      //       bookingNumber: Date.now(),
      //     },
      //     {
      //       headers: {
      //         "x-auth-token": localStorage.getItem("token"),
      //       },
      //     }
      //   )
      //   .then(function (response) {
      //     console.log(response);
      //     const token = localStorage.getItem("token");
      //     localStorage.clear();
      //     localStorage.setItem("token", token);
      //     toast.success("Booking Successful", {
      //       position: toast.POSITION.BOTTOM_RIGHT,
      //     });
      //     setTimeout(function () {
      //       setBook(true);
      //     }, 2000);
      //   })
      //   .catch(function (error) {
      //     if (error)
      //       toast.warn("You have already booked this flight", {
      //         position: toast.POSITION.BOTTOM_RIGHT,
      //       });
      //     setTimeout(function () {
      //       setBook(true);
      //     }, 2000);
      //   });
      const query = {
        flightNumber: flight.flightNumber,
        seats: selected,
        bookingNumber: Date.now(),
      }
      localStorage.setItem("query", JSON.stringify(query));
      localStorage.setItem("price", price);
      localStorage.setItem("type", type);

      let queryR;
      if (type === "roundtrip") {
        queryR = {
          flightNumber: flightR.flightNumber,
          seats: selectedR,
          bookingNumber: Date.now(),
        }
        localStorage.setItem("queryR", JSON.stringify(queryR));
        localStorage.setItem("priceR", price);
      }

      navigate(`/user/payment/${flight.flightNumber}`, {
        replace: true,
      });
    }
  };
  const handleConfirmR = () => {
    if (selectedR.length < parseInt(N)) {
      toast.warn("Not enough seats selected", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      axios
        .post(
          "http://localhost:8000/user/addSingleFlight",
          {
            flightNumber: flightR.flightNumber,
            seats: selectedR,
            bookingNumber: Date.now(),
          },
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        )
        .then(function (response) {
          console.log(response);
          const token = localStorage.getItem("token");
          localStorage.clear();
          localStorage.setItem("token", token);
          toast.success("Booking Successful", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setTimeout(function () {
            setBook(true);
          }, 2000);
        })
        .catch(function (error) {
          if (error)
            toast.warn("You have already booked this flight", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          setTimeout(function () {
            setBook(true);
          }, 2000);
        });
    }
  };

  const handleClick = (seat) => {
    console.log(seat);
    console.log(selected);
    if (selected.includes(seat.toString())) {
      const x = selected.filter((s) => {
        return s !== seat.toString();
      });
      console.log(x);
      setSelected(x);
    } else if (seat[2] === "R") {
      toast.error("Seat already taken", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (selected.length === parseInt(N)) {
      toast.warn("You have selected the maximum number of seats", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      const x = selected.concat(seat.toString());
      console.log(selected.length);
      console.log(selected.length === N);
      console.log(x);
      setSelected(x);
    }
  };
  const handleClickR = (seat) => {
    console.log(seat);
    console.log(selectedR);
    if (selectedR.includes(seat.toString())) {
      const x = selectedR.filter((s) => {
        return s !== seat.toString();
      });
      console.log(x);
      setSelectedR(x);
    } else if (seat[2] === "R") {
      toast.error("Seat already taken", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (selectedR.length === parseInt(N)) {
      toast.warn("You have selected the maximum number of seats", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      const x = selectedR.concat(seat.toString());
      console.log(selectedR.length);
      console.log(selectedR.length === N);
      console.log(x);
      setSelectedR(x);
    }
  };

  function func() {
    console.log("lefunc");
    if (!done) {
      if (type === "roundtrip") {
        console.log(type);
        for (let i = 0; i < firstR.length; i+=8) {
          let y = [];
          for (let j = 0; j < 8; j++) {
            if (i + j < firstR.length) {
              y.push(firstR[i + j]);
            } else {
              break;
            }
          }
          fR.push(y);
        }
        setFirstR(fR);
        console.log("firstR", fR);

        for (let i = 0; i < businessR.length; i += 8) {
          let y = [];
          for (let j = 0; j < 8; j++) {
            if (i + j < businessR.length) {
              y.push(businessR[i + j]);
            } else {
              break;
            }
          }
          bR.push(y);
        }
        setBusinessR(bR);
        console.log("businessR", bR);

        for (let i = 0; i < economyR.length; i += 8) {
          let y = [];
          for (let j = 0; j < 8; j++) {
            if (i + j < economyR.length) {
              y.push(economyR[i + j]);
            } else {
              break;
            }
          }
          eR.push(y);
        }
        setEconomyR(eR);
        console.log("economyR", eR);
      }

      for (let i = 0; i < first.length; i += 8) {
        let y = [];
        for (let j = 0; j < 8; j++) {
          if (i + j < first.length) {
            y.push(first[i + j]);
          } else {
            break;
          }
        }
        f.push(y);
      }
      setFirst(f);
      console.log("first", f);

      for (let i = 0; i < business.length; i += 8) {
        let y = [];
        for (let j = 0; j < 8; j++) {
          if (i + j < business.length) {
            y.push(business[i + j]);
          } else {
            break;
          }
        }
        b.push(y);
      }
      setBusiness(b);

      for (let i = 0; i < economy.length; i += 8) {
        let y = [];
        for (let j = 0; j < 8; j++) {
          if (i + j < economy.length) {
            y.push(economy[i + j]);
          } else {
            break;
          }
        }
        e.push(y);
      }
      setEconomy(e);
      setDone(true);
    }
  }
  useEffect(() => {
    func();
    console.log(classCabin);
    console.log(selected);
    console.log(N);
  });

  if (isBook) return <Navigate to='/user/flights' replace={true} />;

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      sx={{ placeContent: "center" }}>
      <Grid
        style={{ margin: "5em", width: "30%" }}
        container
        direction='column'>
        <Typography variant='h4' style={{ margin: "1em" }}>
          {flight.flightNumber}
        </Typography>
        {classCabin === "First" && (
          <Grid item>
            <Typography variant='h4'>First Seats</Typography>
          </Grid>
        )}
        <Grid container direction='column'>
          {done && classCabin === "First" && (
            <SeatGrid
              seats={first}
              handleClick={handleClick}
              selected={selected}
            />
          )}
        </Grid>
        {classCabin === "Bus" && (
          <Grid item>
            <Typography variant='h4'>Business Seats</Typography>
          </Grid>
        )}
        <Grid container direction='column'>
          {done && classCabin === "Bus" && (
            <SeatGrid
              seats={business}
              handleClick={handleClick}
              selected={selected}
            />
          )}
        </Grid>
        {classCabin === "Eco" && (
          <Grid item>
            <Typography variant='h4'>Economy Seats</Typography>
          </Grid>
        )}
        <Grid container direction='column'>
          {done && classCabin === "Eco" && (
            <SeatGrid
              seats={economy}
              handleClick={handleClick}
              selected={selected}
            />
          )}
        </Grid>
        <Grid item>
        </Grid>
      </Grid>
      {type === "roundtrip" && (
        <Grid
          style={{ margin: "5em", width: "30%" }}
          container
          direction='column'>
          <Typography variant='h4' style={{ margin: "1em" }}>
            {flightR.flightNumber}
          </Typography>
          {classCabin === "First" && (
            <Grid item>
              <Typography variant='h4'>First Class Seats</Typography>
            </Grid>
          )}
          <Grid container direction='column'>
            {done && classCabin === "First" && (
              <SeatGrid
                seats={firstR}
                handleClick={handleClickR}
                selected={selectedR}
              />
            )}
          </Grid>
          {classCabin === "Bus" && (
            <Grid item>
              <Typography variant='h4'>Business Seats</Typography>
            </Grid>
          )}
          <Grid container direction='column'>
            {done && classCabin === "Bus" && (
              <SeatGrid
                seats={businessR}
                handleClick={handleClickR}
                selected={selectedR}
              />
            )}
          </Grid>
          {classCabin === "Eco" && (
            <Grid item>
              <Typography variant='h4'>Economy Seats</Typography>
            </Grid>
          )}
          <Grid container direction='column'>
            {done && classCabin === "Eco" && (
              <SeatGrid
                seats={economyR}
                handleClick={handleClickR}
                selected={selectedR}
              />
            )}
          </Grid>
        </Grid>
      )}
      <ConfirmFlightModal
        openConfirm={openConfirm}
        handleCloseConfirm={handleCloseConfirm}
        setConfirmed={setConfirm}
        handleCon={handleConfirm}
      />
      <Grid>
        <Button onClick={handleSemiConfirm} variant='contained' sx={{ mt: 3 }}>
          Confirm Selection
        </Button>
      </Grid>
    </Grid>
  );
}


export default ViewSeats;
