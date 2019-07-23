const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const models = require('../models');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
  },
  playground: {
    endpoint: `http://localhost:${process.env.PORT || 4000}/graphql`,
    settings: {
      'editor.theme': 'dark',
    },
  },
  tracing: true,
});

module.exports = server;
