require('dotenv').config()

const { ApolloServer } = require('apollo-server')
const { applyMiddleware } = require('graphql-middleware')
const { makeAugmentedSchema } = require('neo4j-graphql-js')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
// const permissions = require('./auth/permissions')
const getUser = require('./auth/getUser')

const neo4j = require('neo4j-driver')

const driver = neo4j.driver(
    process.env.DB_URI,
    neo4j.auth.basic(
        process.env.DB_USER,
        process.env.DB_PASSWORD
    )
)

const createContext = async (req) => ({
  ...req,
    driver,
  user: await getUser(req)
})

const schema = applyMiddleware(
  makeAugmentedSchema(
    {
      typeDefs,
      resolvers,
      config: {
        query: false,
        mutation: false,
        auth: false
      }
    }
  )
  // permissions
)

const server = new ApolloServer(
  {
    schema,
    resolvers,
    query: false,
    mutation: false,
    auth: false,
    // plugins: [
    //   myPlugin,
    // ],
    context: createContext
  }
)

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
