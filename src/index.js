const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client/index");

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

const servers = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

servers.start(() => console.log(`Hello from the server side...`));
