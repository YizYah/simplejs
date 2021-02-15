# Description
This server is an export of stack `us-east-1_IDHU1YQ1O` from [NoStack](https://www.nostack.net).  

## Exported Stack
This is an [Apollo Server](https://www.apollographql.com/docs/tutorial/introduction/).  Therefore, the API is [graphql](https://graphql.org/).  

The main file is `src/index.js`.  The server is declared there.

The server is stored on AWS (see the `.env` file for credentials) as lambda (us-glelasf33lkj323243).

The database in (neo4j)[https://neo4j.com/] running on an [Aura](https://neo4j.com/cloud/aura/) instance.  That Aura instance is accessible from it's [uri](neo4j+s://85471f27.databases.neo4j.io) logging in as user `neo4j` and with the password specified in your `.env` file.

## Auth
The auth is handled by Cognito in your AWS account.  The Client id is 03432432.  The User Pool id is afs24232243lsd.


At the database level, users are classified into the following roles:
1. Moderator
2. Customer

At the graphql level, the server uses [graphql-shield](https://www.npmjs.com/package/graphql-shield) to ensure that only users of a particular type can perform queries or mutations.

  * The file `src/auth/getUser.js` contains the code used to set the user info in the context for a query
  * The file `src/auth/rules.js` contains the rules for determining whether a person who has logged in it has any number of roles.
  * The file `src/auth/permissions.js` contains a specific set of permissions for determining access to queries and mutations.

In addition, at the data level the generated queries protect further to attempt to limit users to seeing or modifying data that belongs to them.

# Schema and Queries
The file `src/schema/typeDefs.js` contains the graphql schema declaration.  One query exists for each of your units, as well as numerous mutations.

The server is using the [neo4j-graphql-js](https://www.npmjs.com/package/neo4j-graphql-js) package to enable simple querying.  See the [neo4j-graphql-js documentation](https://grandstack.io/docs/neo4j-graphql-js-quickstart).  In particular, the `@relation` and `@cypher` directives are used for enabling easy querying.  

To simplify the generation of the proper `@cypher` directives, the file `src/schema/relationships.js` contains a list of the associations needed.  

# Running it
1. Get an Access Token
  - open [pivotate-backend-url](https://osc6oeg32a.execute-api.us-east-1.amazonaws.com/dev/graphql) in Playground.  Make sure that the playground url is the same as the browser url (you need the `/dev/`).
    
  - add the appropriate query variables:

  ```
  {
  "actionId": "a0d89c1f-c423-45e0-9339-c719dcbb7afe",
  "executionParameters": "{\"userName\":\"themod\",\"password\":\"l3tm3!n\",\"platformId\":\"us-east-1_IDHU1YQ1O\"}",
  "unrestricted": true
}
  ```
  - run the following query:
 
  ```
  mutation Execute($actionId: ID!,$executionParameters: String, $unrestricted:Boolean){
      execute(actionId:$actionId, executionParameters: $executionParameters, unrestricted:$unrestricted)
  }
  ```

  You will need the `AccessToken` value from the query results for the next step.

2. Call a Query
 - initialize the server locally:
    ```
     $ npm run start
    ```
 - Add the`AccessToken` from the results of the last step into `HTTP HEADERS` in graphql playground
    ```
    {
      "Authorization": "******"
    }
    ```
 - run a query that is restricted to the type of user whose token you retrieved above.
   
   For example:
   ```
   {
     frontPage {
       name
       count
     }
   }
   ```
  When you have a valid, current token, it should work.  Otherwise, you should get an ""Not Authorised!" error.
