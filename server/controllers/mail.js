import nodemailer from "nodemailer";

function sendMail(mailOptions) {
  //fetch the mailer credentials from the config file
  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;

  //create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: user,
      pass: pass,
    },
  });

  //send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
}


export const Cancel = async (req, res) => {
    const user = process.env.EMAIL;
    const { email, name, flightID, refund } = req.body;
    const mailOptions = {
        from: user,
        to: email,
        subject: "Flight Cancellation",
        html: `<h1>Hello ${name}</h1>
        <p>Your flight with flight ID ${flightID} has been cancelled, and you have been refunded an amount of ${refund}$</p>
        <p>Thank you for using our service</p>
        <p>Regards,</p>
        <p>Flight Booking Team</p>`
    }

    sendMail(mailOptions);

    res.status(200).send("Email sent");
};

export const Booking = async (req, res) => {
    const user = process.env.EMAIL;
    const { email, name, flightID, price } = req.body;
    const mailOptions = {
        from: user,
        to: email,
        subject: "Flight Booking",
        html: `<h1>Hello ${name}</h1>
        <p>Your flight with flight ID ${flightID} has been booked, and you have paid ${price}$</p>
        <p>Thank you for using our service</p>
        <p>Regards,</p>
        <p>Flight Booking Team</p>`
    }

    sendMail(mailOptions);

    res.status(200).send("Email sent");
}

export const SignUp = async (req, res) => {
    const user = process.env.EMAIL;
    const { email, name } = req.body;
    const mailOptions = {
        from: user,
        to: email,
        subject: "Welcome to the Mighty Ducks family",
        html: `<h1>Hello ${name}</h1>
        <p>Thank you for signing up with Mighty Ducks</p>
        <p>Regards,</p>
        <p>Flight Booking Team</p>`
    }

    sendMail(mailOptions);

    res.status(200).send("Email sent");
}

export const ModifyBooking = async (req, res) => {
    const user = process.env.EMAIL;
    const { email, name, flightID, price } = req.body;
    const mailOptions = {
        from: user,
        to: email,
        subject: "Flight Booking",
        html: `<h1>Hello ${name}</h1>
        <p>Your flight with flight ID ${flightID} has been modified, and you have paid ${price}$</p>
        <p>Thank you for using our service</p>
        <p>Regards,</p>
        <p>Flight Booking Team</p>`
    }

    sendMail(mailOptions);

    res.status(200).send("Email sent");
}

export const mailItinerary = async (req, res) => {
  const user = process.env.EMAIL;
  const { email, name, flightNumber, from, to, seats, duration, price,departureDate, arrivalDate,fullClass } = req.body;
  console.log(req.body);
  const mailOptions = {
    from: user,
    to: email,
    subject: "Flight Summary",
    html: `<h1>Hello ${name}</h1>
    <p>Your flight with flight ID ${flightNumber} has been booked, and you have paid ${price}$</p>
    <p>your Flight is From ${from} to ${to}</p>
    <p>Seats: ${seats}</p>
    <p>Duration: ${duration}</p>
    <p>Departure Date: ${departureDate}</p>
    <p>Arrival Date: ${arrivalDate}</p>
    <p>Class: ${fullClass}</p>
    <p>Thank you for using our service</p>
    <p>Regards,</p>
    <p>Flight Booking Team</p>`
  }
  sendMail(mailOptions);
  res.status(200).send("Email sent");
}


export const test = async (req, res) => {
  sendMail({
    from: process.env.EMAIL,
    to: "faridasamer2@gmail.com",
    subject: "Welcome To DuckyDuckyLines!!!!",
    text: "Yo Yo Yo this is a test mail yo",
  });
  res.status(202).json("mail Sent!!");
}
