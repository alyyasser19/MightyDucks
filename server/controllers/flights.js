import { flights } from "../models/flights.js";
import { compareDate } from "../API/compareDate.js";
import axios from "axios";
import moment from "moment";

export const addFlights = async (req, res) => {
  const from = req.body.from;
  const to = req.body.to;
  const flightNumber = req.body.flightNumber;
  const arrivalTime = req.body.arrivalTime;
  const departureTime = req.body.departureTime;
  const seatsAvailableEco = Number(req.body.seatsAvailableEco);
  const seatsAvailableBus = Number(req.body.seatsAvailableBus);
  const seatsAvailableFirst = Number(req.body.seatsAvailableFirst);
  const priceEco = Number(req.body.priceEco);
  const priceBus = Number(req.body.priceBus);
  const priceFirst = Number(req.body.priceFirst);
  const subscribers = [];
  const duration = Number(req.body.duration);
  const seats = [];
  let letterCounter = 65;
  let curLetter = String.fromCharCode(letterCounter);
  let seatCounter = 1;

  for (let i = 0; i < seatsAvailableFirst; i++) {
    seats.push(`${curLetter + seatCounter},First,N,${priceFirst}`);
    seatCounter++;
    if (seatCounter === 9) {
      seatCounter = 1;
      letterCounter++;
      curLetter = String.fromCharCode(letterCounter);
    }
  }
  for (let i = 0; i < seatsAvailableBus; i++) {
    seats.push(`${curLetter + seatCounter},Bus,N,${priceBus}`);
    seatCounter++;
    if (seatCounter === 9) {
      seatCounter = 1;
      letterCounter++;
      curLetter = String.fromCharCode(letterCounter);
    }
  }
  for (let i = 0; i < seatsAvailableEco; i++) {
    seats.push(`${curLetter + seatCounter},Eco,N,${priceEco}`);
    seatCounter++;
    if (seatCounter === 9) {
      seatCounter = 1;
      letterCounter++;
      curLetter = String.fromCharCode(letterCounter);
    }
  }

  // Departure Flight
  const newFlight = new flights({
    from: from,
    to: to,
    flightNumber: flightNumber,
    arrivalTime: moment(departureTime).add(duration, "h"),
    departureTime: departureTime,
    seatsAvailableEco: seatsAvailableEco,
    seatsAvailableBus: seatsAvailableBus,
    seatsAvailableFirst: seatsAvailableFirst,
    priceEco: priceEco,
    priceBus: priceBus,
    priceFirst: priceFirst,
    subscribers: subscribers,
    duration: duration,
    seats: seats,
  });

  newFlight
    .save()
    .then(() => {
      // Return Flight
      new flights({
        from: to,
        to: from,
        flightNumber: flightNumber + "R",
        arrivalTime: moment(arrivalTime).add(duration, "h"),
        departureTime: arrivalTime,
        seatsAvailableEco: seatsAvailableEco,
        seatsAvailableBus: seatsAvailableBus,
        seatsAvailableFirst: seatsAvailableFirst,
        priceEco: priceEco,
        priceBus: priceBus,
        priceFirst: priceFirst,
        subscribers: subscribers,
        duration: duration,
        seats: seats,
      })
        .save()
        .then(() => {
          res.status(200).json({
            message: "Flights added successfully",
          });
        });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateFlight = async (req, res) => {
  flights
    .findById(req.body._id)

    .then((flights) => {
      if (!flights) {
        res.status(400).json("Please enter a flight");
      } else if (flights == null) {
        res.status(404).json("Flight not found ");
      } else {
        var keys = [];

        for (var key in req.body) {
          keys.push(key);
        }

        for (let i = 0; i < keys.length; i++) {
          if (keys[i] === "from") {
            flights.from = req.body.from;
          }
          if (keys[i] === "to") {
            flights.to = req.body.to;
          }
          if (keys[i] === "flightNumber") {
            flights.flightNumber = req.body.flightNumber;
          }
          if (keys[i] === "arrivalTime") {
            flights.arrivalTime = req.body.arrivalTime;
          }
          if (keys[i] === "departureTime") {
            flights.departureTime = req.body.departureTime;
          }
          if (keys[i] === "seatsAvailableEco") {
            flights.seatsAvailableEco = req.body.seatsAvailableEco;
          }
          if (keys[i] === "seatsAvailableBus") {
            flights.seatsAvailableBus = req.body.seatsAvailableBus;
          }
          if (keys[i] === "seatsAvailableFirst") {
            flights.seatsAvailableFirst = req.body.seatsAvailableFirst;
          }
          if (keys[i] === "priceEco") {
            flights.priceEco = req.body.priceEco;
          }
          if (keys[i] === "priceBus") {
            flights.priceBus = req.body.priceBus;
          }
          if (keys[i] === "priceFirst") {
            flights.priceFirst = req.body.priceFirst;
          }
          if (keys[i] === "subscribers") {
            flights.subscribers = req.body.subscribers;
          }
          if (keys[i] === "duration") {
            flights.duration = req.body.duration;
          }
        }
        flights
          .save()

          .then(() => {
            var updatedValues = "";

            for (var key in req.body) {
              updatedValues += key + ", ";
            }
            updatedValues = updatedValues.slice(0, -2) + ".";
            updatedValues = updatedValues.slice(4);
            res.status(200).json("updated values: " + updatedValues);
          })

          .catch((err) => res.status(400).json("Error: " + err));
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getFlights = async (req, res) => {
  const test = await flights.find();
  res.status(200).send(test);
};

export const deleteFlight = async (req, res) => {
  if (req.body.flightNumber) {
    const flightNumber = req.body.flightNumber;
    if (flightNumber.charAt(flightNumber.length - 1) === "R") {
      flights
        .findOneAndDelete({ flightNumber: req.body.flightNumber })
        .then(() => {
          flights
            .findOneAndDelete({
              flightNumber: req.body.flightNumber.slice(0, -1),
            })
            .then((flight) => {
              if (flight.subscribers.length > 0) {
                for (let i = 0; i < flight.subscribers.length; i++) {
                  axios
                    .post(
                      "http://localhost:8000/flight/unsubscribe",
                      {
                        _id: flight._id,
                        subscriber: flight.subscribers[i],
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    )
                    .catch((err) => console.log("Error: " + err));
                }
              }
              res.status(200).json("Flight deleted successfully");
            });
        })
        .catch((err) => res.status(400).json("Error: " + err));
    } else {
      flights
        .findOneAndDelete({ flightNumber: req.body.flightNumber })
        .then(() => {
          flights
            .findOneAndDelete({ flightNumber: req.body.flightNumber + "R" })
            .then((flight) => {
              if (flight.subscribers.length > 0) {
                for (let i = 0; i < flight.subscribers.length; i++) {
                  axios
                    .post(
                      "http://localhost:8000/flight/unsubscribe",
                      {
                        _id: flight._id,
                        subscriber: flight.subscribers[i],
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    )
                    .catch((err) => console.log("Error: " + err));
                }
              }
              res.status(200).json("Flight deleted");
            });
        });
    }
  }
};

export const searchFlights = async (req, res) => {
  let filteredFlights = [];
  const body = {};
  if (req.body.flightNumber) {
    req.body.flightNumber = req.body.flightNumber.toUpperCase();
    body.flightNumber = { $regex: req.body.flightNumber, $options: "i" };
  }
  if (req.body.from) {
    req.body.from = req.body.from.toUpperCase();
    body.from = { $regex: req.body.from, $options: "i" };
  }
  if (req.body.to) {
    req.body.to = req.body.to.toUpperCase();
    body.to = { $regex: req.body.to, $options: "i" };
  }
  if (req.body.seatsAvailableBus) {
    body.seatsAvailableBus = req.body.seatsAvailableBus;
  }
  if (req.body.seatsAvailableEco) {
    body.seatsAvailableEco = req.body.seatsAvailableEco;
  }
  if (req.body.seatsAvailableFirst) {
    body.seatsAvailableFirst = req.body.seatsAvailableFirst;
  }
  if (req.body.priceEco) {
    body.priceEco = req.body.priceEco;
  }
  if (req.body.priceBus) {
    body.priceBus = req.body.priceBus;
  }
  if (req.body.priceFirst) {
    body.priceFirst = req.body.priceFirst;
  }
  if (req.body.duration) {
    body.duration = req.body.duration;
  }
  if (body === {}) {
    filteredFlights = await flights.find();
  } else {
    filteredFlights = await flights
      .find(body)
      .catch((err) => res.status(404).send("No flights found"));
  }
  if (req.body.arrivalTime || req.body.departureTime) {
    if (req.body.arrivalTime && !req.body.departureTime) {
      let flights = [];
      for (let i = 0; i < filteredFlights.length; i++) {
        if (compareDate(filteredFlights[i].arrivalTime, req.body.arrivalTime)) {
          flights.push(filteredFlights[i]);
        }
      }
      res.status(200).send(flights);
    } else if (req.body.departureTime && !req.body.arrivalTime) {
      let flights = [];
      for (let i = 0; i < filteredFlights.length; i++) {
        if (
          compareDate(filteredFlights[i].departureTime, req.body.departureTime)
        ) {
          flights.push(filteredFlights[i]);
        }
      }
      res.status(200).send(flights);
    } else {
      let flights = [];
      for (let i = 0; i < filteredFlights.length; i++) {
        if (
          compareDate(filteredFlights[i].arrivalTime, req.body.arrivalTime) &
          compareDate(filteredFlights[i].departureTime, req.body.departureTime)
        ) {
          flights.push(filteredFlights[i]);
        }
      }
      res.status(200).send(flights);
    }
  } else {
    res.status(200).send(filteredFlights);
    return;
  }
};

// export const subscribeFlight = async (req, res) => {
//   const subscriber = req.body.subscriber;
//   if (req.body._id && req.body.subscriber) {
//     flights.findById(req.body._id).then((flights) => {
//       if (!flights) {
//         res.status(400).json("Please enter a flight");
//       } else if (flights == null) {
//         res.status(404).json("Flight not found ");
//       } else if (flights.subscribers.includes(subscriber)) {
//         res.status(400).json("Already subscribed");
//       } else {
//         flights.subscribers.push(subscriber);
//         axios.post("http://localhost:8000/mail/booking", {
//           email: req.body.subscriber,
//           name: req.body.name.first + " " + req.body.name.last,
//           flightID: req.body.flightNumber,
//           price: req.body.price,
//         });
//         flights
//           .save()
//           .then(() => res.json("user added!"))
//           .catch((err) => res.status(400).json("Error: " + err));
//       }
//     });
//   } else {
//     res.status(400).json("Invalid Input!");
//   }
// };

export const subscribeFlight = async (req, res) => {
  console.log(req.body);
  const subscriber = req.body.subscriber;
  flights.findOne({ flightNumber: req.body.flightNumber }).then((flight) => {
    if (!flight) {
      res.status(400).json("Please enter a flight");
    } else if (flight == null) {
      res.status(404).json("Flight not found ");
    } else if (flight.subscribers.includes(subscriber)) {
      res.status(400).json("Already subscribed");
    } else {
      //update Seats
      for (let j = 0; j < req.body.seatFrom.length; j++) {
        const seatsFrom = req.body.seatFrom[j].split(",");
        const cabinClass = seatsFrom[1];
        let found = false;
        for (let i = 0; i < flight.seats.length; i++) {
          let curSeat = flight.seats[i].split(",");
          if (curSeat[0] === seatsFrom[0] && curSeat[1] === seatsFrom[1]) {
            if (curSeat[2] === "N") {
              curSeat[2] = "R";
              flight.seats.splice(i, 1, curSeat.toString());
              if (!flight.subscribers.includes(subscriber))
                flight.subscribers.push(subscriber);
              flight[`seatsAvailable${cabinClass}`] =
                flight[`seatsAvailable${cabinClass}`] - 1;
              found = true;
              break;
            } else if (curSeat[2] === "R") {
              res.status(400).json("Seat already reserved");
            } else continue;
          }
        }
        if (!found) {
          res.status(400).json("Seat not found");
        }
      }
      flight
        .save()
        .then(() => {
          flights
            .findOne({ flightNumber: req.body.flightNumber + "R" })
            .then((flightTo) => {
              if (!flightTo) {
                res.status(400).json("Please enter a flight");
              } else if (flightTo == null) {
                res.status(404).json("Flight not found ");
              } else {
                for (let j = 0; j < req.body.seatTo.length; j++) {
                  const seatsTo = req.body.seatTo[j].split(",");
                  const cabinClassTo = seatsTo[1];
                  let found = false;
                  for (let i = 0; i < flightTo.seats.length; i++) {
                    let curSeat = flightTo.seats[i].split(",");
                    console.log(curSeat);
                    console.log(seatsTo);
                    if (
                      curSeat[0] === seatsTo[0] &&
                      curSeat[1] === seatsTo[1]
                    ) {
                      if (curSeat[2] === "N") {
                        console.log("it's in");
                        curSeat[2] = "R";
                        flightTo.seats.splice(i, 1, curSeat.toString());
                        if (!flightTo.subscribers.includes(subscriber))
                          flightTo.subscribers.push(subscriber);
                        flightTo[`seatsAvailable${cabinClassTo}`] =
                          flightTo[`seatsAvailable${cabinClassTo}`] - 1;
                        found = true;
                        break;
                      } else if (curSeat[2] === "R") {
                        res.status(400).json("Seat already reserved");
                      } else continue;
                    }
                  }
                  if (!found) {
                    res.status(400).json("Seat not found");
                  }
                }
                flightTo.save().catch((err) => console.log("Error: " + err));

                let sumPrice = 0;
                for (let i = 0; i < req.body.seatFrom.length; i++) {
                  const seatsFrom = req.body.seatFrom[i].split(",");
                  let curPrice = parseFloat(seatsFrom[3]);
                  sumPrice += curPrice;
                }
                for (let i = 0; i < req.body.seatTo.length; i++) {
                  const seatsTo = req.body.seatTo[i].split(",");
                  let curPrice = parseFloat(seatsTo[3]);
                  sumPrice += curPrice;
                }

                axios
                  .post("http://localhost:8000/mail/booking", {
                    email: req.body.subscriber,
                    name: req.body.name.first + " " + req.body.name.last,
                    flightID: req.body.flightNumber,
                    price: sumPrice,
                  })
                  .then(() => {
                    res.status(200).json("user added!");
                  });
              }
            });
        })
        .catch((err) => console.log("Error: " + err));
    }
  });
};

export const subscribeFlightSingle = async (req, res) => {
  console.log(req.body);
  const subscriber = req.body.subscriber;
  flights.findOne({ flightNumber: req.body.flightNumber }).then((flight) => {
    if (!flight) {
      res.status(400).json("Please enter a flight");
    } else if (flight == null) {
      res.status(404).json("Flight not found ");
    } else if (flight.subscribers.includes(subscriber)) {
      res.status(400).json("Already subscribed");
    } else {
      //update Seats
      for (let j = 0; j < req.body.seats.length; j++) {
        const seats = req.body.seats[j].split(",");
        const cabinClass = seats[1];
        let found = false;
        for (let i = 0; i < flight.seats.length; i++) {
          let curSeat = flight.seats[i].split(",");
          if (curSeat[0] === seats[0] && curSeat[1] === seats[1]) {
            if (curSeat[2] === "N") {
              curSeat[2] = "R";
              flight.seats.splice(i, 1, curSeat.toString());
              if (!flight.subscribers.includes(subscriber))
                flight.subscribers.push(subscriber);
              flight[`seatsAvailable${cabinClass}`] =
                flight[`seatsAvailable${cabinClass}`] - 1;
              found = true;
              break;
            } else if (curSeat[2] === "R") {
              res.status(400).json("Seat already reserved");
            } else continue;
          }
        }
        if (!found) {
          res.status(400).json("Seat not found");
        }
      }
      flight
        .save()
        .then(() => {
          let sumPrice = 0;
          for (let i = 0; i < req.body.seats.length; i++) {
            const seats = req.body.seats[i].split(",");
            let curPrice = parseFloat(seats[3]);
            sumPrice += curPrice;
          }
          axios
            .post("http://localhost:8000/mail/booking", {
              email: req.body.subscriber,
              name: req.body.name.first + " " + req.body.name.last,
              flightID: req.body.flightNumber,
              price: sumPrice,
            })
            .then(() => {
              res.status(200).json("user added!");
            });
        })
        .catch((err) => console.log("Error: " + err));
    }
  });
};



// export const unsubscribeFlight = async (req, res) => {
//   const subscriber = req.body.subscriber;
//   let subscribers;
//   if (req.body._id && req.body.subscriber) {
//     flights.findById(req.body._id).then((flight) => {
//       if (!flight) {
//         res.status(400).json("Please enter a flight");
//       } else if (flight == null) {
//         res.status(404).json("Flight not found ");
//       } else if (!flight.subscribers.includes(subscriber)) {
//         res.status(400).json("Not subscribed");
//       } else {
//         subscribers = flight.subscribers;
//         subscribers.splice(flight.subscribers.indexOf(subscriber), 1);
//         flight.subscribers = subscribers;
//         flight
//           .save()
//           .then(() => res.json("user removed!"))
//           .catch((err) => console.log("BIGCATCHError: " + err));
//         axios.post("http://localhost:8000/mail/cancel", {
//           email: req.body.subscriber,
//           name: req.body.name.first + " " + req.body.name.last,
//           flightID: req.body.flightNumber,
//           refund: req.body.price,
//         });
//       }
//     });
//   } else {
//     res.status(400).json("Invalid Input!");
//   }
// };

export const unsubscribeFlight = async (req, res) => {
  console.log(req.body);
  const subscriber = req.body.subscriber;
  flights.findOne({ flightNumber: req.body.flightNumber }).then((flight) => {
    if (!flight) {
      res.status(400).json("Please enter a flight");
    } else if (flight == null) {
      res.status(404).json("Flight not found ");
    } else if (!flight.subscribers.includes(subscriber)) {
      res.status(400).json("Not subscribed");
    } else {
      let subscribers = flight.subscribers;
      subscribers.splice(flight.subscribers.indexOf(subscriber), 1);
      flight.subscribers = subscribers;

      for (let j = 0; j < req.body.seatFrom.length; j++) {
        const seatsTo = req.body.seatFrom[j].split(",");
        const cabinClassTo = seatsTo[1];
        let found = false;
        for (let i = 0; i < flight.seats.length; i++) {
          let curSeat = flight.seats[i].split(",");
          if (curSeat[0] === seatsTo[0] && curSeat[1] === seatsTo[1]) {
            if (curSeat[2] === "R") {
              console.log("it's in");
              curSeat[2] = "N";
              flight.seats.splice(i, 1, curSeat.toString());
              flight[`seatsAvailable${cabinClassTo}`] =
                flight[`seatsAvailable${cabinClassTo}`] + 1;
              found = true;
              break;
            } else if (curSeat[2] === "N") {
              res.status(400).json("Seat already Free");
            } else continue;
          }
        }
        if (!found) {
          res.status(400).json("Seat not found");
        }
      }

      flight
        .save()
        .then(() => {
          flights
            .findOne({ flightNumber: req.body.flightNumber + "R" })
            .then((flightTo) => {
              if (!flightTo) {
                res.status(400).json("Please enter a flight");
              } else if (flightTo == null) {
                res.status(404).json("Flight not found ");
              } else {
                subscribers = flightTo.subscribers;
                subscribers.splice(flightTo.subscribers.indexOf(subscriber), 1);
                flightTo.subscribers = subscribers;

                for (let j = 0; j < req.body.seatTo.length; j++) {
                  console.log("first loop");
                  const seatsFrom = req.body.seatTo[j].split(",");
                  const cabinClassFrom = seatsFrom[1];
                  let found = false;
                  for (let i = 0; i < flightTo.seats.length; i++) {
                    console.log("second loop");
                    let curSeat = flightTo.seats[i].split(",");
                    if (
                      curSeat[0] === seatsFrom[0] &&
                      curSeat[1] === seatsFrom[1]
                    ) {
                      if (curSeat[2] === "R") {
                        console.log("found");
                        curSeat[2] = "N";
                        flightTo.seats.splice(i, 1, curSeat.toString());
                        console.log(flightTo.seats);
                        flightTo[`seatsAvailable${cabinClassFrom}`] =
                          flightTo[`seatsAvailable${cabinClassFrom}`] + 1;
                        found = true;
                        break;
                      } else if (curSeat[2] === "N") {
                        res.status(400).json("Seat already Free");
                      } else continue;
                    }
                  }
                  if (!found) {
                    res.status(400).json("Seat not found");
                  }
                }

                let sumPrice = 0;
                for (let i = 0; i < req.body.seatFrom.length; i++) {
                  const seatsFrom = req.body.seatFrom[i].split(",");
                  let curPrice = parseFloat(seatsFrom[3]);
                  sumPrice += curPrice;
                }
                for (let i = 0; i < req.body.seatTo.length; i++) {
                  const seatsTo = req.body.seatTo[i].split(",");
                  let curPrice = parseFloat(seatsTo[3]);
                  sumPrice += curPrice;
                }

                flightTo
                  .save()
                  .then(() => res.json("user removed!"))
                  .catch((err) => console.log("BIGCATCHError: " + err));
                axios.post("http://localhost:8000/mail/cancel", {
                  email: req.body.subscriber,
                  name: req.body.name.first + " " + req.body.name.last,
                  flightID: req.body.flightNumber,
                  refund: sumPrice,
                });
              }
            });
        })
        .catch((err) => console.log("Error: " + err));
    }
  });
};

export const unsubscribeFlightSingle = async (req, res) => {
  console.log(req.body);
  const subscriber = req.body.subscriber;
  flights.findOne({ flightNumber: req.body.flightNumber }).then((flight) => {
    if (!flight) {
      res.status(400).json("Please enter a flight");
    } else if (flight == null) {
      res.status(404).json("Flight not found ");
    } else if (!flight.subscribers.includes(subscriber)) {
      res.status(400).json("Not subscribed");
    } else {
      let subscribers = flight.subscribers;
      subscribers.splice(flight.subscribers.indexOf(subscriber), 1);
      flight.subscribers = subscribers;

      for (let j = 0; j < req.body.seats.length; j++) {
        const seats = req.body.seats[j].split(",");
        const cabinClass = seats[1];
        let found = false;
        for (let i = 0; i < flight.seats.length; i++) {
          let curSeat = flight.seats[i].split(",");
          if (curSeat[0] === seats[0] && curSeat[1] === seats[1]) {
            if (curSeat[2] === "R") {
              console.log("it's in");
              curSeat[2] = "N";
              flight.seats.splice(i, 1, curSeat.toString());
              flight[`seatsAvailable${cabinClass}`] =
                flight[`seatsAvailable${cabinClass}`] + 1;
              found = true;
              break;
            } else if (curSeat[2] === "N") {
              res.status(400).json("Seat already Free");
            } else continue;
          }
        }
        if (!found) {
          res.status(400).json("Seat not found");
        }
      }

      let sumPrice = 0;
      for (let i = 0; i < req.body.seats.length; i++) {
        const seats = req.body.seats[i].split(",");
        let curPrice = parseFloat(seats[3]);
        sumPrice += curPrice;
      }

      flight
        .save()
        .then(() => {
          axios.post("http://localhost:8000/mail/cancel", {
            email: req.body.subscriber,
            name: req.body.name.first + " " + req.body.name.last,
            flightID: req.body.flightNumber,
            refund: sumPrice,
          });
          res.json("user removed!");
        })
        .catch((err) => console.log("Error: " + err));
    }
  });
};


export const getFlight = async (req, res) => {
  if (req.body._id) {
    flights.findById(req.body._id).then((flights) => {
      if (!flights) {
        res.status(400).json("Please enter a flight");
      } else if (flights == null) {
        res.status(404).json("Flight not found ");
      } else {
        res.status(200).json(flights);
      }
    });
  } else {
    res.status(400).json("Invalid Input!");
  }
};

export const getFlightByFlightNumber = async (req, res) => {
  if (req.body.flightNumber) {
    flights.findOne({ flightNumber: req.body.flightNumber }).then((flights) => {
      if (!flights) {
        res.status(410).json("Please enter a flight");
      } else if (flights == null) {
        res.status(404).json("Flight not found ");
      } else {
        res.status(200).json(flights);
      }
    });
  } else {
    res.status(400).json("Invalid Input!");
  }
};
