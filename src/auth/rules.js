const { rule } = require('graphql-shield')

/* Read more about cache options down in the `rules/cache` section. */

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => ctx.user !== null,
)

const isCustomer = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => (ctx.user.role).toLowerCase() === 'customer',
)

const isModerator = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => (ctx.user.role).toLowerCase() === 'moderator',
)

const isUser = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => (ctx.user.role).toLowerCase() === 'user',
)

module.exports = {
  isAuthenticated,
  isCustomer,
  isModerator,
  isUser
}
