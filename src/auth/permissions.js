const {
  shield, and, or,
} = require('graphql-shield')
const { isModerator, isAuthenticated, isCustomer, isUser } = require('./rules')

const permissions = shield({
  Query: {
    // frontPage: not(isAuthenticated),
    frontPage: isModerator,
    fruits: and(isAuthenticated, or(isModerator, isCustomer)),
    customers: and(isAuthenticated, isModerator),
  },
  Mutation: {
    addFruitToBasket: isAuthenticated,
  },
  Fruit: isAuthenticated,
  Customer: isModerator,
})

module.exports = permissions
