const { gql } = require('apollo-server-express');

const typedefs = gql`
type Query {
  info: String!
  feed: [Post!]!
  getPost(id: Int!): Post
}

type Mutation {
  createPost(title: String!, description: String, body: String!): Post!
  updatePost(id: Int!, title: String, description: String, body: String): [Int!]!
  deletePost(id: Int!): Int
}

type Post {
  id: Int!
  title: String!
  description: String
  body: String!
}
`;

module.exports = typedefs;
