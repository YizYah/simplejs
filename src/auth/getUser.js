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
  const query = `
    match (user:User {id:$userId})-[:IS_IN_CLASS]->(uc:UserClass)
    return user.name as name, user.id as id, collect(uc.name) as roles
  `
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
    const userId = userData.id
    const user = await userQuery(userId, session)
    // const user = {
    //   'id': '12412341453245',
    //   'roles': ['Moderator'],
    //   'name': 'sss'
    // }
    const userInfo = user[0]

    // it must be returned role in user
    console.log(`user=${JSON.stringify(userInfo)}`)
    try {
      const roles = userInfo.get('roles')
      console.log(`roles=${JSON.stringify(roles)}`)
      const name = userInfo.get('name')
      console.log(`name=${JSON.stringify(name)}`)
    } catch (e) {
      console.log('e:', e)
    }

    if (!user) {
      return null
    }
    return user[0]
  } catch (err) {
    console.log(`error getting user from token: ${JSON.stringify(err)}`)
  } finally {
    await session.close()
  }
}

module.exports = getUser
