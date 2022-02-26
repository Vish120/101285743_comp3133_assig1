const mongoose = require("mongoose");
const { validatePostalCode, validateEmail } = require("../utils/helpers");

// define the schema
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  listing_title: {
    type: String,
    required: [true, "Please enter valid listing name"],
    trim: true,
    minLength: 4,
  },
  description: {
    type: String,
    required: [true, "Please enter valid listing description"],
    trim: true,
    minLength: 4,
  },
  city: {
    type: String,
    required: [true, "Please enter a valid city name"],
    trim: true,
    minLength: 4,
  },
  postal_code: {
    type: String,
    required: true,
    // validate: validatePostalCode,
    trim: true,
  },
  street: {
    type: String,
    required: [true, "Please enter valid Street name"],
    trim: true,
    minLength: 4,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: validateEmail,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Listing", listingSchema);
