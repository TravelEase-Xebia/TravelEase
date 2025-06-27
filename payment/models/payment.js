const mongoose = require("../db");

const PaymentSchema = new mongoose.Schema({
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
    },
    tickets: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});


const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;


