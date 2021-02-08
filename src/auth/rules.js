const { rule } = require('graphql-shield')

const getRoles = (items) => {
  const roles = []
  items.forEach(role => {
    roles.push(role.toLowerCase())
  })
  return roles
}

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => ctx.user !== null
)

const isModerator = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => {
    const roles = getRoles(ctx.user.get('roles'))
    return roles.includes('moderator')
  }
)

const isCustomer = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => {
    const roles = getRoles(ctx.user.get('roles'))
    return roles.includes('customer')
  }
)

module.exports = {
  isAuthenticated,
  isModerator,
  isCustomer
}
