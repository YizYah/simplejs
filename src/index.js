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


// const myPlugin = {
//
//   // Fires whenever a GraphQL request is received from a client.
//   requestDidStart(requestContext) {
//     console.log(`Request started! Query:\n${
//       requestContext.request.query}`)
//
//     return {
//
//       // Fires whenever Apollo Server will parse a GraphQL
//       // request to create its associated document AST.
//       parsingDidStart(requestContext) {
//         console.log('Parsing started!')
//       },
//
//       // Fires whenever Apollo Server will validate a
//       // request's document AST against your GraphQL schema.
//       validationDidStart(requestContext) {
//         console.log('Validation started!')
//       },
//
//     }
//   },
// }

// schema definition...
// typeDefs = applyMiddleware(typeDefs, permissions)
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
