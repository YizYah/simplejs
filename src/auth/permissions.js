import {
  shield, and, or, not,
} from 'graphql-shield'
import { isAdmin, isAuthenticated, isEditor } from './rules.js'

export const permissions = shield({
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
