import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import axios from "axios";


function DeleteModal({ flight, handleCloseDelete, openDelete }) {
   //Flight ID passed from parent component
  const flightNumber = flight.flightNumber;

  const handleDelete = () => {
    axios
      .post("http://localhost:8000/flight/delete", {
        flightNumber
      })
      .then(function (response) {
        handleCloseDelete();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal
      open={openDelete}
      onClose={handleCloseDelete}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Are You Sure You Want To Delete This Flight?
        </Typography>
        <Button
          variant='outlined'
          color='error'
          sx={{ m: 2 }}
          onClick={() => {
            handleDelete();
          }}>
          DELETE
        </Button>
        <Button
          variant='outlined'
          color='success'
          sx={{ m: 2 }}
          onClick={handleCloseDelete}>
          CANCEL
        </Button>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
