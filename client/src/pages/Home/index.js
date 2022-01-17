import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Grid, Typography, CircularProgress } from "@mui/material";
import UserSearch from "../../components/UserSearch";
import SearchResults from "../../components/SearchResults";
import { useLocation, useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

function Home() {
  const Location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = React.useState("");
  const [flights, setFlights] = React.useState(["empty"]);
  const [cabinClass, setCabinClass] = React.useState("");
  const [error, setError] = React.useState(false);
  const [passengerNo, setPassengerNo] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [checked, setChecked] = React.useState(true);
  const [type, setType] = React.useState("");
  const [curResults, setCurResults] = React.useState("");

  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    if (checked) setType("roundtrip");
    else setType("oneway");

    let token = localStorage.getItem("token");

    axios
      .post("http://localhost:8000/user/verifyUser", {
        token: token,
      })
      .then((response) => {
        console.log(response.data);
        if (token) {
          axios
            .post(
              "http://localhost:8000/user/getUserByID",
              {},
              {
                headers: {
                  "x-auth-token": token,
                },
              }
            )
            .then((res) => {
              if (res.data) {
                setUser(res.data);
                setLoading(false);
              }
            })
            .catch((err) => {
              setError(true);
            });
        } else {
          setLoading(false);
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        return navigate("/");
      });
  }, [Location, navigate, checked]);

  if (loading)
    return (
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ height: "90vh", placeContent: "center" }}>
        <CircularProgress size={100} style={{ alignSelf: "center" }} />
      </Grid>
    );

  const handleSearch = (
    Class,
    passengers,
    arrivalDate,
    departureDate,
    from,
    to
  ) => {
    setCurResults(type);
    axios
      .post("http://localhost:8000/user/searchFlights", {
        arrivalDate: arrivalDate,
        departureDate: departureDate,
        passengers: passengers,
        class: Class,
        from: from,
        to: to,
        type: type,
      })
      .then((res) => {
        console.log(res.data);
        setFlights(res.data);
        setCabinClass(Class);
        setPassengerNo(passengers);
        setError(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  return (
    <Grid container sx={{ mt: 5, placeContent: "center" }}>
      {error && (
        <Typography variant='h5' sx={{ color: "secondary.main" }}>
          Please Enter All Search Requirements
        </Typography>
      )}
      <UserSearch
        search={handleSearch}
        checked={checked}
        handleChangeChecked={handleChangeChecked}
        userID={user._id}
      />
      <SearchResults
        flights={flights}
        userID={user._id}
        cabinClass={cabinClass}
        passengerNo={passengerNo}
        checked={checked}
        type={curResults}
      />
    </Grid>
  );
}

export default Home;
