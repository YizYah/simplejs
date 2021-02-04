const {
  shield, and, or,
} = require('graphql-shield')
const { isAdmin, isAuthenticated, isEditor } = require('./rules')

const permissions = shield({
  Query: {
    // frontPage: not(isAuthenticated),
    frontPage: isAdmin,
    fruits: and(isAuthenticated, or(isAdmin, isEditor)),
    customers: and(isAuthenticated, isAdmin),
  },
  Mutation: {
    addFruitToBasket: isAuthenticated,
  },
  Fruit: isAuthenticated,
  Customer: isAdmin,
})

module.exports = permissions
