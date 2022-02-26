const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    listings: [Listing]
    listingsAddedByAdmin(username: String): [Listing]
    searchListings(
      listing_title: String
      city: String
      postal_code: String
    ): [Listing]
    bookingsByUser(username: String): [Booking]
  }
  type Mutation {
    addListing(
      listing_title: String!
      description: String!
      street: String!
      city: String!
      postal_code: String!
      price: Float!
      email: String!
      username: String!
    ): Listing
    addBooking(
      booking_date: String!
      booking_start: String!
      booking_end: String!
      username: String!
      listing_id: String
    ): Booking
    addUser(
      username: String
      firstname: String
      lastname: String
      email: String
      password: String
      type: String
    ): addUserResponse
    login(username: String, password: String): loginResponse
  }
  type Listing {
    _id: String
    listing_title: String
    description: String
    city: String
    postal_code: String
    price: String
    email: String
    street: String
    username: String
  }
  type Booking {
    _id: String
    listing_id: String
    booking_date: String
    booking_start: String
    booking_end: String
    username: String
  }
  type User {
    username: String
    firstname: String
    lastname: String
    email: String
    password: String
    type: String
  }
  type loginResponse {
    token: String
    error: String
  }
  type addUserResponse {
    status: String
    message: String
  }
`;

module.exports = typeDefs;
