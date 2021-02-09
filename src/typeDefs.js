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
    appSpecUsertypes: [userType] @relation(name: "Assn_App_to_userType_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: OUT)

    appSpecDescriptions: [Description] @relation(name: "Assn_App_to_Description_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: OUT)
}
type Customer {
    id: ID!
    value: String
    apps: [App] @relation(name: "Assn_Customer_to_App_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: OUT)
}
type Description {
    id: ID!
    value: String}
type Infotype {
    id: ID!
    value: String
    screens: [screen] @relation(name: "Assn_infoType_to_screen_for_2bb38a1e-6802-4aa6-8c23-2ae8a7f1fe08", direction: OUT)
}
type screen {
    id: ID!
    value: String
    infoTypes: [Infotype] @relation(name: "Assn_screen_to_infoType_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: OUT)
}
type userType {
    id: ID!
    value: String
    screens: [screen] @relation(name: "Assn_userType_to_screen_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: OUT)
}

type Query {
  appSpec (customerId: ID!): [App] @cypher(statement: "match (customer:Customer {id:$customerId})-[:\`Assn_customer_to_app_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42\`]->(app:App) return app")
  infoTypes: [Infotype]
}
`

module.exports = typeDefs
