import express from "express";

import { Cancel, Booking, SignUp, ModifyBooking, test,mailItinerary } from "../controllers/mail.js";


const router = express.Router();

router.get("/", test);
router.post("/cancel", Cancel);
router.post("/booking", Booking);
router.post("/signUp", SignUp);
router.post("/modify", ModifyBooking);
router.post("/itinerary", mailItinerary);

export default router;
