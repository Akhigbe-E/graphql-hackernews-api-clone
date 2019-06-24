const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
    type Query{
        info: String!
    }
`

const resolvers = {
    Query:{
        info: ()=> `This is the hackernews clone`,
    }
}

const servers = new GraphQLServer({
    typeDefs,
    resolvers
});

servers.start(()=> console.log(`Hello from the server side...`))