const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../graphql/types');
const resolvers = require('../graphql/resolvers');

module.exports.constructTestServer = (mockContext) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => mockContext,
    tracing: false,
  });
  return server;
};
