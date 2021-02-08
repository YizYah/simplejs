# Description
This project is a sample for developing an exported server.  Currently, we are confirming that the middleware is working correctly.

# Running it
1. Get an Access Token
  - open [pivotate-backend-url](https://osc6oeg32a.execute-api.us-east-1.amazonaws.com/dev/graphql) in Playground.  Make sure that the playground url is the same as the browser url (you need the `/dev/`).
    
  - add the appropriate query variables:

  ```
  {
  "actionId": "a0d89c1f-c423-45e0-9339-c719dcbb7afe",
  "executionParameters": "{\"userName\":\"mod\",\"password\":\"letMeIn1!\",\"platformId\":\"us-east-1_IDHU1YQ1O\"}",
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
