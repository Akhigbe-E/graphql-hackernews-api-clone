const { GraphQLServer } = require('graphql-yoga');


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

let linkLength = links.length
const resolvers = {
    Query:{
        info: ()=> `This is the hackernews clone`,
        feed: ()=> links,
        link: (parent,args)=>{
            console.log('hello'+args)
            return links.find(link => link.id === args.id)
        }
    },
    Mutation: {
        post: (parent, args)=>{
            const link = {
                id: `link-${linkLength+1}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        }
    }
}

const servers = new GraphQLServer({
    typeDefs:'./schema.graphql',
    resolvers
});

servers.start(()=> console.log(`Hello from the server side...`))