const mongoose = require("mongoose");
const { validateDate } = require("../utils/helpers");

// define the schema
const Schema = mongoose.Schema;

// bookingschema
const bookingSchema = new Schema({
  listing_id: {
    type: String,
    required: [true, "Please enter valid ID"],
    unique: [true, "Duplicate ID not allowed"],
    trim: true,
  },
  booking_date: {
    type: String,
    required: true,
    validate: validateDate,
  },
  booking_start: {
    type: String,
    required: true,
    validate: validateDate,
  },
  booking_end: {
    type: String,
    required: true,
    validate: validateDate,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
