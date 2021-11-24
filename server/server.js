import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import flightRoutes from "./routes/flight.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
import cors from "cors";

var app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/flight", flightRoutes);
app.use("/user", userRoutes);

const MongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || "8000";

mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
