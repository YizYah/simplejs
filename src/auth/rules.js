import { rule } from 'graphql-shield'

/* Read more about cache options down in the `rules/cache` section. */

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => ctx.user !== null,
)

export const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => ctx.user.role === 'admin',
)

export const isEditor = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => ctx.user.role === 'editor',
)
