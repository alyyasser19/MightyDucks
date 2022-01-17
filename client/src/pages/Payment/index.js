import { React, useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/paymentForm";

function Payment() {
  //initialize states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [stripe, setStripe] = useState(null);
  
    let price;
    price = parseInt(localStorage.getItem("price"));
    if (localStorage.getItem("type") === "roundtrip")
        price += parseInt(localStorage.getItem("priceR"));
  //load stripe
const PUBLIC_KEY = "pk_test_rgWMA3zxjAtwaB6iV8b5W40x";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

  //set Stripe options


// Pass the appearance object to the Elements instance


  if (loading)
    return (
      <Grid container sx={{ mt: "10em", placeContent: "center" }}>
        <CircularProgress size={100} />
      </Grid>
    );

  if (error)
    return (
      <Grid container sx={{ mt: "10em", placeContent: "center" }}>
        <Typography variant='h4'>Error loading payment form</Typography>
      </Grid>
    );

    return (
    <Elements stripe={stripeTestPromise} >
      <CheckoutForm price={localStorage.getItem("price")} setLoading={setLoading} setError={setError} />
    </Elements>
  );
}

export default Payment;
