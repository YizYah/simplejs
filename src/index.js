import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from 'graphql-tools'

import { typeDefs } from './typeDefs.js'
import { resolvers } from './resolvers.js'
import { permissions } from './auth/permissions.js'
import { getUser } from './auth/getUser.js'

const createAuthContext = ({ req }) => {
  const { headers } = req
  const auth = null
  // parse Auth header and do something

  // put the auth info into context
  return { auth }
}

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
