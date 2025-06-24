const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Booking = require("./models/booking.js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Serve HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/booking.html");
});

// Get all bookings
app.get("/api/bookings", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// Add new booking
app.post("/api/bookings", async (req, res) => {
  const { departure, destination, date } = req.body;
  const newBooking = new Booking({ departure, destination, date });
  await newBooking.save();
  res.json({ message: "Booking successful", booking: newBooking });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Booking microservice is running.");
});