const express = require('express');
const graphqlServer = require('./graphql/schema');

const app = express();

const PORT = process.env.PORT || 4000;

graphqlServer.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:4000${graphqlServer.graphqlPath}`));

module.exports = {
  app,
  graphqlServer,
};
