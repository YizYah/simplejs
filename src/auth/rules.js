const { rule } = require('graphql-shield')

/* Read more about cache options down in the `rules/cache` section. */

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => ctx.user !== null,
)

const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => ctx.user.role === 'admin',
)

const isEditor = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => ctx.user.role === 'editor',
)

module.exports = {
  isAuthenticated,
  isAdmin,
  isEditor,
}
