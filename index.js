require("dotenv").config();

const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema/TypeDefs");
const { resolvers } = require("./schema/Resolvers");

const express = require("express");
const { getUser } = require("./middlewares/auth");

const app = express();
const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    let token = req.get("Authorization") || "";
    token = token.split(" ");
    token = token[token.length - 1];
    return { user: getUser(token) };
  },
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
