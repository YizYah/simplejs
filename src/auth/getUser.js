// import { ContextParameters } from 'graphql-yoga/dist/types'
const users = require('./users.js')
const getSession = require('../config/getDBSession')
const getCognito = require('../config/getCognito')


function resolveCognitoUser (params) {
  const cognito = getCognito()

  return new Promise(function (resolve, reject) {
    cognito.getUser(params, function (err, data) {
      if (err) {
        reject(err)
      } else {
        const userData = {
          id: data.UserAttributes[0].Value,
          name: data.Username
        }
        resolve(userData)
      }
    })
  })
}

async function userQuery (userId, session) {
  const query = 'MATCH (u:User{id:$userId})<-[:OWNED_BY]-(:Platform) RETURN u'
  try {
    const result = await session.run(
      query,
      {
        userId
      }
    )
    return result.records
  } catch (err) {
    console.log('raised error in getUser:', err)
    throw new Error(err)
  }
}

// export function getUser(ctx: ContextParameters) {
const getUser = async (ctx) => {
  const params = {
    AccessToken: ctx.req.get('Authorization')
  }
  const session = await getSession()
  try {
    const userData = await resolveCognitoUser(params)
    console.log('userData: ', userData)
    const userId = userData.id
    // const user = await userQuery(userId, session)
    const user = {
      'id': '12412341453245',
      'role': 'Moderator',
      'name': 'sss'
    }
    // it must be returned role in user
    console.log(`user=${JSON.stringify(user)}`)
    if (!user) {
      return null
    }
    return user
  } catch (err) {
    console.log(`error getting user from token: ${JSON.stringify(err)}`)
  } finally {
    await session.close()
  }
}

module.exports = getUser
