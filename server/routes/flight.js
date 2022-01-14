import express from 'express';

import { deleteFlight, getFlights, searchFlights, addFlights, updateFlight, subscribeFlight, getFlight, getFlightByFlightNumber, unsubscribeFlight, subscribeFlightSingle, unsubscribeFlightSingle  } from '../controllers/flights.js';

const router = express.Router();

router.get('/', getFlights);
router.post('/add', addFlights );
router.post('/update', updateFlight);
router.post('/delete', deleteFlight);
router.post('/search', searchFlights);
router.post('/subscribe', subscribeFlight);
router.post('/unsubscribe', unsubscribeFlight);
router.get('/flightId', getFlight);
router.get('/flightNumber', getFlightByFlightNumber);
router.post('/subscribeSingle', subscribeFlightSingle);
router.post('/unsubscribeSingle', unsubscribeFlightSingle);

export default router;