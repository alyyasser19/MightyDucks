import {React, useEffect} from 'react'
import {
  Grid
} from "@mui/material";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

function SeatsGrid({ seats, selected, handleClick, selectedString }) {
    useEffect(() => {
        console.log('SeatsGrid: useEffect')
      console.log(seats, selected);
      console.log(selectedString);
    }, [])
  let seatsString 
  if (selectedString)
    seatsString = selectedString
  else
    seatsString = []
  
  let selectedSeatsString;
   selectedSeatsString = selected.map((seat) =>  seat.split(",")[0] );
  console.log(seatsString);
  console.log(selectedSeatsString);

  
  
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
                  {seat[2] === "R" && !seatsString.includes(seat[0]) ? (
                    <AirlineSeatReclineExtraIcon
                      color='error'
                      fontSize='large'
                      id={seat[0]}
                    />
                  ) : selectedSeatsString.includes(seat[0]) ? (
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
              {(seat[2] === "R" && !seatsString.includes(seat[0])) ? (
                <AirlineSeatReclineExtraIcon
                  color='error'
                  fontSize='large'
                  id={seat[0]}
                />
              ) : selectedSeatsString.includes(seat[0]) ? (
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
 