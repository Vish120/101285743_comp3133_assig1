const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Listing = require("./models/listing");
const Booking = require("./models/booking");
const User = require("./models/user");
const user = require("./models/user");
const { verifyParams } = require("./utils/helpers");

const resolvers = {
  Query: {
    listings: async (parent, args) => {
      const listing = await Listing.find({});
      if (!listing) throw new Error("Error fetching listing");
      return listing;
    },
    listingsAddedByAdmin: async (parent, args, context, info) => {
      //only when logged in as admin
      const listing = await Listing.find({ username: args.username });
      if (!listing) throw new Error("Error fetching listing");
      return listing;
    },

    searchListings: async (parent, args, context, info) => {
      try {
        const res = await Listing.find({ ...verifyParams(args) });
        return res;
      } catch (error) {
        throw new Error(
          "Sorry! something went wrong while searching." + error?.message
        );
      }
    },
    bookingsByUser: async (parent, args, context, info) => {
      // only when logged in as user
      try {
        const res = await Booking.find({ username: args.username });
        return res;
      } catch (error) {
        throw new Error(
          "Sorry! something went wrong while searching." + error?.message
        );
      }
    },
  },

  Mutation: {
    addListing: async (parent, args, context, info) => {
      // for admins only
      let listing = new Listing({
        listing_title: args.listing_title,
        description: args.description,
        street: args.street,
        city: args.city,
        postal_code: args.postal_code,
        price: args.price,
        email: args.email,
        username: args.username,
      });
      const user = await User.findOne({ username: args.username });
      if (!user) {
        throw new Error("You are not a user yet!");
        return null;
      }

      if (user.type !== "admin") {
        throw new Error("Only Admins can perform this operation!");
        return null;
      }
      return await listing.save();
    },
    addBooking: async (parent, args, context, info) => {
      let booking = new Booking({
        listing_id: args.listing_id,
        booking_date: args.booking_date,
        booking_start: args.booking_start,
        booking_end: args.booking_end,
        username: args.username,
      });
      const user = await User.findOne({ username: args.username });
      if (!user) {
        throw new Error("You are not a user yet!");
        return null;
      }
      return await booking.save();
    },
    addUser: async (parent, args, context, info) => {
      if (args.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
        return null;
      }
      const hash = await bcrypt.hash(args.password, 10);
      let user = new User({
        username: args.username,
        firstname: args.firstname,
        lastname: args.lastname,
        email: args.email,
        type: args.type,
        password: hash,
      });

      const res = await user.save();

      if (!res._id) {
        return { status: "failed", message: err.message };
      } else {
        return {
          status: "success",
          message: "user created successsfully as:" + user.username,
        };
      }
    },
    login: async (parent, args, context, info) => {
      const user = await User.findOne({ username: args.username });
      // check user exists
      if (!user) {
        return { error: "User not found." };
      } else {
        // check password match
        const valid = await bcrypt.compare(args.password, user.password);
        if (!args.password === user.password) {
          return { error: "Password does not match." };
        } else {
          // create and return the json web token
          const secrete = process.env.JWTSECRET;
          return {
            token: jwt.sign({ id: user._id }, secrete),
          };
        }
      }
    },
  },
};

module.exports = resolvers;
