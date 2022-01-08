require('dotenv').on("load");
//const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/payment', async (req,res)=>{
    try{
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body,
        currency: 'egp',
        payment_method_types: ['card'],
      });
      res.status(200).send("Payment Successful:", paymentIntent);
    }catch(err){
        res.status(400).send("Error:", err);
    }


    //stripeHandler.redirectToCheckout();
});

export default payment;