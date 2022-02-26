const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { getUser } = require("./utils/helpers");
const dotenv = require("dotenv");

dotenv.config();

// connect DB
const url = process.env.MONGODB_URI;

mongoose.connect(url);
mongoose.connection.once("open", async () => {
  console.log("Connected to database successfully");
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    if (
      req.body.query.match("bookingsByUser") ||
      req.body.query.match("listingsAddedByAdmin")
    ) {
      if (req.headers && req.headers.authorization) {
        let auth = req.headers.authorization;
        let parts = auth.split(" ");
        let bearer = parts[0];
        let token = parts[1];
        if (bearer == "Bearer") {
          const user = getUser(token);
          if (user.error) {
            throw Error(user.msg);
          } else return { user };
        } else {
          throw Error("Authentication must use Bearer.");
        }
      } else {
        throw Error("User must be authenticated.");
      }
    }
  },
});

const app = express();

server.applyMiddleware({ app });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("App listening on PORT:", PORT));
