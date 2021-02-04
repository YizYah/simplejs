// import { ContextParameters } from 'graphql-yoga/dist/types'
import { users } from './users.js'

// export function getUser(ctx: ContextParameters) {
export function getUser(ctx) {
  const auth = ctx.request.get('Authorization')
  if (users[auth]) {
    return users[auth]
  }
  return null
}
