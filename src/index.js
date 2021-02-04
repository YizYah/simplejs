import { ApolloServer } from 'apollo-server'
import { users } from './auth/users.js'
import { typeDefs } from './typeDefs.js'
import { resolvers } from './resolvers.js'
import { permissions } from './auth/permissions.js'
import { getUser } from './auth/getUser.js'

console.log(`users=${JSON.stringify(users)}`)

const server = new ApolloServer(
  {
    typeDefs,
    resolvers,
    middlewares: [permissions],
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
