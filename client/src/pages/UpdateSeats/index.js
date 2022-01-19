import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import ConfirmFlightModal from "../../components/ConfirmBookingModal";
import SeatGrid from "../../components/seatsGrid";

function ViewSeats({  seatsSelected,classCabin, N,flight }) {
  //console.log(flights, classCabin, N, price, baggage, type);
    console.log(seatsSelected)
    const prevSeats = seatsSelected;
    const selecteNums = seatsSelected.map((seat) =>  seat.split(",")[0] );
    console.log(selecteNums);
  //Construct the seat map
  const seats = [];
  

  for (let i = 0; i < flight.seats.length; i++) {
    seats.push(flight.seats[i].split(","));
  }
  //First Class
  const [first, setFirst] = useState(
    seats.filter((seat) => {
      return seat[1] === "First";
    })
  );
  
  console.log(seats);
  //Economy Class
  const [economy, setEconomy] = useState(
    seats.filter((seat) => {
      return seat[1] === "Eco";
    })
  );


  //Business Class
  const [business, setBusiness] = useState(
    seats.filter((seat) => {
      return seat[1] === "Bus";
    })
  );


  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState(seatsSelected);
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
  let e = [[]];
  let b = [[]];

  const handleSemiConfirm = () => {
    setOpenConfirm(true);
  };

  const handleConfirm = () => {
    if (selected.length < parseInt(N)) {
      toast.warn("Not enough seats selected", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
        axios.post("http://localhost:8000/user/updateSeats", {
            "preSeats": prevSeats,
            "selectedSeats": selected,
            "flightNumber": flight.flightNumber,
        }, {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        }).then((res) => {
            console.log(res.data);
            toast.success("Seats updated successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            window.location.reload();
        }).catch((err) => {
            toast.error("Error updating seats", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
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
    }
      else if (selecteNums.includes(seat[0])) {
          const x = selected.filter((s) => {
              return s.split(',')[0] !== seat[0];
          });

          console.log(x);
          setSelected(x);
        } else if (seat[2] === "R" && !selecteNums.includes(seat[0])) {
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
 

  function func() {
    console.log("lefunc");
    if (!done) {
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
              selectedString={selecteNums}
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
                            selectedString={selecteNums}
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
                          selectedString={selecteNums}
            />
          )}
        </Grid>
        <Grid item></Grid>
      </Grid>
      <ConfirmFlightModal
        openConfirm={openConfirm}
        handleCloseConfirm={handleCloseConfirm}
        setConfirmed={setConfirm}
        handleCon={handleConfirm}
      />
      <Grid>
        <Button onClick={handleSemiConfirm} variant='contained' sx={{ mt: 3 }}>
          update Selection
        </Button>
      </Grid>
    </Grid>
  );
}

export default ViewSeats;
