const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type User {
    name: String!
    email: String!
  }

  type Notice {
    id: Int!
    title: String!
    desc: String
    content: String!
    label: String
    banner: String
    isDraft: Boolean
    totalViews: Int!
    createdAt: Date!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type AuthResp {
    user: User!
    token: String!
  }

  input NoticeInput {
    title: String!
    desc: String
    content: String!
    label: String
    banner: String
    isDraft: Boolean
    totalViews: Int
  }

  input NoticeUpdateInput {
    id: Int!
    title: String!
    content: String!
  }

  # Queries
  type Query {
    getAllUsers: [User!]!
    getAllNotices: [Notice!]!
    getNotice(id: Int!): Notice!
    authenticateUser(email: String!, password: String!): AuthResp!
  }

  # Mutation
  type Mutation {
    createNotice(notice: NoticeInput): Notice!
    updateNotice(notice: NoticeUpdateInput): Notice!
    deleteNotice(id: Int!): Int!
    registerUser(newUser: UserInput): AuthResp!
  }
`;

module.exports = { typeDefs };
