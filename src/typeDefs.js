const { gql } = require('apollo-server')

const typeDefs = gql`

type User {
    id: ID!
    name: String
    firstName: String
    lastName: String
    email: String
}

type app {
    id: ID!
    value: String
    appSpecUsertypes: [userType] @relation(name: "Assn_app_to_userType_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: OUT)

    appSpecDescriptions: [description] @relation(name: "Assn_app_to_description_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: OUT)
}
type customer {
    id: ID!
    value: String
    apps: [app] @relation(name: "Assn_customer_to_app_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: OUT)
}
type description {
    id: ID!
    value: String}
type infotype {
    id: ID!
    value: String
    screens: [screen] @relation(name: "Assn_infoType_to_screen_for_2bb38a1e-6802-4aa6-8c23-2ae8a7f1fe08", direction: OUT)
}
type screen {
    id: ID!
    value: String
    infoTypes: [infotype] @relation(name: "Assn_screen_to_infoType_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: OUT)
}
type userType {
    id: ID!
    value: String
    screens: [screen] @relation(name: "Assn_userType_to_screen_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42", direction: OUT)
}

type Query {
  appSpec (customerId: ID!): [app] @cypher(statement: "match (c:customer {id:$customerId})-[:\`Assn_customer_to_app_for_e36aa4c6-8029-4969-b1fe-d659bdb9eb42\`]->(a:app) return a")
  infoTypes: [infotype]
}
`

module.exports = typeDefs
