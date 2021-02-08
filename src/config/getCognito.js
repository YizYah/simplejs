require('dotenv').config()
const AWS = require('aws-sdk')

const getCognitoProvider = () => {
  AWS.config.region = process.env.REGION
  AWS.config.credentials = new AWS.Credentials(
    process.env.AWS_ACCESS_KEY,
    process.env.AWS_SECRET_KEY
  )
  return new AWS.CognitoIdentityServiceProvider()
}

module.exports = getCognitoProvider
