const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const dataSources = require('./dataSources');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => dataSources,
  playground: {
    endpoint: `http://localhost:${process.env.PORT || 4000}/graphql`,
    settings: {
      'editor.theme': 'dark',
    },
  },
  tracing: true,
});

module.exports = server;
