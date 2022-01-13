import express from 'express';

import { deleteUser, getUser,getUserByID ,getUsers, searchUsers, addUser, updateUser, addFlightUser,deleteFlightUser, getFlightsUser, searchFlights, loginUser,addPhone, deletePhone, changePassword } from '../controllers/user.js';
import auth from '../API/auth.js';


const router = express.Router();

router.get('/',auth, getUsers);
router.post('/login', loginUser);
router.post('/getUser', getUser);
router.post('/add', addUser );
router.post('/update', updateUser);
router.post('/delete', deleteUser);
router.post('/search', searchUsers);
router.post('/addFlight', addFlightUser);
router.post('/deleteFlight', deleteFlightUser);
router.post('/getFlights', getFlightsUser);
router.post('/searchFlights', searchFlights);
router.post("/getUserByID", auth, getUserByID);
router.post("/addPhone", auth, addPhone);
router.post("/deletePhone", auth, deletePhone);
router.post("/changePassword", auth, changePassword);


export default router; 