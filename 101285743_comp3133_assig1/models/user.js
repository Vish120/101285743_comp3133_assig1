const mongoose = require("mongoose");
const { validateEmail } = require("../utils/helpers");

// define the schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter valid username"],
    unique: [true, "Duplicate username is not allowed"],
    trim: true,
    lowercase: true,
  },
  firstname: {
    type: String,
    required: [true, "Please enter valid username"],
    trim: true,
    lowercase: true,
  },
  lastname: {
    type: String,
    required: [true, "Please enter valid username"],
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: validateEmail,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 6,
  },
  type: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

module.exports = mongoose.model("User", userSchema);
