// import { ContextParameters } from 'graphql-yoga/dist/types'
import { users } from './users.js'

// export function getUser(ctx: ContextParameters) {
export function getUser(ctx) {
  // return {
  //   id: 1,
  //   name: 'Mathew',
  //   role: 'admin',
  // }
  const auth = ctx.req.get('Authorization')
  if (users[auth]) {
    return users[auth]
  }
  return null
}
