require('dotenv').on("load");
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

var stripeHandler = StripeCheckout.configure({
    key:stripePublicKey,
    locale: auto,
});
export const payment = () =>{

    stripeHandler.redirectToCheckout();
}
export default payment;