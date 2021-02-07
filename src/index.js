const { ApolloServer } = require('apollo-server')
const { applyMiddleware } = require('graphql-middleware')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const permissions = require('./auth/permissions')
const getUser = require('./auth/getUser')

const createContext = async ( req ) => ({
  ...req,
  user: await getUser(req),
})

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permissions,
)

const server = new ApolloServer(
  {
    schema,
    resolvers,
    // plugins: [
    //   myPlugin,
    // ],
    context: createContext,
  },
)

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
