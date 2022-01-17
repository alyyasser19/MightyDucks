import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#327089",
      color: "#c8655d",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#327089" },
      "::placeholder": { color: "#327089" },
    },
    invalid: {
      iconColor: "#800000",
      color: "#800000",
    },
  },
};

export default function PaymentForm({ price, setLoading, setError }) {
  const [name, setName] = useState("");
  const stripe = useStripe();
    const elements = useElements();
    
    const query = JSON.parse(localStorage.getItem("query"));
    const type = localStorage.getItem("type");
    const navigate = useNavigate();

    let queryR;
    if (type === 'roundtrip')
        queryR = JSON.parse(localStorage.getItem("queryR"));
    

  while (!stripe || !elements) {
    return <CircularProgress />;
  }

  const handleNameChange = (e) => {
    console.log(stripe);
    setName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);

    if (!error) {
      try {
        const { id } = paymentMethod;
        axios
          .post("http://localhost:8000/user/payment", {
            amount: 1000,
            id,
          })
          .then((res) => {
              console.log(res.data.message);
              console.log(query, queryR, price, type);
            toast.warn(
              "Insufficient funds, but we'll book your flights anyway, QUAK!",
              {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 6000,
              }
            );
              setTimeout(() => {
                const {flightNumber, seats, bookingNumber} = query
              axios
                .post(
                  "http://localhost:8000/user/addSingleFlight",
                  {
                      flightNumber,
                      seats,
                      bookingNumber,
                        
                  },
                  {
                    headers: {
                      "x-auth-token": localStorage.getItem("token"),
                    },
                  }
                )
                .then(function (response) {
                    console.log(response);
                    if(type === "oneway")
                  {const token = localStorage.getItem("token");
                  localStorage.clear();
                  localStorage.setItem("token", token);
                  toast.success("Booking Successful", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                  setTimeout(function () {
                    navigate("/user/flights", { replace: true });
                  }, 2000);
                
                    } else
                    if(type === 'roundtrip')
                    {
                                const {flightNumber, seats, bookingNumber} = queryR
                                axios
                                  .post(
                                    "http://localhost:8000/user/addSingleFlight",
                                    {
                                      flightNumber,
                                      seats,
                                      bookingNumber,
                                    },
                                    {
                                      headers: {
                                        "x-auth-token":
                                          localStorage.getItem("token"),
                                      },
                                    }
                                  )
                                  .then(function (responseR) {
                                    const token = localStorage.getItem("token");
                                    localStorage.clear();
                                    localStorage.setItem("token", token);
                                    toast.success("Booking Successful", {
                                      position: toast.POSITION.BOTTOM_RIGHT,
                                    });
                                    setTimeout(function () {
                                      navigate("/user/flights", {
                                        replace: true,
                                      });
                                    }, 2000);
                                  })
                                  .catch(function (error) {
                                    console.log(error);
                                    axios
                                      .post(
                                        "http://localhost:8000/user/deleteSingleFlight",
                                        {
                                          query: query,
                                        },
                                        {
                                          headers: {
                                            "x-auth-token":
                                              localStorage.getItem("token"),
                                          },
                                        }
                                      )
                                      .then(function (response) {
                                        console.log(response);
                                        toast.error(
                                          "You Already Booked this flight",
                                          {
                                            position:
                                              toast.POSITION.BOTTOM_RIGHT,
                                          }
                                        );
                                        setTimeout(function () {
                                          navigate("/user/flights", {
                                            replace: true,
                                          });
                                        }, 2000);
                                      })
                                      .catch(function (error) {
                                        console.log(
                                          "something Serioulsy went wrong"
                                        );
                                      });
                                  });
                        }
                })
                  .catch(function (error) {
                      console.log(error);
                      toast.error("You Already Booked this flight", {
                          position: toast.POSITION.BOTTOM_RIGHT,
                      });
                  });
            }, 2000);
          })
            .catch((err) => {
                console.log(err);
                toast.error("You Already Booked this flight", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
      } catch (err) {
          console.log(err);
          toast.error("You Already Booked this flight", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
    } else {
        toast.error("You Already Booked this flight", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    };
                                


  return (
    <Grid sx={{ mt: 10, placeContent: "center" }}>
      <Paper variant='outlined' sx={{ p: 3, mt: 2, width: "25%", ml: "36%" }}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            sx={{ placeContent: "center", gap: "1em" }}
            direction='column'>
            <Typography variant='h6' color='primary.main'>
              Payment:
            </Typography>
            <TextField
              className='FormField'
              label='Name on Card'
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={handleNameChange}
              sx={{
                width: "100%",
                fontSize: "16px",
                fontWeight: "500",
                color: "primary.main",
              }}
              size='small'
              color='primary'
              focused
            />
            <fieldset className='FormGroup'>
              <Grid className='FormRow'>
                <CardElement options={CARD_OPTIONS} />
              </Grid>
            </fieldset>
            <Button disabled={!stripe} type='submit'>
              Pay {price}$
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}
