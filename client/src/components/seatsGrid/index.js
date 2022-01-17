import {React, useEffect} from 'react'
import {
  Grid
} from "@mui/material";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

function SeatsGrid({ seats, selected, handleClick }) {
    useEffect(() => {
        console.log('SeatsGrid: useEffect')
            console.log(seats, selected, handleClick);
    }, [])
  return seats.map((seatArray) => {
    var count = 0;
    return (
      <Grid container direction='row'>
        {seatArray.map((seat) => {
          if (count === 4) {
            count = 0;
            return (
              <>
                <Grid item>
                  <CheckBoxOutlineBlankIcon fontSize='large' />
                </Grid>
                <Grid onClick={() => handleClick(seat)} item>
                  {seat[2] === "R" ? (
                    <AirlineSeatReclineExtraIcon
                      color='error'
                      fontSize='large'
                      id={seat[0]}
                    />
                  ) : selected.includes(seat.toString()) ? (
                    <AirlineSeatReclineExtraIcon
                      color='primary'
                      fontSize='large'
                      id={seat[0]}
                    />
                  ) : (
                    <AirlineSeatReclineExtraIcon
                      color='success'
                      fontSize='large'
                      id={seat[0]}
                    />
                  )}
                </Grid>
              </>
            );
          }
          count++;
          return (
            <Grid onClick={() => handleClick(seat)} item>
              {seat[2] === "R" ? (
                <AirlineSeatReclineExtraIcon
                  color='error'
                  fontSize='large'
                  id={seat[0]}
                />
              ) : selected.includes(seat.toString()) ? (
                <AirlineSeatReclineExtraIcon
                  color='primary'
                  fontSize='large'
                  id={seat[0]}
                />
              ) : (
                <AirlineSeatReclineExtraIcon
                  color='success'
                  fontSize='large'
                  id={seat[0]}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
    );
  });
}
 

export default SeatsGrid
