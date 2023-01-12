require("dotenv").config();

const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema/TypeDefs");
const { resolvers } = require("./schema/Resolvers");

const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.start().then((res) => {
  server.applyMiddleware({
    app,
    path: "/api",
  });
});

app.listen({ port }, () => {
  console.log(`🚀 Server is listening on port ${port}`);
});
