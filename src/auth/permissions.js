const {
  shield, or
} = require('graphql-shield')

const { isModerator, isCustomer } = require('./rules')

const permissions =
    shield(
      {
        Query: {
          appSpec: or(isModerator, isCustomer),
        },
        // NOTE: could add permissions for type fields
      })

module.exports = permissions
