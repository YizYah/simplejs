require('dotenv').config()
const neo4j = require('neo4j-driver')

const getSession = async () => {
  console.log(process.env.DB_URI)
  const driver = neo4j.driver(
    process.env.DB_URI,
    neo4j.auth.basic(
      process.env.DB_USER,
      process.env.DB_PASSWORD
    )
  )

  try {
    await driver.verifyConnectivity()
  } catch (err) {
    console.log(`connectivity verification failed. ${err}`)
    throw new Error('DatabaseError: connectivity verification failed.')
  }
  return driver.session()
}

module.exports = getSession
