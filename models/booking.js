const mongoose = require("../db");

const BookingSchema = new mongoose.Schema({
  departure: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  flight: {
    type: String,
    required: true
  }
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;