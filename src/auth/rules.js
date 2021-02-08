const { rule } = require('graphql-shield')

/* Read more about cache options down in the `rules/cache` section. */

const getRoles = (items) => {
  let roles = []
  items.forEach(role => {
    roles.push(role.toLowerCase())
  });
  return roles
}

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => ctx.user !== null,
)

const isCustomer = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => {
    const roles = getRoles(ctx.user.get('roles'))
    return roles.includes('customer')
  },
)

const isModerator = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => {
    const roles = getRoles(ctx.user.get('roles'))
    return roles.includes('moderator')
  },
)

const isUser = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => {
    const roles = getRoles(ctx.user.get('roles'))
    return roles.includes('user')
  },
)

module.exports = {
  isAuthenticated,
  isCustomer,
  isModerator,
  isUser
}
