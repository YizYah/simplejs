const {
  shield, or
} = require('graphql-shield')

const { isModerator, isCustomer } = require('./rules')

const permissions =
    shield(
      {
        Query: {
          appSpec: or(isModerator, isCustomer),
          parent: or(isModerator, isCustomer)
        },
        Mutation: {

          // type 'screen' in unit 'appSpec'
          appSpecCreateScreen: or(isModerator, isCustomer),
          appSpecUpdateScreen: or(isModerator, isCustomer),
          appSpecDeleteScreen: or(isModerator, isCustomer),

          // type 'app' in unit 'appSpec'
          appSpecCreateApp: or(isModerator, isCustomer),
          appSpecUpdateApp: or(isModerator, isCustomer),
          appSpecDeleteApp: or(isModerator, isCustomer),

          // type 'userType' in unit 'appSpec'
          appSpecCreateUserType: or(isModerator, isCustomer),
          appSpecUpdateUserType: or(isModerator, isCustomer),
          appSpecDeleteUserType: or(isModerator, isCustomer),

          // type 'description' in unit 'appSpec'
          appSpecCreateDescription: or(isModerator, isCustomer),
          appSpecUpdateDescription: or(isModerator, isCustomer),
          appSpecDeleteDescription: or(isModerator, isCustomer),

          // type 'infoType' in unit 'appSpec'
          appSpecCreateInfoType: or(isModerator, isCustomer),
          appSpecUpdateInfoType: or(isModerator, isCustomer),
          appSpecDeleteInfoType: or(isModerator, isCustomer)

        }
        // NOTE: could add permissions for type fields
      })

module.exports = permissions
