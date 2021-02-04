// import { ContextParameters } from 'graphql-yoga/dist/types'
const users = require('./users.js')

// export function getUser(ctx: ContextParameters) {
const getUser = (ctx) => {
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

module.exports = getUser
