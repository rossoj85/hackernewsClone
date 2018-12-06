const { GraphQLServer } = require('graphql-yoga')


//DUMMY DATA
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]
let idCount = links.length

// 1 We previously set a const typeDefs here and defined the trypeDefs as a string (see below). It is now its own .graphql file
// schema.graphqwl//


// 2
const resolvers = {
    Query: {
        //A
        info: () => `This is the API of a Hackernews Clone`,
        // B
        feed: () => links,
        //C
        link: (root,args)=>{
            for(let currentLink of links){
                console.log(currentLink)
                if(currentLink.id=== args.id) returnLink=currentLink
                return currentLink
            }
        }
    },
    //remember the root is the return object that is being filled out as we go through this process. 
    Mutation: {
        post(root,args){
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink(root,args){
            for(let currentLink of links){
                if(currentLink.id === args.id ){
                    if(args.url) currentLink.url=args.url
                    if(args.description) currentLink.description = args.description
                    return currentLink
                }
            }
        },
        deleteLink(root, args){
            console.log('links before', links)
            links = links.filter(link=> link.id!==args.id)
            console.log('links after', links)
            // for(let currentLink of links){
            //     if(currentLink.id === args.id ){

            //     }
            // }
            return links
        }
        
    }
}
  

  
  // 3
const server = new GraphQLServer({
    typeDefs: `src/schema.graphql`,
    resolvers,
  })
  server.start(() => console.log(`Server is running on http://localhost:4000`))



// const typeDefs = `
// type Query {
//   info: String!
//   feed: [Link!]!
// }

// type Link {
//     id: ID!
//     description: String!
//     url: String!
// }
// type Mutation{
//     post(url: String!, description: String!): Link!
// }
// `