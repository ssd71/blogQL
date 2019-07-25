# BlogQL

[![Build Status](https://travis-ci.com/ssd71/blogQL.svg?branch=master)](https://travis-ci.com/ssd71/blogQL)


Backend for a one-man-blog, written in JavaScript.

It uses Express for the server with Apollo Server Express integration to serve GraphQL requests from a database.
It uses Sequelize ORM for interacting with the database. Deployed with [Heroku](https://apisensei.herokuapp.com) using continuous deployment with Travis.
To run locally:
- Clone this repo or a fork; forking is recommended;
Clone your fork with `git clone https://github.com/[your GitHub username]/blogQL`
To clone this repository, replace your username with `ssd71`(my username)
- Go to the newly created `blogQL` directory
- `npm start`

Note that it creates a SQLite3 database in the repo directory when working locally.

To make changes:
- Fork this repository
- Clone your fork locally and make changes (or just make changes on GitHub if you're not writing code and skip the next two steps)
- Install required dependencies with `npm install`
- Check for errors:

  - Check for errors in Code style(note that this project strictly adheres to Airbnb code style): `npm run lint`
  - Run tests to ensure core functionality isn't broken: `npm test`

- If you've added any new features we strongly suggest writing tests for it! This project uses [Jest](https://jestjs.io) to run it's unit tests and integration tests.
- To run the server and see it in action, use `npm start` and navigate to [this page](http://localhost:4000/graphql). You can use the GraphiQL playground to send requests to the server.
- Additionally you can help improve this project by submitting a Pull Request!
