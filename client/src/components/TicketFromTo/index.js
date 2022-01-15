import React from 'react'
import { Grid, Typography, Divider } from "@mui/material";
import { AirplanemodeActive,FlightTakeoff, FlightLand } from "@mui/icons-material/";
import moment from 'moment';
import formatDate from '../../API/formatDate';

function FlightFromTo({ from, to, date, duration, flightNumber }) {

  const dateFrom = formatDate(date);
  const dateTo = formatDate(moment(date).add(duration, "h"));
  const timeFrom = dateFrom.substring(11, 20);
  const timeTo = dateTo.substring(11, 20);
  const dayFrom = dateFrom.substring(0, 10);
  const dayTo = dateTo.substring(0, 10);
  
    React.useEffect(() => {
      console.log(timeFrom)
      console.log(dateTo)
    }, []);

    return (
      <Grid
        container
        direction='row'
        spacing={3}
        sx={{ width: "100%", height: "auto",mb:2, mt:2 }}
        wrap='nowrap'>
        <Grid
          item
          direction='column'
          sx={{ width: "20%", textAlign: "center", height: "auto", mt: -2.9 }}>
          <Typography variant='h6' sx={{ color: "secondary.main" }}>
            {flightNumber}
          </Typography>
          <FlightTakeoff sx={{ fontSize: "3em", color: "primary.main" }} />
          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 500, fontSize: "1em" }}>
            {dayFrom}
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 400, fontSize: "0.9em", mt: -1 }}>
            {timeFrom}
          </Typography>
          <Typography
            variant='subtitle2'
            sx={{
              fontWeight: 600,
              fontSize: "1.2em",
              opacity: 0.38,
              mt: -0.5,
              pb:1
            }}>
            {from}
          </Typography>
        </Grid>
        <Grid
          item
          direction='column'
          wrap='nowrap'
          sx={{ width: "100%", textAlign: "center" }}>
          <Typography
            variant='subtitle1'
            sx={{
              fontWeight: 600,
              fontSize: "1.2em",
              opacity: 0.38,
              position: "relative",
              top: "1.3em",
            }}>
            {duration} Hours
          </Typography>
          <Grid container direction='row'>
            <Divider
              orientation='horizontal'
              flexItem
              sx={{
                width: "90%",
                alignSelf: "start",
                mt: "1.4em",
                borderBottom: "solid 4px",
              }}
            />
            <AirplanemodeActive
              sx={{
                transform: "rotate(90deg)",
                fontSize: "3em",
                color: "primary.main",
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          direction='column'
          sx={{ width: "20%", textAlign: "center" }}>
          <FlightLand sx={{ fontSize: "3em", color: "primary.main" }} />
          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 500, fontSize: "1em" }}>
            {dayTo}
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 400, fontSize: "0.9em", mt: -1 }}>
            {timeTo}
          </Typography>
          <Typography
            variant='subtitle2'
            sx={{
              fontWeight: 600,
              fontSize: "1.2em",
              opacity: 0.38,
              mt: -0.5,
              pb:1
            }}>
            {to}
          </Typography>
        </Grid>
      </Grid>
    );
}

export default FlightFromTo
