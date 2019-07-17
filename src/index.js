const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client/index");
const path = require("path");

const Query = require("../resolvers/Query");
const Mutation = require("../resolvers/Mutation");
const Subscription = require("../resolvers/Subscription");
const Vote = require("../resolvers/Vote");
const User = require("../resolvers/User");
const Link = require("../resolvers/Link");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Vote,
  User,
  Link
};

const PORT = process.env.PORT || 4000;
// const options = {
//   port: PORT,
//   endpoint: "/graphql",
//   playground: "/graphql"
// };

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

server.start(() => console.log(`Hello from the server side...`));
// server.start(options, () => console.log(`Hello from the server side...`));
