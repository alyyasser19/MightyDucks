import React from "react";
import { Grid, Typography } from "@mui/material";
import Ticket from "../Ticket";
import TicketSingle from "../TicketSingle";

function SearchResults({
  flights,
  cabinClass,
  passengerNo,
  userID,
  checked,
  type,
}) {
  const [noFlights, setNoflights] = React.useState(false);

  React.useEffect(() => {
    if (flights.length === 0) {
      setNoflights(true);
    } else {
      setNoflights(false);
    }
  }, [flights]);

  if (flights[0] === "empty") {
    return <Grid></Grid>;
  }

  if (type === "roundtrip")
    return (
      <Grid container sx={{ width: "90%", placeContent: "center", mt: 5 }}>
        {noFlights && (
          <Typography variant='h5' sx={{ color: "secondary.main" }}>
            No Flights Found
          </Typography>
        )}
        {type === "roundtrip" &&
          flights.map((flights, index) => {
            return (
              <Ticket
                flights={flights}
                cabinClass={cabinClass}
                key={index}
                passengerNo={passengerNo}
                userID={userID}
              />
            );
          })}
      </Grid>
    );
  else if (type === "oneway")
    return (
      <Grid container sx={{ width: "90%", placeContent: "center", mt: 5 }}>
        {noFlights && (
          <Typography variant='h5' sx={{ color: "secondary.main" }}>
            No Flights Found
          </Typography>
        )}
        {type === "oneway" &&
          flights.map((flights, index) => {
            return (
              <TicketSingle
                flights={flights}
                cabinClass={cabinClass}
                key={index}
                passengerNo={passengerNo}
                userID={userID}
              />
            );
          })}
      </Grid>
    );
}

export default SearchResults;
