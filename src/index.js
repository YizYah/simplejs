import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from 'graphql-tools'

import { typeDefs } from './typeDefs.js'
import { resolvers } from './resolvers.js'
import { permissions } from './auth/permissions.js'
import { getUser } from './auth/getUser.js'

const createContext = ({ req }) => {
  const { headers } = req
  const auth = null
  // parse Auth header and do something

  // put the auth info into context
  return { auth }
}

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
    context: (req) => ({
      ...req,
      user: getUser(req),
    }),
  },
)

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
