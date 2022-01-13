import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Grid, Typography, CircularProgress } from "@mui/material";
import UserSearch from "../../components/UserSearch";
import SearchResults from "../../components/SearchResults";
import { useLocation, useNavigate } from "react-router-dom";
function Home() {
  const Location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = React.useState("");
  const [flights, setFlights] = React.useState(["empty"]);
  const [cabinClass, setCabinClass] = React.useState("");
  const [error, setError] = React.useState(false);
  const [passengerNo, setPassengerNo] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
   let token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:8000/user/getUserByID", {
}, {
  headers: {
    'x-auth-token': token 
          }
        })
        .then((res) => {
          if (res.data) {
            setUser(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          setError(true);
        });
    }
    else {
      return navigate("/login");}
  }, [ Location, navigate ]);
  

  if (loading)
    return (
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ height: "90vh", placeContent:'center'  }}>
        <CircularProgress
          size={100}
          style={{ alignSelf: "center"}}
        />
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
    axios
      .post("http://localhost:8000/user/searchFlights", {
        arrivalDate: arrivalDate,
        departureDate: departureDate,
        passengers: passengers,
        class: Class,
        from: from,
        to: to,
      })
      .then((res) => {
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
      <UserSearch search={handleSearch} userID={user._id} />
      <SearchResults
        flights={flights}
        userID={user._id}
        cabinClass={cabinClass}
        passengerNo={passengerNo}
      />
    </Grid>
  );
}

export default Home;
