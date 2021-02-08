const { neo4jgraphql } = require("neo4j-graphql-js")

const resolvers = {
  Query: {
    appSpec(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo);
    }
  }
}

module.exports = resolvers
