const {cypherAdd} = require("./cypherGenerators")

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
    appSpecUsertypes: [UserType] @relation(name: "Assn_app_to_userType_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: OUT)

    appSpecDescriptions: [Description] @relation(name: "Assn_app_to_description_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: OUT)
}
type Customer {
    id: ID!
    value: String
    apps: [App] @relation(name: "Assn_customer_to_app_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: OUT)
}
type Description {
    id: ID!
    value: String}
type InfoType {
    id: ID!
    value: String
    screens: [Screen] @relation(name: "Assn_infoType_to_screen_for_2bb38a1e-6802-4aa6-8c23-2ae8a7f1fe08", direction: OUT)
}
type Screen {
    id: ID!
    value: String
    infoTypes: [InfoType] @relation(name: "Assn_screen_to_infoType_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: OUT)
}
type UserType {
    id: ID!
    value: String
    screens: [Screen] @relation(name: "Assn_userType_to_screen_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: OUT)
}

type Query {
  appSpec: [App] @cypher(statement: "match (customer:Customer {id: $cypherParams.currentUserId})-[:\`Assn_customer_to_app_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42\`]-(app:App) return app")
  parent: [InfoType] @cypher(statement: "match (infoType:InfoType) return infoType")
}

type Mutation {
    appSpecCreateScreen(appSpecId: ID!, value: String): Screen
    appSpecUpdateScreen(screen: ID!, value: String): Screen
    appSpecDeleteScreen(screen: ID!): Boolean

    appSpecCreateApp(appSpecId: ID!, value: String): App
    appSpecUpdateApp(app: ID!, value: String): App
    appSpecDeleteApp(app: ID!): Boolean

    appSpecCreateUserType(appSpecId: ID!, value: String): UserType ${cypherAdd('appSpec', 'userType')}
    appSpecUpdateUserType(userType: ID!, value: String): UserType
    appSpecDeleteUserType(userType: ID!): Boolean

    appSpecCreateDescription(appSpecId: ID!, value: String): Description
    appSpecUpdateDescription(description: ID!, value: String): Description
    appSpecDeleteDescription(description: ID!): Boolean

    appSpecCreateInfoType(appSpecId: ID!, value: String): InfoType
    appSpecUpdateInfoType(infoType: ID!, value: String): InfoType
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
