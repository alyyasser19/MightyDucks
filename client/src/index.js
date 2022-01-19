import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import theme from "./theme";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Home from "./pages/Home";
import User from "./pages/UserProfile";
import UserFlights from "./pages/UserFlights";
import EditProfile from "./components/EditProfile";
import BookingT from "./pages/BookingT";
import BookingS from "./pages/BookingS";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import Payment from "./pages/Payment";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ReservedFlight from "./pages/ReservedFlightsDetails";
import "./index.css"


ReactDOM.render(
  <Router>
    <ToastContainer />
    <Box sx={{ m: -1, overflowX: "hidden" }}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='home' element={<Home />} />
          <Route path='user' element={<User />} />
          <Route path='user/flights' element={<UserFlights />} />
          <Route path='user/modify/:id' element={<EditProfile />} />
          <Route path='home/booking/roundtrip/:id' element={<BookingT />} />
          <Route path='home/booking/oneway/:id' element={<BookingS />} />
          <Route path='itinerary/:id' element={<ReservedFlight />} />
          <Route path='register' element={<Register />} />
          <Route element={<ErrorPage />} path='/error' />
          <Route path='user/payment/:id' element={<Payment />} />
          <Route element={<ErrorPage />} path='*' />
        </Routes>
      </ThemeProvider>
    </Box>
  </Router>,
  document.getElementById("root")
);