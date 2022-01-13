import user from "../models/user.js";
import flight from "../models/flights.js";
import { seat } from "../models/flights.js";
import axios from "axios";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

export const getUserByID = async (req, res) => {
  let id = req.user._id;

  const users = await user.findOne({ _id: id }).select("-Password");
  res.status(200).send(users);
};

export const addUser = async (req, res) => {
  const jwt_key = process.env.JWT_SECRET;
  if (
    !req.body.Email ||
    !req.body.Username ||
    !req.body.homeAddress ||
    !req.body.countryCode ||
    !req.body.passportNumber ||
    !req.body.Password ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.dateOfBirth
  ) {
    res.status(400).send({
      message: "Invalid request: missing required fields!",
    });
    return;
  }

  const Email = req.body.Email;
  const Username = req.body.Username;
  const homeAddress = req.body.homeAddress;
  const countryCode = req.body.countryCode;
  const passportNumber = req.body.passportNumber;
  const Password = req.body.Password;
  const passHashed = bcrypt.hashSync(Password, 10); //password after being hashed
  const Type = req.body.Type;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dateOfBirth = Date(req.body.dateOfBirth);
  const flightNumbers = req.body.flightNumbers;
  const phoneNumber = [req.body.phoneNumber];

  //check if the user already exists

  user
    .findOne({
      email: Email,
    })
    .then(async (user) => {
      if (user) {
        res.status(400).send({
          message: "User already exists",
        });
        return;
      }
    });

  user
    .findOne({
      username: Username,
    })
    .then(async (user) => {
      if (user) {
        res.status(400).send({
          message: "Username already exists",
        });
        return;
      }
    });

  user
    .findOne({
      passportNumber: passportNumber,
    })
    .then(async (user) => {
      if (user) {
        res.status(400).send({
          message: "Passport number already exists",
        });
        return;
      }
    });

  //create new user
  console.log("creating new user");

  const newUser = new user({
    Email: Email,
    Username: Username,
    homeAddress: homeAddress,
    countryCode: countryCode,
    passportNumber: passportNumber,
    Password: passHashed, //adds the hashed password not plain text
    Type: Type,
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    flightNumbers: flightNumbers,
    phoneNumber: phoneNumber,
  });
  if (!validator.isEmail(Email)) {
    res.status(400).json("Error: Invalid Email");
    return;
  }

  newUser
    .save()
    .then(() => {
      console.log("user being created");
      jwt.sign(
        {
          email: Email,
          username: Username,
          _id: newUser._id,
        },
        jwt_key,
        (err, token) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: err,
            });
          }
          console.log(token);
          axios
            .post("http://localhost:8000/mail//signUp", {
              email: Email,
              name: firstName + " " + lastName,
            })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
          res.status(200).json({
            message: "User created successfully",
            token: token,
          });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    });
};

export const updateUser = async (req, res) => {
  console.log(req.body)
  user
    .findById(req.body._id)

    .then((user) => {
      if (!user) {
        res.status(400).json("Please enter a user");
      } else if (user == null) {
        res.status(404).json("User not found ");
      } else {
        var keys = [];

        for (var key in req.body) {
          keys.push(key);
        }

        for (let i = 0; i < keys.length; i++) {
          if (keys[i] === "Email") {
            user.Email = req.body.Email;
          }
          if (keys[i] === "Username") {
            user.Username = req.body.Username;
          }
          if (keys[i] === "homeAddress") {
            user.homeAddress = req.body.homeAddress;
          }
          if (keys[i] === "countryCode") {
            user.countryCode = req.body.countryCode;
          }
          if (keys[i] === "passportNumber") {
            user.passportNumber = req.body.passportNumber;
          }
          if (keys[i] === "Password") {
            user.Password = bcrypt.hashSync(req.body.Password, 10); //updates with the encrypted pass not plain text
          }
          if (keys[i] === "Type") {
            user.Type = req.body.Type;
          }
          if (keys[i] === "firstName") {
            user.firstName = req.body.firstName;
          }
          if (keys[i] === "lastName") {
            user.lastName = req.body.lastName;
          }
          if (keys[i] === "dateOfBirth") {
            user.dateOfBirth = Date.parse(req.body.dateOfBirth);
          }
          if (keys[i] === "flightNumbers") {
            user.flightNumbers = req.body.flightNumbers;
          }
        }
        user
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

          .catch((err) => {
            console.log(err)
            res.status(400).json("Error: " + err)
          });
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getUsers = async (req, res) => {
  console.log(req.user);
  const users = await user.find();
  res.status(200).send(users);
};

export const getUser = async (req, res) => {
  const users = await user.findOne({ Username: req.body.Username });
  res.status(200).send(users);
};

export const deleteUser = async (req, res) => {
  if (req.body._id) {
    user
      .findByIdAndRemove(req.body._id)
      .catch((err) => res.status(400).json("Invalid User!"))
      .then(() => res.json("User Removed!"));
  } else {
    res.status(400).json("Invalid Input!");
  }
};

export const searchUsers = async (req, res) => {
  if (
    req.body.Email ||
    req.body.Username ||
    req.body.homeAddress ||
    req.body.countryCode ||
    req.body.passportNumber ||
    req.body.Password ||
    req.body.Type ||
    req.body.firstName ||
    req.body.lastName ||
    req.body.dateOfBirth ||
    req.body.flightNumbers ||
    req.body._id
  ) {
    if (req.body.Email) {
      req.body.Email = req.body.Email.toUpperCase();
      req.body.Email = { $regex: req.body.Email, $options: "i" };
    }
    if (req.body.Username) {
      req.body.Username = req.body.Username.toUpperCase();
      req.body.Username = { $regex: req.body.Username, $options: "i" };
    }
    if (req.body.homeAddress) {
      req.body.homeAddress = req.body.homeAddress.toUpperCase();
      req.body.homeAddress = { $regex: req.body.homeAddress, $options: "i" };
    }
    if (req.body.countryCode) {
      req.body.countryCode = req.body.countryCode.toUpperCase();
      req.body.countryCode = { $regex: req.body.countryCode, $options: "i" };
    }
    if (req.body.passportNumber) {
      req.body.passportNumber = req.body.passportNumber.toUpperCase();
      req.body.passportNumber = {
        $regex: req.body.passportNumber,
        $options: "i",
      };
    }
    if (req.body.homeAddress) {
      req.body.homeAddress = req.body.homeAddress.toUpperCase();
      req.body.homeAddress = { $regex: req.body.homeAddress, $options: "i" };
    }
    if (req.body.Password) {
      req.body.Password = req.body.Password.toUpperCase();
      req.body.Password = { $regex: req.body.Password, $options: "i" };
    }
    if (req.body.Type) {
      req.body.Type = req.body.Type.toUpperCase();
      req.body.Type = { $regex: req.body.Type, $options: "i" };
    }
    if (req.body.firstName) {
      req.body.firstName = req.body.firstName.toUpperCase();
      req.body.firstName = { $regex: req.body.firstName, $options: "i" };
    }
    if (req.body.lastName) {
      req.body.lastName = req.body.lastName.toUpperCase();
      req.body.lastName = { $regex: req.body.lastName, $options: "i" };
    }
    if (req.body.dateOfBirth) {
      req.body.dateOfBirth = req.body.dateOfBirth.toUpperCase();
      req.body.dateOfBirth = { $regex: req.body.dateOfBirth, $options: "i" };
    }
    if (req.body.flightNumbers) {
      req.body.flightNumbers = req.body.flightNumbers.toUpperCase();
      req.body.flightNumbers = {
        $regex: req.body.flightNumbers,
        $options: "i",
      };
    }
    if (req.body._id) {
      req.body._id = req.body._id.toUpperCase();
      req.body._id = { $regex: req.body._id, $options: "i" };
    }
    const filteredUsers = await user
      .find(req.body)
      .catch((err) => res.status(404).send("No Users found"));
    if (filteredUsers.length === 0) {
      res.status(404).send("No Users found");
    }
    res.status(200).send(filteredUsers);
  } else {
    res.status(400).json("Invalid Input!");
  }
};

export const addFlightUser = async (req, res) => {
  const flightNumber = req.body.flightNumber.toUpperCase();
  let flightId;
  let cabinClass;
  axios({
    method: "get",
    url: "http://localhost:8000/flight/flightNumber",
    headers: {},
    data: {
      flightNumber: flightNumber,
    },
  })
    .then(async (response) => {
      if (response.data.length === 0) {
        res.status(404).json("Flight not found!");
      } else {
        flightId = response.data._id;
        const curUser = await user.findById(req.body._id);
        if (curUser) {
          const curFlight = {
            flightNumber: req.body.flightNumber,
            price: req.body.price,
            baggage: req.body.baggage,
            seat: req.body.seats,
            bookingNumber: req.body.bookingNumber,
            class: req.body.class,
          };
          for (let i = 0; i < curUser.flights.length; i++) {
            if (curUser.flights[i].flightNumber === curFlight.flightNumber) {
              res.status(400).json("Flight already exists!");
              return;
            }
          }
          curUser.flights.push(curFlight);
          curUser.save();
          flight.findById(flightId).then((curFlight) => {
            if (req.body.class === "Economy") {
              cabinClass = "Eco";
            } else if (req.body.class === "Business") {
              cabinClass = "Bus";
            } else if (req.body.class === "First") {
              cabinClass = "First";
            }

            curFlight[`seatsAvailable${req.body.class}`] -=
              req.body.seats.length;
            for (let curSeat in curFlight.seats) {
              for (let i = 0; i < req.body.seats.length; i++) {
                if (curFlight.seats[curSeat].seatNumber === req.body.seats[i]) {
                  curFlight.seats[curSeat].reserved = true;
                  const updatedSeat = new seat({
                    seatNumber: req.body.seats[i],
                    reserved: true,
                    seatType: curFlight.seats[curSeat].seatType,
                  });
                  curFlight.seats.splice(curSeat, 1, updatedSeat);
                }
              }
            }
            curFlight.save();
          });
          //
          axios
            .post("http://localhost:8000/flight/subscribe", {
              _id: flightId,
              flightNumber: flightNumber,
              subscriber: curUser.Email,
              price: curFlight.price,
              name: {
                first: curUser.firstName,
                last: curUser.lastName,
              },
            })
            .catch((err) => console.log(err.data));
          res.status(200).json("Flight added!");
        } else {
          res.status(404).json("User not found!");
        }
      }
    })
    .catch((err) => res.status(410).json(err));
};

export const deleteFlightUser = async (req, res) => {
  const flightNumber = req.body.flightNumber;
  let curFlight;
  let buyer;
  let cabinClass;
  axios({
    method: "get",
    url: "http://localhost:8000/flight/flightNumber",
    headers: {},
    data: {
      flightNumber: flightNumber,
    },
  })
    .then(async (response) => {
      curFlight = response.data;

      if (response.data.length === 0) {
        res.status(404).json("Flight not found!");
      } else {
        user.findById(req.body._id).then((curUser) => {
          if (curUser) {
            let found = false;
            for (let i = 0; i < curUser.flights.length; i++) {
              if (curUser.flights[i].flightNumber === flightNumber) {
                buyer = curUser.flights[i];

                if (curUser.flights[i].class === "First") {
                  cabinClass = "First";
                } else if (curUser.flights[i].class === "Business") {
                  cabinClass = "Bus";
                } else {
                  cabinClass = "Eco";
                }
                curUser.flights.splice(i, 1);
                found = true;
                break;
              }
            }
            if (found) {
              curUser.save();

              flight.findById(curFlight._id).then((curFlight) => {
                curFlight[`seatsAvailable${cabinClass}`] +=
                  req.body.seats.length;
                for (let curSeat in curFlight.seats) {
                  for (let i = 0; i < req.body.seats.length; i++) {
                    if (
                      curFlight.seats[curSeat].seatNumber === req.body.seats[i]
                    ) {
                      curFlight.seats[curSeat].reserved = false;
                      const updatedSeat = new seat({
                        seatNumber: req.body.seats[i],
                        reserved: false,
                        seatType: curFlight.seats[curSeat].seatType,
                      });
                      curFlight.seats.splice(curSeat, 1, updatedSeat);
                    }
                  }
                }
                curFlight.save();
              });
              axios
                .post("http://localhost:8000/flight/unsubscribe", {
                  _id: curFlight._id,
                  flightNumber: flightNumber,
                  subscriber: curUser.Email,
                  price: buyer.price,
                  name: {
                    first: curUser.firstName,
                    last: curUser.lastName,
                  },
                })
                .catch((err) => console.log(err.message));
              res.status(200).json("Flight deleted!");
              return;
            } else {
              res.status(404).json("Flight not found!");
              return;
            }
          } else {
            res.status(404).json("User not found!");
            return;
          }
        });
      }
    })
    .catch((err) => res.status(410).json(err));
};

export const getFlightsUser = async (req, res) => {
  const curUser = await user.findById(req.body._id);
  let flights = [];
  if (curUser) {
    if (curUser.flights.length === 0) {
      res.status(200).json([]);
      return;
    } else {
      for (const flight in curUser.flights) {
        const flightNumber = curUser.flights[flight].flightNumber;
        axios({
          method: "get",
          url: "http://localhost:8000/flight/flightNumber",
          headers: {},
          data: {
            flightNumber: flightNumber,
          },
        })
          .then((response) => {
            if (response.data.length === 0) {
            } else {
              flights.push(response.data);
            }
          })
          .catch((err) => res.status(400).json("Invalid Input!"));
      }
    }
    setTimeout(function () {
      res.status(200).json(flights);
    }, 1000);
  } else {
    res.status(404).json("User not found!");
  }
};

export const searchFlights = async (req, res) => {
  let query = {};

  if (req.body.from) {
    query.from = req.body.from;
  }
  if (req.body.to) {
    query.to = req.body.to;
  }
  if (req.body.departureDate) {
    query.departureTime = req.body.departureDate;
  }
  if (req.body.arrivalDate) {
    query.arrivalTime = req.body.arrivalDate;
  }
  if (req.body.price) {
    query.price = req.body.price;
  }
  if (req.body.baggage) {
    query.baggage = req.body.baggage;
  }

  if (!req.body.from || !req.body.to || !req.body.class) {
    res.status(400).json("Invalid Input!");
    return;
  }
  let flights = [];
  axios
    .post("http://localhost:8000/flight/search", query)
    .then(async (response) => {
      if (response.data.length === 0) {
        res.status(200).json(flights);
      } else {
        for (const flight in response.data) {
          if (
            response.data[flight][`seatsAvailable${req.body.class}`] >=
            req.body.passengers
          ) {
            flights.push(response.data[flight]);
          }
        }
        res.status(200).json(flights);
      }
    })
    .catch((err) => res.status(410).json(err));
};

export const loginUser = async (req, res) => {
  const jwt_secret = process.env.JWT_SECRET;
  const curUser = await user.findOne({ Username: req.body.Username });
  if (!curUser) {
    res.status(404).json("User not found!");
    return;
  }
  bcrypt.compare(req.body.Password, curUser.Password).then((match) => {
    console.log(match);
    if (match) {
      const token = jwt.sign(
        {
          _id: curUser._id,
          Email: curUser.Email,
        },
        jwt_secret,
        {
          expiresIn: "24h",
        }
      );
      res.status(200).json({
        token: token,
        user: curUser,
      });
    } else {
      res.status(400).json("Invalid Password!");
    }
  });
};

export const addPhone = async (req, res) => {
  let id = req.user._id;
  const curUser = await user.findById(id);
  if (curUser) {
    console.log(curUser.phoneNumber);
    if (curUser.phoneNumber.length === 0) {
      curUser.phoneNumber.push(req.body.phoneNumber);
    } else
      if (curUser.phoneNumber.length < 3) 
      {
      for (let i = 0; i < curUser.phoneNumber.length; i++) {
        if (curUser.phoneNumber[i] === req.body.phoneNumber) {
          res.status(400).json("Phone number already exists!");
          return;
        }
      }
      curUser.phoneNumber.push(req.body.phoneNumber);
      }
      else {
        res.status(400).json("You can only have 3 phone numbers!");
        return;
      }
    curUser.save();
    res.status(200).json("Phone added!");
  } else {
    res.status(404).json("User not found!");
  }
}

export const deletePhone = async (req, res) => {
  console.log(req.body.phoneNumber);
  let id = req.user._id;
  const curUser = await user.findById(id);
  if (curUser) {
    for (let i = 0; i < curUser.phoneNumber.length; i++) {
      if (curUser.phoneNumber[i] === req.body.phoneNumber) {
        curUser.phoneNumber.splice(i, 1);
        curUser.save();
        res.status(200).json("Phone deleted!");
        return;
      }
    }
    res.status(404).json("Phone not found!");
  } else {
    res.status(404).json("User not found!");
  }
}

export const changePassword = async (req, res) => {
  const curUser = await user.findById(req.user._id);
  if (curUser) {
    if(req.body.newPassword === req.body.confirmPassword) {
      bcrypt.compare(req.body.oldPassword, curUser.Password).then((match) => {
        if (match) {
          bcrypt.hash(req.body.newPassword, 10).then((hash) => {
            curUser.Password = hash;
            curUser.save();
            res.status(200).json("Password changed!");
          });
        } else {
          res.status(400).json("Invalid Password!");
        }
      });
    } else {
      res.status(400).json("Passwords do not match!");
    }
  } else {
    res.status(404).json("User not found!");
  }
}