import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import {  toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';


toast.configure();

function UpdateUserModal({ _id, newUsername, newEmail, newFirst, newLast, newPassport, newDob, newHome, newCountry, handleCloseEdit, openEdit }) {

  const navigate = useNavigate();
  
  const data = {
    _id: _id,
    Email: newEmail,
    Username: newUsername,
    homeAddress: newHome,
    countryCode: newCountry,
    passportNumber: newPassport,
    firstName: newFirst,
    lastName: newLast,
    dateOfBirth: newDob
}
  const handleEdit = () => {
  axios.post("http://localhost:8000/user/update", data)
      .then(()=> {
          toast.success('User updated successfully!', {
          position: toast.POSITION.BOTTOM_RIGHT
        })
        handleCloseEdit();
        setTimeout(function () {
          navigate("/user", {
            replace: true,
          });
        }, 3000);
      })
      .catch((error) => {
        toast.error('An error occurred', {
          position: toast.POSITION.BOTTOM_RIGHT
        })
        handleCloseEdit();
        console.log(error);
      });
  };



  return (
    <Modal
      open={openEdit}
      onClose={handleCloseEdit}
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
        <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ml:2}}>
             Are You Sure You Want To Save Changes?
        </Typography>
        <Button
          variant='outlined'
          color='success'
          sx={{ m: 2 }}
          onClick={handleEdit}
          >
          SAVE
        </Button>
        <Button
          variant='outlined'
          color='error'
          sx={{ m: 2 }}
          onClick={handleCloseEdit}>
          CANCEL
        </Button>
      </Box>
    </Modal>
  );
}

export default UpdateUserModal;
