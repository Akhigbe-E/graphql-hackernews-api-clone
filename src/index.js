const { GraphQLServer } = require('graphql-yoga');
const {prisma} = require('./generated/prisma-client/index')


const resolvers = {
    Query:{
        info: ()=> `This is the hackernews clone`,
        feed: (root, args, context, info) => {
            return context.prisma.links()
        },
        link: (root, args, context, info)=>{
            return context.prisma.link({where:args.id})
            
        }
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            })
        },
        // deleteLink: (parent, args)=>{
        //     return links.filter(link=>!(link.id===args.id));
        // },
        // updateLink:(parent, args)=>{
        //     targetLink = links.find(link=>link.id===args.id);
        //     targetLink.url = args.url;
        //     targetLink.description = args.description;
        //     return targetLink;
        // }
    }
}

const servers = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers,
    context: { prisma },
});

servers.start(()=> console.log(`Hello from the server side...`))