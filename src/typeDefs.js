const { gql } = require('apollo-server')

const typeDefs = gql`

type User {
    id: ID!
    name: String
    firstName: String
    lastName: String
    email: String
}

type App {
    id: ID!
    value: String
    appSpecUsertypes: [Usertype] @relation(name: "Assn_app_to_userType_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: "OUT")

    appSpecDescriptions: [Description] @relation(name: "Assn_app_to_description_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: "OUT")
}
type Customer {
    id: ID!
    value: String
    apps: [App] @relation(name: "Assn_customer_to_app_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: "OUT")
}
type Description {
    id: ID!
    value: String}
type Infotype {
    id: ID!
    value: String
    screens: [Screen] @relation(name: "Assn_infoType_to_screen_for_2bb38a1e-6802-4aa6-8c23-2ae8a7f1fe08", direction: "OUT")
}
type Screen {
    id: ID!
    value: String
    infoTypes: [Infotype] @relation(name: "Assn_screen_to_infoType_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: "OUT")
}
type Usertype {
    id: ID!
    value: String
    screens: [Screen] @relation(name: "Assn_userType_to_screen_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: "OUT")
}

type Query {
  appSpec (customerId: Id)
    apps: [{
      app: App
      userTypes: [{
         userType: Usertype
        screens: [{
            screen: Screen
          infoTypes: [{
               infoType: Infotype
        }]
      }],
      descriptions: [{
         description: Description
    }]
  }]
infoTypes: [{
    infoType: InfotypequerySchema
    infoTypes: [{
      infoType: Infotype
      screens: [{
         screen: Screen
    }]
  }]
}

type Mutation {

    // type 'screen' in unit 'appSpec'
    appSpecCreateScreen(appSpecId: ID!, value: string): Screen
    appSpecUpdateScreen(screen: ID!, value: string): Screen
    appSpecDeleteScreen(screen: ID!): Boolean

    // type 'app' in unit 'appSpec'
    appSpecCreateApp(appSpecId: ID!, value: string): App
    appSpecUpdateApp(app: ID!, value: string): App
    appSpecDeleteApp(app: ID!): Boolean

    // type 'userType' in unit 'appSpec'
    appSpecCreateUserType(appSpecId: ID!, value: string): UserType
    appSpecUpdateUserType(userType: ID!, value: string): UserType
    appSpecDeleteUserType(userType: ID!): Boolean

    // type 'description' in unit 'appSpec'
    appSpecCreateDescription(appSpecId: ID!, value: string): Description
    appSpecUpdateDescription(description: ID!, value: string): Description
    appSpecDeleteDescription(description: ID!): Boolean

    // type 'infoType' in unit 'appSpec'
    appSpecCreateInfoType(appSpecId: ID!, value: string): InfoType
    appSpecUpdateInfoType(infoType: ID!, value: string): InfoType
    appSpecDeleteInfoType(infoType: ID!): Boolean


    createUser(
        name: String,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
    ): User

    updateUser(
        id: ID!,
        name: String,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
    ): Boolean

    deleteUser(
        id: ID!
    ): Boolean
}

`

module.exports = typeDefs
